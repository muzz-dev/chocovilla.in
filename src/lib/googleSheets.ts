// Server-side utility to fetch products from Google Sheets
// This file should only be imported in Server Components or API Routes

export interface Product {
  id: string;
  name: string;
  description: string;
  marketPrice: number;
  ourPrice: number;
  imageUrl: string;
  category: string;
  bestSeller: boolean;
  inStock: boolean;
  limitedStock: boolean;
  displayOrder: number;
  showOnHome: boolean;
}

export interface Statistics {
  happyCustomers: number;
  totalOrders: number;
  citiesServed: number;
}

export interface PromoCode {
  code: string;
  active: boolean;
  discountPercent: number;
  minOrderAmount: number;
  expiryDate: string | null; // YYYY-MM-DD format or null
  description: string;
}

export interface Testimonial {
  name: string;
  message: string;
  rating: number;
  city: string;
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

  // Sheet range - try new format first (with all columns including display_order and show_on_home)
  // Columns: id, name, description, market_price, our_price, image_url, category, best_seller, limited_stock, in_stock, display_order, show_on_home
  let range = 'Products!A:L';
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      // Revalidate every 60 seconds (or adjust as needed)
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      // If 400 error, try fallback formats in order
      if (response.status === 400) {
        console.warn('New column format (A:L) not found, trying older formats');

        // Try A:K format (with display_order but without show_on_home)
        let fallbackRange = 'Products!A:K';
        let fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${fallbackRange}?key=${apiKey}`;

        let fallbackResponse = await fetch(fallbackUrl, { next: { revalidate: 60 } });

        if (!fallbackResponse.ok) {
          // Try A:J format (with limited_stock/in_stock but without display_order/show_on_home)
          console.warn('A:K format not found, trying A:J format');
          fallbackRange = 'Products!A:J';
          fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${fallbackRange}?key=${apiKey}`;
          fallbackResponse = await fetch(fallbackUrl, { next: { revalidate: 60 } });

          if (!fallbackResponse.ok) {
            // Try A:I format (oldest format)
            console.warn('A:J format not found, trying A:I format');
            fallbackRange = 'Products!A:I';
            fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${fallbackRange}?key=${apiKey}`;
            fallbackResponse = await fetch(fallbackUrl, { next: { revalidate: 60 } });

            if (!fallbackResponse.ok) {
              throw new Error(`Google Sheets API error: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
            }
          }
        }

        // Determine format based on successful range and process accordingly
        const columnCount = fallbackRange.split(':')[1].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        let hasNewColumns = false;
        let hasDisplayColumns = false;

        if (columnCount >= 11) { // A:K or higher
          hasDisplayColumns = true;
        }
        if (columnCount >= 10) { // A:J or higher
          hasNewColumns = true;
        }

        // Process with determined format
        const data: SheetResponse = await fallbackResponse.json();
        return processSheetData(data, hasNewColumns, hasDisplayColumns);
      }

      const errorData = await response.json().catch(() => ({}));
      console.error('Google Sheets API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        sheetId,
        range,
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
    return processSheetData(data, true, true); // hasNewColumns=true, hasDisplayColumns=true
  } catch (error) {
    console.error('Failed to fetch products from Google Sheets:', error);
    throw error;
  }
}

/**
 * Process sheet data with backward compatibility
 * @param data Sheet response data
 * @param hasNewColumns Whether the sheet has limited_stock and in_stock columns
 * @param hasDisplayColumns Whether the sheet has display_order and show_on_home columns
 */
