/**
 * Explanation Helpers - Human-readable explanations for macro signals
 *
 * These functions translate technical signals into beginner-friendly language
 */

export function explainRegime(regime: string): string {
  const explanations: Record<string, string> = {
    "Risk-On": "Markets and the economy are currently supportive of owning stocks and taking moderate risk. This is a good environment for growth assets.",
    "Risk-Off": "Markets show signs of stress. This environment typically favors safer assets like bonds, cash, and defensive stocks over aggressive growth plays.",
    "Inflationary": "Inflation is rising faster than expected. This typically favors hard assets (commodities, real estate) and inflation-protected securities over nominal bonds.",
    "Deflationary": "Economic growth is slowing and inflation is falling. This environment can be good for high-quality bonds and defensive stocks, but challenging for commodities and cyclical companies.",
    "Mixed": "Market signals are contradictory or neutral. No clear directional trend. This suggests caution and balanced positioning until a clearer picture emerges.",
  };

  return explanations[regime] || "The macro environment is showing mixed signals. Stay balanced until clarity emerges.";
}

export function explainAlertLevel(level: string): string {
  const explanations: Record<string, string> = {
    "GREEN": "Market conditions look healthy with no major warning signs. This is a supportive environment for taking reasonable risk with your portfolio.",
    "YELLOW": "Some caution signals are appearing. Not a crisis, but time to be more selective and avoid overconcentration in high-risk assets. Stay diversified.",
    "RED": "Multiple warning signs detected. This environment historically precedes market volatility or drawdowns. Prioritize capital preservation and reduce exposure to speculative positions.",
  };

  return explanations[level] || "Market conditions require attention and careful positioning.";
}

export function explainBTCTrend(trendLevel: string, distanceFrom200D: number | null): string {
  if (trendLevel === "GREEN") {
    return "Bitcoin is in an uptrend and above key moving averages. Historically, this environment has been supportive for adding to crypto and MSTR positions. Still maintain proper position sizing.";
  }

  if (trendLevel === "RED") {
    const distanceText = distanceFrom200D !== null && distanceFrom200D < -20
      ? " Bitcoin is significantly below its 200-day average, suggesting a strong downtrend."
      : "";
    return `Bitcoin is in a downtrend.${distanceText} Historically, this means crypto and MSTR are more volatile and risky to add. Wait for trend improvement before adding aggressively.`;
  }

  return "Bitcoin is in a neutral or transitional phase. Neither a strong buy nor avoid signal. If you own it, hold. If you don't, wait for clearer signals.";
}

export function explainMicrostress(level: string): string {
  const explanations: Record<string, string> = {
    "GREEN": "Banks and credit markets are healthy with no signs of financial stress. Short-term funding markets are functioning normally. This is supportive for risk assets.",
    "YELLOW": "Some minor stress appearing in credit or funding markets. Not a crisis, but worth monitoring. Consider maintaining higher cash buffers and avoiding excessive leverage.",
    "RED": "Credit markets are showing significant stress. This often precedes broader market dislocations. Reduce risk, raise cash, and avoid adding to volatile positions until stress subsides.",
  };

  return explanations[level] || "Credit market conditions require monitoring.";
}

export function explainBreadth(signal: string, level: string): string {
  if (signal === "CONFIRMS") {
    return "Market breadth is strong - most stocks are participating in the move higher. This confirms the rally is healthy and broad-based, not just a few large stocks carrying the market.";
  }

  if (signal === "DIVERGES") {
    return `Market breadth is weak (${level} level). The major indexes might be up, but most stocks are struggling. This divergence often precedes corrections. Be cautious about adding risk until breadth improves.`;
  }

  return "Market breadth is neutral. Neither strongly confirming nor diverging from price action. Monitor for changes.";
}

export function explainLiquidity(composite: number): string {
  if (composite > 0.5) {
    return "Liquidity conditions are strong. The Fed and global central banks are adding liquidity to the system, which historically supports asset prices.";
  }

  if (composite < -0.75) {
    return "Liquidity is being drained from the system. This creates headwinds for risk assets. Focus on quality and avoid chasing speculative positions.";
  }

  return "Liquidity conditions are neutral. Neither a strong tailwind nor headwind for markets.";
}

/**
 * Generate "What Could Go Wrong?" scenarios based on current signals
 */
export function generateRiskScenarios(
  alertLevel: string,
  btcTrend: string,
  microstress: string,
  liquidityComposite: number
): string[] {
  const scenarios: string[] = [];

  // Alert-based scenarios
  if (alertLevel === "GREEN") {
    scenarios.push("If credit spreads spike above 6.5% → shift toward safety and reduce exposure");
    scenarios.push("If the yield curve inverts further → prepare for potential recession");
  } else if (alertLevel === "RED") {
    scenarios.push("Current RED alert could worsen → maintain high cash reserves (15%+)");
    scenarios.push("If microstress turns RED → exit speculative positions entirely");
  }

  // BTC-specific scenarios
  if (btcTrend === "RED") {
    scenarios.push("Bitcoin could fall further → avoid adding to MSTR or crypto until trend turns GREEN");
  } else if (btcTrend === "GREEN") {
    scenarios.push("If Bitcoin trend reverses to RED → trim MSTR/crypto exposure back to target range");
  }

  // Liquidity scenarios
  if (liquidityComposite < -0.75) {
    scenarios.push("If liquidity drops below -1.5 → reduce overall equity exposure by 10-20%");
  } else {
    scenarios.push("If liquidity turns negative → reassess growth equity positions");
  }

  // Microstress scenarios
  if (microstress !== "RED") {
    scenarios.push("If credit microstress spikes to RED → exit high-beta and move to cash/stability");
  }

  return scenarios;
}

/**
 * Generate time horizon implications based on current regime and signals
 */
export function generateTimeHorizonView(
  regime: string,
  alertLevel: string,
  btcTrend: string,
  liquidityComposite: number
): {
  sixMonth: string;
  twelveMonth: string;
  twoToThreeYear: string;
} {
  // 6-month view (tactical)
  let sixMonth = "";
  if (alertLevel === "RED") {
    sixMonth = "Defensive positioning advised. Focus on quality, cash, and stability. Avoid aggressive adds until conditions improve.";
  } else if (alertLevel === "YELLOW") {
    sixMonth = "Balanced approach with caution. Safe to own stocks, but be selective. Avoid overconcentration in high-beta or crypto.";
  } else {
    sixMonth = "Constructive environment for taking reasonable risk. Diversified equity exposure is appropriate.";
  }

  // 12-month view (strategic)
  let twelveMonth = "";
  if (regime === "Risk-Off" || alertLevel === "RED") {
    twelveMonth = "Near-term caution, but likely setup for better entry points. If rate cuts arrive, growth and tech become attractive again.";
  } else {
    twelveMonth = "If current conditions hold, equity markets should remain supportive. Potential for rate cuts to boost growth assets and Bitcoin.";
  }

  // 2-3 year view (long-term)
  let twoToThreeYear = "";
  if (btcTrend === "RED" && liquidityComposite < 0) {
    twoToThreeYear = "Long-term liquidity cycles and adoption trends favor tech and digital assets. Current weakness may be a setup for future opportunities.";
  } else {
    twoToThreeYear = "Secular trends in technology, digitalization, and global liquidity support growth equity and alternative assets. Stay diversified but growth-oriented.";
  }

  return { sixMonth, twelveMonth, twoToThreeYear };
}
