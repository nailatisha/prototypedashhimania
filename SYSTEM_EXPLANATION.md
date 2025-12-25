# HIMANIA Financial Dashboard - System Explanation

This document explains how the financial dashboard system works, from data flow to visualization.

## Architecture Overview

The HIMANIA Financial Dashboard follows a client-server architecture with Google Sheets as the single source of truth:

```
Google Sheets (Data Source)
    ↓
Next.js API Route (Server-Side)
    ↓
React Components (Client-Side)
    ↓
Dashboard UI (Visualization)
```

## Data Flow

### 1. Data Source: Google Sheets

**Location**: Google Sheets (cloud-based spreadsheet)

**Structure**: Four separate sheets:
- **Income**: All income transactions
- **Expenses**: All expense transactions
- **Budget Allocation**: Budget information per program/division
- **Cash Flow Summary**: Monthly aggregated data (optional)

**Access**: Sheets are accessed via Google Sheets API v4 using a public API key (read-only)

### 2. Data Fetching: API Route

**File**: `app/api/financial-data/route.ts`

**Process**:
1. Receives GET request from client
2. Calls `lib/sheets.ts` functions to fetch data from Google Sheets
3. Aggregates data (calculates totals, summaries)
4. Returns JSON response with all financial data

**Caching**: 
- Uses Next.js `revalidate` option (30 seconds)
- Data is cached server-side for 30 seconds to reduce API calls
- After 30 seconds, fresh data is fetched on the next request

**Error Handling**: Returns appropriate error messages if Google Sheets API fails

### 3. Client-Side Data Fetching

**File**: `app/page.tsx`

**Process**:
1. On component mount, fetches data from `/api/financial-data`
2. Sets up automatic refresh every 30 seconds
3. Updates UI with new data
4. Handles loading and error states

**State Management**: Uses React hooks (`useState`, `useEffect`)

### 4. Data Transformation

**Files**: `components/*Chart.tsx`

**Process**:
- Raw data from API is transformed for visualization
- Income/Expense data is grouped by category
- Budget data is formatted for comparison charts
- Cash flow data is prepared for time-series visualization

## Component Structure

### KPI Cards (`components/KPICard.tsx`)
- Displays key metrics: Total Income, Total Expenses, Current Balance
- Color-coded (green for income, red for expenses, indigo for balance)
- Shows formatted currency values

### Charts

**Income Chart** (`components/IncomeChart.tsx`):
- Bar chart showing income by source
- Groups income entries by "Source of Income"
- Uses Recharts library

**Expense Chart** (`components/ExpenseChart.tsx`):
- Pie chart showing expense distribution by category
- Groups expenses by "Expense Category"
- Shows top 10 categories

**Budget Chart** (`components/BudgetChart.tsx`):
- Horizontal bar chart comparing approved vs used vs remaining budget
- Shows percentage used per program/division
- Color-coded bars for different metrics

**Cash Flow Chart** (`components/CashFlowChart.tsx`):
- Line chart showing trends over time
- Multiple lines for income, expenses, and balance
- Time-series visualization

### Data Tables (`components/DataTable.tsx`)
- Displays detailed transaction data
- Shows recent income and expenses
- Sortable and formatted tables

## Real-Time Synchronization

### How It Works

1. **Automatic Refresh**: 
   - Dashboard polls `/api/financial-data` every 30 seconds
   - No manual refresh needed

2. **Server-Side Caching**:
   - API route caches responses for 30 seconds
   - Reduces unnecessary API calls to Google Sheets
   - Balances real-time updates with API quota limits

3. **Manual Refresh**:
   - Users can click "Refresh Data" button
   - Immediately fetches fresh data (bypasses cache)

### Timing Considerations

- **Google Sheets Update**: When data is edited in Google Sheets, it's immediately saved
- **API Cache**: Next.js caches API responses for 30 seconds
- **Client Polling**: Client refreshes every 30 seconds
- **Maximum Delay**: Up to 60 seconds from Google Sheets edit to dashboard display