function processSheetData(data: SheetResponse, hasNewColumns: boolean, hasDisplayColumns: boolean): Product[] {
  // Handle empty sheet
  if (!data.values || data.values.length <= 1) {
    console.warn('Google Sheet is empty or has only headers');
    return [];
  }

  // Skip header row (first row) and map to Product objects
  const products: Product[] = data.values.slice(1).map((row, index) => {
    let id: string, name: string, description: string, marketPriceStr: string, ourPriceStr: string,
        imageUrl: string, category: string, bestSellerStr: string, limitedStockStr: string,
        inStockStr: string, displayOrderStr: string, showOnHomeStr: string;

    // Determine column structure based on available data
    const columnCount = row.length;

    if (hasDisplayColumns && columnCount >= 12) {
      // Full format: 12 columns (A:L) - all columns including display_order and show_on_home
      [id, name, description, marketPriceStr, ourPriceStr, imageUrl, category, bestSellerStr, limitedStockStr, inStockStr, displayOrderStr, showOnHomeStr] = row;
    } else if (hasNewColumns && columnCount >= 10) {
      // Medium format: 10 columns (A:J) - has limited_stock/in_stock but no display columns
      [id, name, description, marketPriceStr, ourPriceStr, imageUrl, category, bestSellerStr, limitedStockStr, inStockStr] = row;
      displayOrderStr = '999'; // Default high priority
      showOnHomeStr = 'NO'; // Default to not show on home
    } else {
      // Old format: 9 columns (A:I) or fewer - minimal columns
      [id, name, description, marketPriceStr, ourPriceStr, imageUrl, category, bestSellerStr, inStockStr] = row;
      limitedStockStr = 'NO'; // Default to NO for backward compatibility
      displayOrderStr = '999'; // Default high priority
      showOnHomeStr = 'NO'; // Default to not show on home
    }

    // Validate required fields (id, name, ourPrice are required)
    if (!id || !name || !ourPriceStr) {
      console.warn(`Row ${index + 2} is missing required fields, skipping`);
      return null;
    }

    // Parse our price (required)
    const ourPrice = parseFloat(ourPriceStr);
    if (isNaN(ourPrice)) {
      console.warn(`Row ${index + 2} has invalid ourPrice: ${ourPriceStr}, skipping`);
      return null;
    }

    // Parse market price (optional, can be 0 or missing)
    const marketPrice = marketPriceStr ? parseFloat(marketPriceStr) : 0;

    // Parse best seller flag (optional, defaults to false)
    // Accepts: "true", "yes", "1", "TRUE", "YES" as true
    const bestSeller = bestSellerStr ?
      ['true', 'yes', '1'].includes(bestSellerStr.toLowerCase().trim()) :
      false;

    // Parse limited stock flag (optional, defaults to false)
    // Accepts: "true", "yes", "1", "TRUE", "YES" as true
    const limitedStock = limitedStockStr ?
      ['true', 'yes', '1'].includes(limitedStockStr.toLowerCase().trim()) :
      false;

    // Parse in stock flag (optional, defaults to true)
    // Accepts: "true", "yes", "1", "TRUE", "YES" as true
    const inStock = inStockStr ?
      ['true', 'yes', '1'].includes(inStockStr.toLowerCase().trim()) :
      true;

    // Parse display order (optional, defaults to 999 for low priority)
    const displayOrder = displayOrderStr ? parseInt(displayOrderStr.trim()) : 999;
    // Ensure it's a valid number, default to 999 if not
    const finalDisplayOrder = isNaN(displayOrder) ? 999 : displayOrder;

    // Parse show on home flag (optional, defaults to false)
    // Accepts: "true", "yes", "1", "TRUE", "YES" as true
    const showOnHome = showOnHomeStr ?
      ['true', 'yes', '1'].includes(showOnHomeStr.toLowerCase().trim()) :
      false;

    return {
      id: id.trim(),
      name: name.trim(),
      description: description?.trim() || '',
      marketPrice: isNaN(marketPrice) ? 0 : marketPrice,
      ourPrice,
      imageUrl: convertGoogleDriveUrl(imageUrl?.trim() || ''),
      category: category?.trim() || 'Uncategorized',
      bestSeller,
      limitedStock,
      inStock,
      displayOrder: finalDisplayOrder,
      showOnHome,
    };
  }).filter((product): product is Product => product !== null);

  // Sort products by displayOrder (ascending - lower number = higher priority)
  const sortedProducts = products.sort((a, b) => a.displayOrder - b.displayOrder);

  return sortedProducts;
}

