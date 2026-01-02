# Finance Dashboard - Setup Instructions

This project is a finance dashboard built with Next.js 15 that visualizes economic data from the Federal Reserve Economic Data (FRED) API.

## Prerequisites

- Node.js 18+ installed
- A FRED API key (free - get one at https://fredaccount.stlouisfed.org/apikeys)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your FRED API key:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your FRED API key
FRED_API_KEY="your_fred_api_key_here"
```

**Get your FRED API key:**
1. Go to https://fredaccount.stlouisfed.org/apikeys
2. Create a free account or sign in
3. Click "Request API Key"
4. Copy your API key and paste it in `.env.local`

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard.

## What's Included

### Economic Indicators
- **Unemployment Rate** - Current civilian unemployment rate
- **Consumer Price Index (CPI)** - Inflation measure
- **Federal Funds Rate** - Target interest rate set by the Fed
- **GDP** - Gross Domestic Product
- **Treasury Yields** - 2-year and 10-year treasury rates
- **S&P 500** - Stock market index
- **Retail Sales** - Consumer spending indicator
- **Industrial Production** - Manufacturing activity

### Features
- ✅ Real-time data from FRED API
- ✅ Interactive time series charts (5-year history)
- ✅ Key indicator cards with trend indicators
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Server-side data caching
- ✅ Type-safe API client with TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main dashboard page
│   └── api/fred/series/      # API route for FRED data
├── modules/
│   └── fred-api/             # FRED API integration module
│       ├── components/       # React components
│       │   ├── EconomicIndicatorCard.tsx
│       │   └── TimeSeriesChart.tsx
│       ├── hooks/            # React hooks
│       │   └── useFredSeries.ts
│       ├── lib/              # API client
│       │   └── fred-client.ts
│       └── types/            # TypeScript types
│           └── index.ts
└── config/
    └── site-config.ts        # App configuration
```

## Using the FRED API Module

### Fetch Economic Data in Your Components

```tsx
import { useFredSeries, POPULAR_SERIES } from "@/modules/fred-api";

function MyComponent() {
  const { data, loading, error } = useFredSeries(POPULAR_SERIES.GDP);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Latest GDP: ${data[data.length - 1].value}</div>;
}
```

### Available Economic Series

```tsx
import { POPULAR_SERIES } from "@/modules/fred-api";

// Common indicators
POPULAR_SERIES.GDP                    // Gross Domestic Product
POPULAR_SERIES.UNEMPLOYMENT           // Unemployment Rate
POPULAR_SERIES.INFLATION              // Consumer Price Index
POPULAR_SERIES.FED_FUNDS_RATE        // Federal Funds Rate
POPULAR_SERIES.SP500                  // S&P 500
POPULAR_SERIES.TREASURY_10Y          // 10-Year Treasury Yield
POPULAR_SERIES.TREASURY_2Y           // 2-Year Treasury Yield
POPULAR_SERIES.M2_MONEY_SUPPLY       // M2 Money Stock
POPULAR_SERIES.RETAIL_SALES          // Retail Sales
POPULAR_SERIES.HOUSING_STARTS        // Housing Starts
// ... and more
```

### Components

#### EconomicIndicatorCard
Displays a single indicator with current value and trend:

```tsx
import { EconomicIndicatorCard } from "@/modules/fred-api";

<EconomicIndicatorCard
  seriesId="UNRATE"
  title="Unemployment Rate"
  unit="%"
  description="Civilian unemployment rate"
/>
```

#### TimeSeriesChart
Renders a line chart for historical data:

```tsx
import { TimeSeriesChart } from "@/modules/fred-api";

<TimeSeriesChart
  seriesId="GDP"
  title="Gross Domestic Product"
  color="#3b82f6"
  observationStart="2020-01-01"
/>
```

## Customization

### Add New Indicators

Edit `src/app/page.tsx` to add more indicators:

```tsx
<EconomicIndicatorCard
  seriesId="PAYEMS"  // Any FRED series ID
  title="Total Nonfarm Payroll"
  description="Number of employees on payrolls"
/>
```

Find more series at https://fred.stlouisfed.org/

### Change Theme

Edit `src/config/site-config.ts`:

```typescript
export const siteConfig = {
  theme: "blue",  // Options: "purple" | "blue" | "green" | "orange" | "pink"
  // ...
};
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add `FRED_API_KEY` environment variable in Vercel project settings
4. Deploy

### Environment Variables for Production

Make sure to set these in your production environment:

```
FRED_API_KEY=your_production_fred_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## API Rate Limits

FRED API has the following limits (as of 2024):
- 120 requests per minute
- No daily limit

The dashboard caches responses:
- Series observations: 1 hour
- Series metadata: 24 hours

## Troubleshooting

### "FRED_API_KEY environment variable is not set"
- Make sure you created `.env.local` file
- Verify the API key is correctly formatted
- Restart the dev server after adding the key

### Data not loading
- Check that your FRED API key is valid
- Verify you have internet connection
- Check browser console for error messages

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## Learn More

- [FRED API Documentation](https://fred.stlouisfed.org/docs/api/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/)

## Support

For issues or questions:
- FRED API: https://fredhelp.stlouisfed.org/
- Next.js: https://github.com/vercel/next.js/discussions

---

**Ready to use your FRED API key!** Just add it to `.env.local` and run `npm run dev`.
