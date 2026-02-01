# ChocoVilla - Premium Chocolate Website

A modern, responsive website for ChocoVilla, a premium chocolate brand, built with Next.js 14 App Router and Tailwind CSS. **Product data is managed via Google Sheets** for easy updates without code changes.

## 🍫 Features

- **Google Sheets Backend**: Products managed via Google Sheets - no database needed!
- **Modern Design**: Luxury chocolate brand aesthetic with dark brown, black, gold accents, and soft cream color palette
- **Fully Responsive**: Mobile-first design that works seamlessly across all devices
- **WhatsApp Integration**: Direct ordering via WhatsApp with pre-filled messages
- **SEO Optimized**: Metadata API for better search engine visibility
- **Smooth Animations**: Premium hover effects and transitions
- **Clean Architecture**: Scalable folder structure with reusable components
- **Vercel Ready**: Optimized for Vercel deployment with serverless functions

## 📄 Pages

1. **Home Page** - Hero section, brand introduction, featured products, and CTAs
2. **About Us** - Brand story, mission, values, and commitment to quality
3. **Products** - Grid-based product listing with WhatsApp ordering
4. **Contact** - Contact form and WhatsApp chat integration

## 🛠️ Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for component-based architecture

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- Google Cloud account (for Sheets API)
- Google Sheet with product data

### Quick Setup

1. **Clone and install dependencies:**

```bash
npm install
# or
yarn install
```

2. **Set up Google Sheets (Important!)**

Follow the detailed guide in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) to:
- Create your Google Sheet with product data
- Get your Google API key
- Configure environment variables

3. **Configure environment variables:**

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your credentials:
# GOOGLE_API_KEY=your_api_key_here
# GOOGLE_SHEET_ID=your_sheet_id_here
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the website.

## 📦 Project Structure

```
chocovilla/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── products/        # Products page (fetches from Google Sheets)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable components
│   │   ├── Button.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ProductCard.tsx
│   ├── lib/                 # Utility functions
│   │   └── googleSheets.ts  # Google Sheets API integration
│   └── data/                # Static data (fallback only)
│       └── products.ts      
├── public/                   # Static files
├── .env.local.example       # Environment variables template
├── GOOGLE_SHEETS_SETUP.md   # Detailed Google Sheets setup guide
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🎨 Color Palette

- **Primary Brown**: `#3E2723`
- **Primary Dark**: `#1a1a1a`
- **Primary Gold**: `#D4AF37`
- **Primary Cream**: `#FFF8E7`

## 📱 WhatsApp Integration

The website integrates WhatsApp for seamless customer communication:

- **Phone Number**: +91 98259 47680
- **Product Orders**: Click "Order Now" on any product to send a pre-filled message
- **Contact Form**: Submits via WhatsApp with form details
- **Direct Chat**: CTA buttons throughout the site for instant messaging

### WhatsApp Message Format

```
Hello ChocoVilla, I am interested in {PRODUCT_NAME}. Please share details.
```

## 🔧 Customization

### Managing Products via Google Sheets

**All products are managed through Google Sheets!** This means you can:
- ✅ Add, edit, or remove products without touching code
- ✅ Update prices instantly
- ✅ Change product images anytime
- ✅ Non-technical team members can manage inventory

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for the complete guide.

### Google Sheet Structure:

| id | name | description | price | image_url |
|----|------|-------------|-------|-----------|
| 1 | Product Name | Description here | 599 | https://drive.google.com/uc?export=view&id=FILE_ID |

### Changing WhatsApp Number

Update the phone number in:
- `src/components/ProductCard.tsx`
- `src/components/Footer.tsx`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/contact/page.tsx`

### Modifying Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    brown: '#3E2723',
    dark: '#1a1a1a',
    gold: '#D4AF37',
    cream: '#FFF8E7',
  },
}
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

### Vercel Deployment Steps:

1. Push your code to GitHub
2. Import your repository in Vercel
3. **Add Environment Variables** in Vercel project settings:
   - `GOOGLE_API_KEY` = Your Google Sheets API key
   - `GOOGLE_SHEET_ID` = Your Google Sheet ID
4. Deploy!

Vercel will automatically detect Next.js and deploy. Your Google Sheets data will be fetched server-side with automatic caching.

### Other Deployment Options:

- **Netlify** - Works great with Next.js
- **AWS Amplify** - Full-stack deployment
- **Railway** - Simple deployment
- Any Node.js hosting platform

**Important**: Make sure to set environment variables in your deployment platform!

## 📄 License

This project is created for ChocoVilla.

## 🙏 Acknowledgments

- Images from Unsplash (placeholder images)
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

---

**Made with ❤️ for ChocoVilla**