/**
 * Helper function to get featured products for homepage (products marked show_on_home = YES)
 * @returns Array of up to 3 Product objects that are marked to show on home
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getProductsFromSheet();
  // Filter products where showOnHome is true and take first 3 (already sorted by displayOrder)
  return allProducts.filter(product => product.showOnHome).slice(0, 3);
}

/**
 * Fetches promo codes from Google Sheets API v4
 * @returns Array of PromoCode objects
 * @throws Error if API key or Sheet ID is missing, or if fetch fails
 */
export async function getPromoCodesFromSheet(): Promise<PromoCode[]> {
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
  // Columns: code, active, discount_percent, min_order_amount, expiry_date, description
  const range = 'Promo_Codes!A:F';

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
        range,
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
      console.warn('Promo_Codes sheet is empty or has only headers');
      return [];
    }

    // Skip header row (first row) and map to PromoCode objects
    const promoCodes: PromoCode[] = data.values.slice(1).map((row, index) => {
      // Ensure we have all required columns
      const [code, activeStr, discountPercentStr, minOrderAmountStr, expiryDateStr, description] = row;

      // Validate required fields (code, discountPercent are required)
      if (!code || !discountPercentStr) {
        console.warn(`Row ${index + 2} is missing required fields, skipping`);
        return null;
      }

      // Parse discount percent (required)
      const discountPercent = parseFloat(discountPercentStr);
      if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
        console.warn(`Row ${index + 2} has invalid discountPercent: ${discountPercentStr}, skipping`);
        return null;
      }

      // Parse active flag (optional, defaults to false)
      const active = activeStr ?
        ['true', 'yes', '1'].includes(activeStr.toLowerCase().trim()) :
        false;

      // Parse min order amount (optional, defaults to 0)
      const minOrderAmount = minOrderAmountStr ? parseFloat(minOrderAmountStr) : 0;
      const finalMinOrderAmount = isNaN(minOrderAmount) ? 0 : minOrderAmount;

      // Parse expiry date (optional, can be empty)
      const expiryDate = expiryDateStr?.trim() || null;

      return {
        code: code.trim().toUpperCase(), // Normalize to uppercase
        active,
        discountPercent,
        minOrderAmount: finalMinOrderAmount,
        expiryDate,
        description: description?.trim() || '',
      };
    }).filter((promoCode): promoCode is PromoCode => promoCode !== null);

    return promoCodes;
  } catch (error) {
    console.error('Failed to fetch promo codes from Google Sheets:', error);
    throw error;
  }
}

/**
 * Validates a promo code against current cart conditions
 * @param code The promo code to validate
 * @param cartSubtotal The current cart subtotal
 * @returns Object with validation result and promo details
 */
export async function validatePromoCode(code: string, cartSubtotal: number): Promise<{
  valid: boolean;
  promoCode?: PromoCode;
  error?: string;
  discount?: number;
}> {
  try {
    const promoCodes = await getPromoCodesFromSheet();

    // Find the promo code (case-insensitive)
    const promoCode = promoCodes.find(pc => pc.code.toLowerCase() === code.toLowerCase());

    if (!promoCode) {
      return { valid: false, error: 'Invalid or inactive promo code' };
    }

    // Check if active
    if (!promoCode.active) {
      return { valid: false, error: 'Invalid or inactive promo code' };
    }

    // Check expiry date
    if (promoCode.expiryDate) {
      const today = new Date();
      const expiry = new Date(promoCode.expiryDate);
      if (today > expiry) {
        return { valid: false, error: 'This promo code has expired' };
      }
    }

    // Check minimum order amount
    if (cartSubtotal < promoCode.minOrderAmount) {
      return {
        valid: false,
        error: `Minimum order amount is ₹${promoCode.minOrderAmount.toLocaleString()}`
      };
    }

    // Calculate discount
    const discount = Math.round((cartSubtotal * promoCode.discountPercent) / 100);

    return {
      valid: true,
      promoCode,
      discount
    };
  } catch (error) {
    console.error('Failed to validate promo code:', error);
    // Graceful fallback - allow promo codes to work even if sheet is unreachable
    return { valid: false, error: 'Unable to validate promo code. Please try again.' };
  }
}

