// Server-side utility to fetch products from Google Sheets
// This file should only be imported in Server Components or API Routes

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface SheetResponse {
  values?: string[][];
}

/**
 * Converts various Google Drive URL formats to a direct image URL
 * Supports:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=view&id=FILE_ID
 * - FILE_ID (just the ID)
 */
function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';
  
  // If it's already in the correct format, return as is
  if (url.includes('drive.google.com/uc?export=view') || url.includes('lh3.googleusercontent.com')) {
    return url;
  }
  
  // If it's not a Google Drive URL at all, return as is (could be Unsplash, etc.)
  if (!url.includes('drive.google.com')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([^\/]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/[?&]id=([^&]+)/);
  if (match2) {
    fileId = match2[1];
  }
  
  // If we couldn't extract an ID, assume the URL itself is the ID
  if (!fileId && url.length < 100 && !url.includes('/')) {
    fileId = url;
  }
  
  // Convert to direct view URL
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  // If we still couldn't parse it, return the original
  return url;
}

/**
 * Fetches product data from Google Sheets API v4
 * @returns Array of Product objects
 * @throws Error if API key or Sheet ID is missing, or if fetch fails
 */
export async function getProductsFromSheet(): Promise<Product[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  // Validate environment variables
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
  }

  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  // Sheet range - assumes data starts from A1 with headers in first row
  const range = 'Sheet1!A:E'; // Columns: id, name, description, price, image_url

  // Build Google Sheets API v4 URL
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      // Revalidate every 60 seconds (or adjust as needed)
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Sheets API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        sheetId,
      });
      
      if (response.status === 403) {
        throw new Error(
          `Google Sheets API access denied (403). Please ensure:\n` +
          `1. Google Sheets API is enabled in your Google Cloud project\n` +
          `2. The spreadsheet (ID: ${sheetId}) is shared as "Anyone with the link can view"\n` +
          `3. Your API key has access to Google Sheets API`
        );
      }
      
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }

    const data: SheetResponse = await response.json();

    // Handle empty sheet
    if (!data.values || data.values.length <= 1) {
      console.warn('Google Sheet is empty or has only headers');
      return [];
    }

    // Skip header row (first row) and map to Product objects
    const products: Product[] = data.values.slice(1).map((row, index) => {
      // Ensure we have all required columns
      const [id, name, description, priceStr, imageUrl] = row;

      // Validate required fields
      if (!id || !name || !priceStr) {
        console.warn(`Row ${index + 2} is missing required fields, skipping`);
        return null;
      }

      // Parse price
      const price = parseFloat(priceStr);
      if (isNaN(price)) {
        console.warn(`Row ${index + 2} has invalid price: ${priceStr}, skipping`);
        return null;
      }

      return {
        id: id.trim(),
        name: name.trim(),
        description: description?.trim() || '',
        price,
        imageUrl: convertGoogleDriveUrl(imageUrl?.trim() || ''),
      };
    }).filter((product): product is Product => product !== null);

    return products;
  } catch (error) {
    console.error('Failed to fetch products from Google Sheets:', error);
    throw error;
  }
}

/**
 * Helper function to get featured products (first 3)
 * @returns Array of up to 3 Product objects
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getProductsFromSheet();
  return allProducts.slice(0, 3);
}
