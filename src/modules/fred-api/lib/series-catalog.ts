/**
 * Comprehensive catalog of FRED data series organized by category
 */

export interface SeriesInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  units: string;
  source: string;
  calculation?: string;
  updateFrequency: string;
  notes?: string;
}

export const SERIES_CATALOG: SeriesInfo[] = [
  // Employment & Labor Market
  {
    id: "UNRATE",
    name: "Unemployment Rate",
    description: "Civilian unemployment rate",
    category: "Employment",
    units: "%",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Number of unemployed persons divided by civilian labor force, seasonally adjusted",
    updateFrequency: "Monthly",
    notes: "Key indicator of labor market health. Rates above 5% typically signal economic weakness.",
  },
  {
    id: "PAYEMS",
    name: "Total Nonfarm Payroll",
    description: "All employees, thousands of persons",
    category: "Employment",
    units: "Thousands",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Total number of paid employees excluding farm workers, private household employees, and non-profit organization employees",
    updateFrequency: "Monthly",
    notes: "One of the most closely watched employment indicators. Changes of 200k+ jobs/month considered strong growth.",
  },
  {
    id: "CIVPART",
    name: "Labor Force Participation Rate",
    description: "Civilian labor force participation rate",
    category: "Employment",
    units: "%",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Civilian labor force divided by civilian noninstitutional population, seasonally adjusted",
    updateFrequency: "Monthly",
    notes: "Measures the share of working-age population actively working or seeking work. Declining rate can indicate discouraged workers.",
  },
  {
    id: "EMRATIO",
    name: "Employment-Population Ratio",
    description: "Employment-population ratio",
    category: "Employment",
    units: "%",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Employment level divided by civilian noninstitutional population, seasonally adjusted",
    updateFrequency: "Monthly",
    notes: "Alternative to unemployment rate that isn't affected by labor force participation changes.",
  },

  // Prices & Inflation
  {
    id: "CPIAUCSL",
    name: "Consumer Price Index",
    description: "Consumer Price Index for All Urban Consumers",
    category: "Inflation",
    units: "Index",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Measures average change in prices paid by urban consumers for a market basket of goods and services, 1982-84=100",
    updateFrequency: "Monthly",
    notes: "The primary inflation gauge. Fed targets 2% annual inflation. Includes food and energy which can be volatile.",
  },
  {
    id: "CPILFESL",
    name: "Core CPI",
    description: "CPI less food and energy",
    category: "Inflation",
    units: "Index",
    source: "U.S. Bureau of Labor Statistics (BLS)",
    calculation: "Consumer Price Index excluding volatile food and energy categories, 1982-84=100",
    updateFrequency: "Monthly",
    notes: "Preferred by policymakers as it filters out short-term price volatility and shows underlying inflation trends.",
  },
  {
    id: "PCE",
    name: "Personal Consumption Expenditures",
    description: "Personal consumption expenditures price index",
    category: "Inflation",
    units: "Index",
    source: "U.S. Bureau of Economic Analysis (BEA)",
    calculation: "Price index for goods and services purchased by households, 2017=100",
    updateFrequency: "Monthly",
    notes: "The Federal Reserve's preferred inflation measure. Broader than CPI and uses current spending patterns.",
  },
  {
    id: "PCEPILFE",
    name: "Core PCE",
    description: "PCE excluding food and energy",
    category: "Inflation",
    units: "Index",
    source: "U.S. Bureau of Economic Analysis (BEA)",
    calculation: "PCE price index excluding food and energy, 2017=100",
    updateFrequency: "Monthly",
    notes: "Fed's primary inflation target is 2% Core PCE. Most important inflation gauge for Fed policy decisions.",
  },

  // GDP & Output
  {
    id: "GDP",
    name: "Gross Domestic Product",
    description: "Gross Domestic Product",
    category: "Output",
    units: "Billions",
    source: "U.S. Bureau of Economic Analysis (BEA)",
    calculation: "Total market value of all final goods and services produced in the U.S., seasonally adjusted annual rate",
    updateFrequency: "Quarterly",
    notes: "Primary measure of economic output. Healthy growth is typically 2-3% annually. Released with a 1-month lag.",
  },
  {
    id: "GDPC1",
    name: "Real GDP",
    description: "Real Gross Domestic Product",
    category: "Output",
    units: "Billions (2017 $)",
    source: "U.S. Bureau of Economic Analysis (BEA)",
    calculation: "GDP adjusted for inflation using 2017 as the base year, chained 2017 dollars",
    updateFrequency: "Quarterly",
    notes: "Inflation-adjusted GDP allows for meaningful comparisons across time periods. More useful than nominal GDP for trend analysis.",
  },
  {
    id: "INDPRO",
    name: "Industrial Production",
    description: "Industrial production index",
    category: "Output",
    units: "Index",
    source: "Federal Reserve Board",
    calculation: "Index measuring real output in manufacturing, mining, and utilities sectors, 2017=100",
    updateFrequency: "Monthly",
    notes: "Leading indicator for GDP. Covers about 15% of the economy but is highly cyclical and reported monthly.",
  },

  // Interest Rates
  {
    id: "FEDFUNDS",
    name: "Federal Funds Rate",
    description: "Effective federal funds rate",
    category: "Interest Rates",
    units: "%",
    source: "Federal Reserve Board",
    calculation: "Volume-weighted median rate on overnight federal funds transactions",
    updateFrequency: "Daily",
    notes: "The Fed's primary monetary policy tool. Influences all other interest rates in the economy. Target rate set by FOMC.",
  },
  {
    id: "DGS2",
    name: "2-Year Treasury",
    description: "Market yield on U.S. Treasury securities at 2-year constant maturity",
    category: "Interest Rates",
    units: "%",
    source: "U.S. Department of Treasury",
    calculation: "Market yield interpolated from the daily yield curve for 2-year constant maturity",
    updateFrequency: "Daily",
    notes: "Reflects market expectations for Fed policy over next 2 years. Highly sensitive to Fed rate change expectations.",
  },
  {
    id: "DGS10",
    name: "10-Year Treasury",
    description: "Market yield on U.S. Treasury securities at 10-year constant maturity",
    category: "Interest Rates",
    units: "%",
    source: "U.S. Department of Treasury",
    calculation: "Market yield interpolated from the daily yield curve for 10-year constant maturity",
    updateFrequency: "Daily",
    notes: "Benchmark for mortgage rates and long-term borrowing costs. Most watched Treasury yield globally.",
  },
  {
    id: "DGS30",
    name: "30-Year Treasury",
    description: "Market yield on U.S. Treasury securities at 30-year constant maturity",
    category: "Interest Rates",
    units: "%",
    source: "U.S. Department of Treasury",
    calculation: "Market yield interpolated from the daily yield curve for 30-year constant maturity",
    updateFrequency: "Daily",
    notes: "Long-term inflation and growth expectations. Used to price long-duration bonds and some mortgage products.",
  },
  {
    id: "T10Y2Y",
    name: "10Y-2Y Treasury Spread",
    description: "10-Year Treasury minus 2-Year Treasury (yield curve)",
    category: "Interest Rates",
    units: "%",
    source: "Federal Reserve Board (calculated)",
    calculation: "10-Year Treasury yield minus 2-Year Treasury yield",
    updateFrequency: "Daily",
    notes: "Yield curve indicator. Negative values (inversion) have preceded every U.S. recession since 1955.",
  },

  // Money & Credit
  {
    id: "M2SL",
    name: "M2 Money Supply",
    description: "M2 money stock",
    category: "Money Supply",
    units: "Billions",
    source: "Federal Reserve Board",
    calculation: "M1 (currency + checking deposits) plus savings deposits, money market funds, and small time deposits",
    updateFrequency: "Weekly, published Tuesdays",
    notes: "Broad measure of money supply. Rapid growth can signal inflation risk. QE dramatically increased M2 in 2020-2021.",
  },
  {
    id: "TOTRESNS",
    name: "Total Reserves",
    description: "Total reserves of depository institutions",
    category: "Money Supply",
    units: "Millions",
    source: "Federal Reserve Board",
    calculation: "Sum of vault cash and deposits held at Federal Reserve Banks by depository institutions",
    updateFrequency: "Weekly",
    notes: "Exploded during QE when Fed bought bonds. High reserves indicate easy monetary conditions.",
  },

  // Consumer & Business
  {
    id: "RSXFS",
    name: "Retail Sales",
    description: "Advance retail sales: retail trade and food services",
    category: "Consumer",
    units: "Millions",
    source: "U.S. Census Bureau",
    calculation: "Total sales at retail and food service stores, seasonally adjusted",
    updateFrequency: "Monthly",
    notes: "Consumer spending is 70% of U.S. GDP. Strong retail sales indicate healthy consumer demand and economic growth.",
  },
  {
    id: "UMCSENT",
    name: "Consumer Sentiment",
    description: "University of Michigan consumer sentiment",
    category: "Consumer",
    units: "Index",
    source: "University of Michigan",
    calculation: "Survey-based index measuring consumer confidence about current and future economic conditions, 1966 Q1=100",
    updateFrequency: "Monthly (preliminary mid-month, final end-month)",
    notes: "Leading indicator for consumer spending. Values above 90 signal optimism, below 70 indicates pessimism.",
  },
  {
    id: "HOUST",
    name: "Housing Starts",
    description: "Housing starts: total new privately owned",
    category: "Housing",
    units: "Thousands",
    source: "U.S. Census Bureau",
    calculation: "Number of new residential construction projects started, seasonally adjusted annual rate",
    updateFrequency: "Monthly",
    notes: "Leading economic indicator. Housing starts create jobs and reflect builder confidence. Normal level is 1.4-1.6M annually.",
  },
  {
    id: "HSN1F",
    name: "New Home Sales",
    description: "New one family houses sold",
    category: "Housing",
    units: "Thousands",
    source: "U.S. Census Bureau",
    calculation: "Number of new single-family houses sold, seasonally adjusted annual rate",
    updateFrequency: "Monthly",
    notes: "Forward-looking indicator (counted at contract signing). More volatile than existing home sales but signals future construction.",
  },
  {
    id: "CSUSHPISA",
    name: "Case-Shiller Home Price",
    description: "S&P/Case-Shiller U.S. National Home Price Index",
    category: "Housing",
    units: "Index",
    source: "S&P Dow Jones Indices",
    calculation: "Repeat-sales index tracking price changes of single-family homes, January 2000=100",
    updateFrequency: "Monthly (with 2-month lag)",
    notes: "Most widely followed home price index. Uses repeat sales methodology to track same-home price changes over time.",
  },

  // Financial Markets
  {
    id: "SP500",
    name: "S&P 500",
    description: "S&P 500 stock market index",
    category: "Markets",
    units: "Index",
    source: "S&P Dow Jones Indices",
    calculation: "Market-capitalization-weighted index of 500 leading U.S. publicly traded companies",
    updateFrequency: "Daily (trading days)",
    notes: "Represents ~80% of U.S. stock market capitalization. Most widely followed equity index for U.S. market performance.",
  },
  {
    id: "VIXCLS",
    name: "VIX",
    description: "CBOE Volatility Index (VIX)",
    category: "Markets",
    units: "Index",
    source: "Chicago Board Options Exchange (CBOE)",
    calculation: "Implied volatility derived from S&P 500 index options, annualized 30-day expected volatility",
    updateFrequency: "Daily (trading days)",
    notes: "Known as the 'fear gauge'. VIX > 30 signals high volatility/fear. VIX < 15 indicates complacency. Spikes during market crashes.",
  },
  {
    id: "DCOILWTICO",
    name: "Crude Oil Prices",
    description: "Crude oil prices: West Texas Intermediate",
    category: "Commodities",
    units: "$ per Barrel",
    source: "U.S. Energy Information Administration",
    calculation: "Spot price for West Texas Intermediate (WTI) crude oil at Cushing, Oklahoma",
    updateFrequency: "Daily (trading days)",
    notes: "U.S. oil benchmark. Closely watched inflation indicator. Prices above $80/barrel can pressure consumers and slow growth.",
  },
  {
    id: "GOLDAMGBD228NLBM",
    name: "Gold Price",
    description: "Gold fixing price 3:00 P.M. (London time)",
    category: "Commodities",
    units: "$ per Oz",
    source: "ICE Benchmark Administration (London Bullion Market)",
    calculation: "Gold price fixed twice daily via auction in London, 3:00 PM fix",
    updateFrequency: "Daily (trading days)",
    notes: "Safe-haven asset. Rises during uncertainty, inflation, and currency devaluation. Inverse relationship with real interest rates.",
  },

  // Trade & International
  {
    id: "BOPGSTB",
    name: "Trade Balance",
    description: "Balance on goods and services",
    category: "Trade",
    units: "Millions",
    source: "U.S. Bureau of Economic Analysis (BEA)",
    calculation: "Exports of goods and services minus imports of goods and services, seasonally adjusted",
    updateFrequency: "Monthly",
    notes: "U.S. typically runs trade deficits (imports > exports). Large deficits can weaken dollar. Surplus is rare for U.S.",
  },
  {
    id: "DEXUSEU",
    name: "USD/EUR Exchange Rate",
    description: "U.S. dollars to euro spot exchange rate",
    category: "Exchange Rates",
    units: "USD per EUR",
    source: "Federal Reserve Board (H.10 release)",
    calculation: "Noon buying rate in New York for cable transfers, U.S. dollars per euro",
    updateFrequency: "Daily (business days)",
    notes: "Most traded currency pair globally. Higher values = stronger euro / weaker dollar. Affects U.S. export competitiveness.",
  },
];

export function getSeriesByCategory(category: string): SeriesInfo[] {
  return SERIES_CATALOG.filter((s) => s.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(SERIES_CATALOG.map((s) => s.category));
  return Array.from(categories).sort();
}

export function searchSeries(query: string): SeriesInfo[] {
  const lowerQuery = query.toLowerCase();
  return SERIES_CATALOG.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.id.toLowerCase().includes(lowerQuery)
  );
}

export function getSeriesById(id: string): SeriesInfo | undefined {
  return SERIES_CATALOG.find((s) => s.id === id);
}