/**
 * Fetches testimonial data from Google Sheets API v4
 * @returns Array of Testimonial objects where featured = YES
 * @throws Error if API key or Sheet ID is missing, or if fetch fails
 */
export async function getTestimonialsFromSheet(): Promise<Testimonial[]> {
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
  // Columns: name, message, rating, city, featured
  const range = 'Testimonials!A:E';

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
      console.warn('Testimonials sheet is empty or has only headers');
      return [];
    }

    // Skip header row (first row) and map to Testimonial objects
    const testimonials: Testimonial[] = data.values.slice(1).map((row, index) => {
      // Ensure we have all required columns
      const [name, message, ratingStr, city, featured] = row;

      // Only include if featured = YES (case insensitive)
      if (!featured || featured.toLowerCase().trim() !== 'yes') {
        return null;
      }

      // Validate required fields
      if (!name || !message || !ratingStr) {
        console.warn(`Testimonial row ${index + 2} is missing required fields, skipping`);
        return null;
      }

      // Parse rating (1-5)
      const rating = parseInt(ratingStr, 10);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        console.warn(`Testimonial row ${index + 2} has invalid rating: ${ratingStr}, skipping`);
        return null;
      }

      return {
        name: name.trim(),
        message: message.trim(),
        rating,
        city: city?.trim() || '',
      };
    }).filter((testimonial): testimonial is Testimonial => testimonial !== null);

    return testimonials;
  } catch (error) {
    console.error('Failed to fetch testimonials from Google Sheets:', error);
    throw error;
  }
}

/**
 * Fetches statistics data from Google Sheets API v4
 * @returns Statistics object with happyCustomers, totalOrders, and citiesServed
 * @throws Error if API key or Sheet ID is missing, or if fetch fails
 */
export async function getStatisticsFromSheet(): Promise<Statistics> {
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
  // Columns: happy_customers, total_orders_till_now, cities_served
  const range = 'Statistics!A:C';

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

    // Handle empty sheet or missing data
    if (!data.values || data.values.length <= 1) {
      console.warn('Statistics sheet is empty or has only headers, using default values');
      return {
        happyCustomers: 1205,
        totalOrders: 5000,
        citiesServed: 42
      };
    }

    // Get the first data row (skip header)
    const [happyCustomersStr, totalOrdersStr, citiesServedStr] = data.values[1];

    // Parse values with fallbacks
    const happyCustomers = happyCustomersStr ? parseInt(happyCustomersStr, 10) : 1205;
    const totalOrders = totalOrdersStr ? parseInt(totalOrdersStr, 10) : 5000;
    const citiesServed = citiesServedStr ? parseInt(citiesServedStr, 10) : 42;

    // Validate parsed values
    if (isNaN(happyCustomers) || isNaN(totalOrders) || isNaN(citiesServed)) {
      console.warn('Invalid statistics data, using default values');
      return {
        happyCustomers: 1205,
        totalOrders: 5000,
        citiesServed: 42
      };
    }

    return {
      happyCustomers,
      totalOrders,
      citiesServed
    };
  } catch (error) {
    console.error('Failed to fetch statistics from Google Sheets:', error);
    // Return default values on error
    return {
      happyCustomers: 1205,
      totalOrders: 5000,
      citiesServed: 42
    };
  }
}
