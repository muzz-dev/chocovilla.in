# Google Sheets Integration - Setup Guide

This guide explains how to set up Google Sheets as the product backend for ChocoVilla.

## 📋 Prerequisites

1. Google Account
2. Google Cloud Project with Sheets API enabled
3. Google Sheets spreadsheet with product data

---

## 🔧 Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "ChocoVilla Products"
3. Set up the first row (header) with these exact column names:
   ```
   id,name,description,market_price,our_price,image_url,category,best_seller,limited_stock,in_stock,display_order,show_on_home
   ```

### Column Details:
- **id**: Unique product identifier (number)
- **name**: Product name
- **description**: Product description
- **market_price**: Original price (optional, can be empty)
- **our_price**: Your selling price (required)
- **image_url**: Google Drive image URL
- **category**: Product category (e.g., "Bars", "Truffles", "Gift Boxes")
- **best_seller**: YES/NO (shows star badge)
- **limited_stock**: YES/NO (shows limited stock warning badge)
- **in_stock**: YES/NO (controls availability)
- **display_order**: Numeric priority (1, 2, 3... lower = higher priority)
- **show_on_home**: YES/NO (shows product on homepage featured section)

### Example Data:

| id | name | description | market_price | our_price | image_url | category | best_seller | limited_stock | in_stock | display_order | show_on_home |
|----|------|-------------|--------------|-----------|-----------|----------|-------------|---------------|----------|---------------|--------------|
| 1 | Dark Chocolate Truffles | Rich and velvety dark chocolate truffles made with 70% premium cocoa | 599 | 499 | https://drive.google.com/uc?export=view&id=YOUR_FILE_ID | Truffles | YES | NO | YES | 1 | YES |
| 2 | Milk Chocolate Pralines | Smooth milk chocolate pralines with hazelnut filling | 549 | 499 | https://drive.google.com/uc?export=view&id=YOUR_FILE_ID | Pralines | NO | YES | YES | 2 | YES |
| 3 | Caramel Sea Salt Dark | Dark chocolate with gourmet caramel and sea salt | 699 | 649 | https://drive.google.com/uc?export=view&id=YOUR_FILE_ID | Bars | NO | NO | YES | 3 | YES |
| 4 | White Chocolate Raspberry | Delicate white chocolate infused with real raspberry essence | 649 | 599 | https://drive.google.com/uc?export=view&id=YOUR_FILE_ID | Bars | NO | NO | YES | 4 | NO |

### Display Priority Logic:
- **display_order**: Lower numbers appear first (1 = highest priority)
- **show_on_home**: Only products with YES appear in homepage featured section
- Homepage shows first 3 products where `show_on_home = YES` (ordered by display_order)

### Stock Status Logic:
- **Available**: `in_stock = YES` + `limited_stock = NO` → Normal product
- **Limited Stock**: `in_stock = YES` + `limited_stock = YES` → Shows warning badge
- **Out of Stock**: `in_stock = NO` → Shows "Notify me" button

---

## 🔄 Updating Existing Sheets

If you have an existing Google Sheet with the old format (8 columns), you need to add the new columns:

### Old Format (8 columns):
```
id,name,description,market_price,our_price,image_url,category,best_seller
```

### New Format (10 columns):
```
id,name,description,market_price,our_price,image_url,category,best_seller,limited_stock,in_stock
```

### How to Update:
1. Open your existing Google Sheet
2. Insert two new columns after `best_seller`
3. Name them `limited_stock` and `in_stock`
4. Fill with YES/NO values as needed
5. **Important**: The app will automatically work with both old and new formats!

---

## 🖼️ Step 2: Upload Images to Google Drive

### Option A: Using Google Drive Direct Links

1. Upload images to Google Drive
2. Right-click the image → Get link → Set to "Anyone with the link"
3. Copy the File ID from the URL:
   ```
   https://drive.google.com/file/d/FILE_ID_HERE/view
   ```
4. Use this format in your sheet:
   ```
   https://drive.google.com/uc?export=view&id=FILE_ID_HERE
   ```

### Option B: Using Google Drive Thumbnail URLs

For better performance, use:
```
https://lh3.googleusercontent.com/d/FILE_ID_HERE
```

---

## 🔑 Step 3: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable **Google Sheets API v4**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - (Optional) Restrict the key to Google Sheets API only

---

## 📝 Step 4: Get Google Sheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

Copy the `SHEET_ID_HERE` part.

---

## 🎫 Step 4: Set Up Promo Codes (Optional)

Create a second sheet named "Promo_Codes" in your spreadsheet for discount codes:

### Promo_Codes Sheet Setup:

1. In your Google Sheet, create a new sheet tab named "Promo_Codes"
2. Set up the first row (header) with these exact column names:
   ```
   code,active,discount_percent,min_order_amount,expiry_date,description
   ```

### Column Details:
- **code**: Promo code string (case-insensitive)
- **active**: YES/NO (controls if code can be used)
- **discount_percent**: Number 0-100 (percentage discount)
- **min_order_amount**: Minimum cart subtotal required (0 = no minimum)
- **expiry_date**: YYYY-MM-DD format (leave empty for no expiry)
- **description**: Description shown to users

### Example Promo Codes:

| code | active | discount_percent | min_order_amount | expiry_date | description |
|------|--------|------------------|------------------|-------------|-------------|
| THALAFORAREASON | YES | 7 | 999 | 2026-12-31 | Special offer |
| WELCOME10 | YES | 10 | 499 |  | New customer offer |
| OLDPROMO | NO | 20 | 0 | 2024-12-31 | Expired |

### Promo Code Logic:
- **Validation Order**: Code exists → Active → Not expired → Minimum order met
- **Discount**: `(subtotal × discount_percent) / 100`
- **Error Messages**: Specific messages for each validation failure
- **One Code Per Cart**: Only one promo code can be applied at a time

---

## ⚙️ Step 5: Configure Environment Variables

### For Local Development:

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```env
   GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```

### For Vercel Deployment:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add two variables:
   - `GOOGLE_API_KEY` = Your API key
   - `GOOGLE_SHEET_ID` = Your sheet ID
4. Make sure they're set for "Production", "Preview", and "Development"

---

## 🚀 Step 6: Test Locally

1. Stop the dev server (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/products`
4. You should see products loaded from your Google Sheet

---

## 🎨 Image Format Guidelines

### Google Drive Image URLs

**Format 1 (Direct View):**
```
https://drive.google.com/uc?export=view&id=FILE_ID
```

**Format 2 (Thumbnail):**
```
https://lh3.googleusercontent.com/d/FILE_ID
```

### Image Requirements:
- **Format**: JPG, PNG, WebP
- **Recommended size**: 800x600px or higher
- **Aspect ratio**: 4:3 or 1:1 works best
- **File size**: Under 2MB per image
- **Permissions**: Must be publicly accessible

---

## 🔍 Troubleshooting

### Products Not Loading?

1. **Check API Key**:
   - Verify it's correct in `.env.local` or Vercel settings
   - Ensure Google Sheets API is enabled

2. **Check Sheet ID**:
   - Verify it matches your spreadsheet
   - Ensure sheet is named "Sheet1" (or update the range in code)

3. **Check Sheet Permissions**:
   - Open sharing settings
   - Set to "Anyone with the link can view"

4. **Check Console Logs**:
   ```bash
   npm run dev
   ```
   Look for error messages in the terminal

### Images Not Displaying?

1. **Verify Image URL**:
   - Open the URL in a browser
   - Should display the image directly

2. **Check File Permissions**:
   - Google Drive file must be set to "Anyone with the link"

3. **Use Correct Format**:
   - Use `uc?export=view` format for Google Drive links

### API Quota Exceeded?

Google Sheets API has daily quotas:
- **Free tier**: 100 requests per 100 seconds per user
- **Adjust revalidation**: Edit `src/lib/googleSheets.ts` → change `revalidate: 60` to a higher value

---

## 📊 Sheet Structure Reference

### Column Details:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique identifier (1, 2, 3, etc.) |
| name | string | Yes | Product name |
| description | string | No | Product description |
| price | number | Yes | Price in rupees (no ₹ symbol) |
| image_url | string | No | Full Google Drive image URL |

### Example Sheet:
```
A          B                        C                                          D      E
id         name                     description                                price  image_url
1          Dark Chocolate Truffles  Rich and velvety dark chocolate truffles  599    https://drive.google.com/uc?export=view&id=ABC123
2          Milk Chocolate Pralines  Smooth milk chocolate with hazelnut       549    https://lh3.googleusercontent.com/d/DEF456
```

---

## 🌐 Deploying to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- ✅ Fetch products from Google Sheets
- ✅ Cache data for 60 seconds
- ✅ Handle errors gracefully
- ✅ Display fallback images if needed

---

## 🔒 Security Notes

- ✅ API keys are server-side only (never exposed to client)
- ✅ `.env.local` is in `.gitignore` (never committed)
- ✅ Google Drive images must be public (required for display)
- ✅ API key can be restricted to Sheets API only

---

## 📝 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

Need help? Contact the development team or check the main README.md file.
