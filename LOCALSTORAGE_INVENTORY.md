# localStorage Inventory

## Overview
This document tracks all data currently stored in browser localStorage that will need to be migrated to a database when implementing backend persistence.

**Migration Priority**: When implementing user accounts and a database, these localStorage keys should be converted to database tables with proper user associations.

---

## 1. Portfolio Data (`portfolio_v1`)

**File**: `src/lib/portfolio/store.ts`
**Key**: `"portfolio_v1"`
**Type**: JSON

### Structure:
```typescript
{
  version: number;              // Schema version (currently 1)
  holdings: Holding[];          // Array of portfolio holdings
  targets: EngineTargets;       // Custom engine allocation targets
  useDemoHoldings: boolean;     // Whether using demo or real holdings
  updatedAt: string;            // ISO timestamp of last update
}
```

### Holding Structure:
```typescript
{
  id: string;                  // UUID
  ticker: string;              // Stock/ETF ticker symbol
  name?: string;               // Optional display name
  account: AccountType;        // "401K" | "ROTH" | "TAXABLE" | "HSA" | "529"
  weightPct: number;           // Portfolio weight percentage
  assetType?: AssetType;       // "EQUITY" | "ETF" | "BOND" | "CASH" | "CRYPTO" | "REIT" | "COMMODITY"
  engineOverride?: EngineId;   // Manual classification override
}
```

### EngineTargets Structure:
```typescript
{
  [engineId: string]: number;  // Target percentage for each engine
}
```

### Database Migration Plan:
- **Table**: `portfolios`
  - `user_id` (foreign key)
  - `version` (int)
  - `use_demo_holdings` (boolean)
  - `updated_at` (timestamp)
  - `created_at` (timestamp)

- **Table**: `holdings`
  - `id` (UUID primary key)
  - `portfolio_id` (foreign key)
  - `ticker` (string)
  - `name` (string, nullable)
  - `account` (enum)
  - `weight_pct` (decimal)
  - `asset_type` (enum, nullable)
  - `engine_override` (string, nullable)

- **Table**: `engine_targets`
  - `portfolio_id` (foreign key)
  - `engine_id` (string)
  - `target_pct` (decimal)

---

## 2. Macro Regime History (`regime_history_v1`)

**File**: `src/lib/macro/regimeHistory.ts`
**Key**: `"regime_history_v1"`
**Type**: JSON Array

### Structure:
```typescript
RegimeSnapshot[] = [{
  timestamp: string;           // ISO timestamp when regime was recorded
  regime: RegimeType;          // "Risk-On" | "Risk-Off" | "Inflationary" | "Deflationary" | "Mixed"
  alertLevel: AlertLevel;      // "GREEN" | "YELLOW" | "RED"
  confidence: number;          // 0-100
  composites: {
    growth: number;
    inflation: number;
    creditStress: number;
    liquidityImpulse: number;
  };
}]
```

### Database Migration Plan:
- **Table**: `regime_snapshots`
  - `id` (auto-increment)
  - `user_id` (foreign key, nullable for global)
  - `timestamp` (timestamp)
  - `regime` (enum)
  - `alert_level` (enum)
  - `confidence` (decimal)
  - `growth_composite` (decimal)
  - `inflation_composite` (decimal)
  - `credit_stress_composite` (decimal)
  - `liquidity_impulse_composite` (decimal)

**Note**: Could be user-specific OR global system-wide data. Decide based on whether regime tracking should be shared across all users or personalized.

---

## 3. Potential Future localStorage Keys

### Engine Scoring Cache (Not Yet Implemented)
If client-side caching of engine scores is added:
```typescript
{
  "engine_scores_cache": {
    timestamp: string;
    scores: Map<EngineId, EngineScore>;
    expiresAt: string;
  }
}
```

### User Preferences (Not Yet Implemented)
```typescript
{
  "user_preferences": {
    theme: "light" | "dark";
    defaultView: "beginner" | "expert";
    autoRefreshInterval: number;
    defaultAccount: AccountType;
  }
}
```

### Watchlist (Not Yet Implemented)
```typescript
{
  "watchlist": string[];  // Array of ticker symbols
}
```

---

## Migration Strategy

### Phase 1: Authentication & User Model
1. Implement user authentication (NextAuth.js or similar)
2. Create `users` table
3. Design database schema for all localStorage data

### Phase 2: Portfolio Migration
1. Create portfolio/holdings/targets tables
2. Add API endpoints for CRUD operations
3. Implement migration script to move localStorage → DB
4. Update store.ts to use API instead of localStorage
5. Keep localStorage as fallback for unauthenticated users

### Phase 3: Regime History Migration
1. Decide: user-specific vs. global regime tracking
2. Create regime_snapshots table
3. Add API endpoints
4. Implement server-side snapshot recording
5. Display historical trends from DB

### Phase 4: Cleanup
1. Version localStorage keys (v2, v3) for backwards compatibility
2. Add migration notices in UI
3. Deprecate old localStorage after grace period

---

## Data Synchronization Considerations

### localStorage → Database (One-time migration)
- Detect existing localStorage on first login
- Prompt user: "Import existing portfolio?"
- Migrate data via API call
- Mark localStorage as "migrated" to prevent duplicates

### Database → localStorage (Offline support)
- Cache portfolio data in localStorage for offline viewing
- Mark as read-only cache
- Sync on reconnect

### Conflict Resolution
- Server data always wins
- Last-write-wins timestamp comparison
- Option to manually merge conflicts in UI

---

## Storage Limits

### Current localStorage Limits
- **Browser Limit**: ~5-10 MB depending on browser
- **Current Usage**:
  - Portfolio: ~1-5 KB (depends on # of holdings)
  - Regime History: ~10-50 KB (depends on tracking duration)
  - **Total**: Well under limits

### Database Benefits
- No storage limits
- Multi-device sync
- Backup & recovery
- Historical queries
- Sharing portfolios
- Collaboration features

---

## Security Considerations

### Current localStorage Security
- ⚠️ Accessible by any script on the domain
- ⚠️ Not encrypted
- ⚠️ Vulnerable to XSS attacks
- ✅ Not sent over network (privacy benefit)
- ✅ Persists across sessions

### Database Security (When Implemented)
- ✅ Server-side validation
- ✅ User authentication & authorization
- ✅ Encrypted at rest
- ✅ HTTPS for data in transit
- ✅ SQL injection protection (Prisma)
- ✅ RBAC for access control

---

## Testing Checklist (Pre-Migration)

- [ ] Export all portfolio data
- [ ] Export regime history
- [ ] Test localStorage clear/reset
- [ ] Test data normalization
- [ ] Test weight validation
- [ ] Test ticker deduplication
- [ ] Verify UUID generation
- [ ] Check JSON serialization

---

## Notes

- All localStorage access is currently synchronous (no async needed)
- Portfolio store includes weight normalization utility
- Demo holdings are hardcoded in store.ts (not in localStorage)
- Default engine targets come from engineConfig.ts (not localStorage)
- localStorage is only used for user-customized data

**Last Updated**: 2026-01-14