For faster updates, users can click the "Refresh Data" button.

## Sheet Structure Details

### Column Mapping

The system uses exact column names to parse data. Headers must match exactly:

**Income Sheet**:
- `Date`
- `Source of Income`
- `Description`
- `Amount (IDR)`
- `Program / Division`

**Expenses Sheet**:
- `Date`
- `Expense Category`
- `Description`
- `Amount (IDR)`
- `Program / Division`

**Budget Allocation Sheet**:
- `Program / Division`
- `Approved Budget (IDR)`
- `Used Budget (IDR)`
- `Remaining Budget (IDR)`

**Cash Flow Summary Sheet**:
- `Month`
- `Total Income`
- `Total Expense`
- `Ending Balance`

### Data Parsing

**File**: `lib/sheets.ts`

**Process**:
1. Fetches raw data from Google Sheets API (array of arrays)
2. First row treated as headers
3. Subsequent rows parsed using header names
4. Amount fields parsed (removes currency symbols, commas)
5. Invalid rows filtered out (missing date or amount)

## Security & Privacy

### Current Implementation

- **Read-Only Access**: Dashboard can only read data, never modify
- **API Key**: Stored server-side only (not exposed to client)
- **Public Sheets**: Requires sheets to be published to web (public read access)

### Limitations

- API key is public (anyone with it can read your sheet if they know the Sheet ID)
- Suitable for organizational transparency where data is meant to be shared
- Not suitable for sensitive/private financial data

### Production Recommendations

For sensitive data:
1. Use Google OAuth for authenticated access
2. Implement user authentication on the dashboard
3. Use private sheets with service account authentication
4. Add rate limiting and IP restrictions

## Extending the System

### Adding New Metrics

1. Add data to Google Sheets
2. Update TypeScript types in `lib/types.ts`
3. Add parsing function in `lib/sheets.ts`
4. Create visualization component
5. Add to dashboard page

### Customizing Visualizations

- Charts use Recharts library (React charting library)
- Modify chart components in `components/` directory
- Styling uses Tailwind CSS
- Color scheme defined in `tailwind.config.js`

### Adding Calculations

Complex calculations can be added:
- In API route (`app/api/financial-data/route.ts`) for server-side calculations
- In components for client-side calculations
- In Google Sheets using formulas (recommended for transparency)

## Error Handling

### API Errors

- Network failures: Displayed in UI with retry option
- Invalid data: Rows are filtered out, logged to console
- Missing sheets: Optional sheets (Cash Flow Summary) return empty arrays
- API quota exceeded: Error message displayed, user can retry

### Data Validation

- Date formats: Expected YYYY-MM-DD, but flexible parsing
- Amount values: Strips non-numeric characters, handles decimals
- Missing fields: Null/empty values handled gracefully

## Performance Considerations

1. **API Calls**: Minimized through server-side caching (30s)
2. **Data Size**: Efficient for hundreds of transactions
3. **Rendering**: React handles efficient re-renders
4. **Charts**: Recharts is optimized for medium-sized datasets

For large datasets (thousands of rows), consider:
- Implementing pagination
- Adding data aggregation in Google Sheets
- Using data virtualization for tables

## Maintenance

### Regular Tasks

1. **Update Dummy Data**: Edit CSV files in `dummy-data/` folder
2. **Monitor API Quota**: Check Google Cloud Console
3. **Update Dependencies**: Run `npm update` periodically
4. **Backup Google Sheets**: Use Google Sheets version history

### Troubleshooting

See `SETUP_GUIDE.md` for common issues and solutions.

## Future Enhancements

Potential improvements:
1. Export to PDF/Excel
2. Email notifications for budget thresholds
3. Multi-year comparisons
4. Advanced filtering and search
5. User authentication and access control
6. Mobile app version
7. Real-time updates using WebSockets or Server-Sent Events
