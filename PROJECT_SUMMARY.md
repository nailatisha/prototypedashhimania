# HIMANIA Financial Dashboard - Project Summary

## Overview

A comprehensive, real-time financial dashboard system for HIMANIA student organization that provides transparent financial visibility to all board members. The system uses Google Sheets as the single source of truth and automatically synchronizes data to a modern web dashboard.

## Key Features

✅ **Open & Accessible**: Read-only dashboard accessible to all board members
✅ **Google Sheets Integration**: Google Sheets as primary data source
✅ **Real-Time Sync**: Automatic data refresh every 30 seconds
✅ **Comprehensive Visualizations**: KPI cards, bar charts, pie charts, line graphs
✅ **Budget Tracking**: Budget realization per program/division
✅ **Cash Flow Analysis**: Trend analysis over time
✅ **Clean UI**: Professional, minimal design with color-coded metrics

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Source**: Google Sheets API v4
- **Deployment Ready**: Vercel/Netlify compatible

## Project Structure

```
prototypedashboard/
├── app/
│   ├── api/
│   │   └── financial-data/
│   │       └── route.ts          # API endpoint for fetching data
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── KPICard.tsx               # KPI metric cards
│   ├── IncomeChart.tsx           # Income bar chart
│   ├── ExpenseChart.tsx          # Expense pie chart
│   ├── BudgetChart.tsx           # Budget realization chart
│   ├── CashFlowChart.tsx         # Cash flow line chart
│   └── DataTable.tsx             # Transaction tables
├── lib/
│   ├── sheets.ts                 # Google Sheets API integration
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions (formatIDR)
├── dummy-data/
│   ├── income.csv                # Sample income data
│   ├── expenses.csv              # Sample expense data
│   ├── budget-allocation.csv     # Sample budget data
│   └── cash-flow-summary.csv     # Sample cash flow data
├── Documentation/
│   ├── README.md                 # Main documentation
│   ├── SETUP_GUIDE.md            # Step-by-step setup instructions
│   ├── DUMMY_DATA_STRUCTURE.md   # Detailed data structure
│   ├── DATA_STRUCTURE_QUICK_REFERENCE.md  # Quick reference
│   ├── SYSTEM_EXPLANATION.md     # How the system works
│   └── PROJECT_SUMMARY.md        # This file
└── Configuration Files
    ├── package.json              # Dependencies
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.js        # Tailwind CSS config
    ├── next.config.js            # Next.js config
    └── .env.example              # Environment variables template
```

## Data Flow

```
Google Sheets
    ↓
Google Sheets API v4
    ↓
Next.js API Route (Server-Side)
    ↓ (30-second cache)
React Dashboard (Client-Side)
    ↓
Visual Components (Charts, Tables, KPIs)
```

## Components Breakdown

### 1. Dashboard Page (`app/page.tsx`)
- Main entry point
- Fetches data from API route
- Auto-refreshes every 30 seconds
- Handles loading and error states
- Orchestrates all components

### 2. API Route (`app/api/financial-data/route.ts`)
- Server-side data fetching
- Aggregates data from all sheets
- Calculates summary metrics
- Returns JSON response
- Implements 30-second caching

### 3. Google Sheets Integration (`lib/sheets.ts`)
- Fetches data from Google Sheets API
- Parses CSV-like data structures
- Handles data transformation
- Error handling for missing/invalid data

### 4. Visualization Components

**KPICard**: Displays total income, expenses, and balance
- Color-coded (green/red/indigo)
- Large, readable numbers
- Formatted currency display

**IncomeChart**: Bar chart of income by source
- Groups income entries
- Sorted by amount
- Responsive design

**ExpenseChart**: Pie chart of expenses by category
- Top 10 categories
- Color-coded segments
- Percentage labels

**BudgetChart**: Horizontal bar chart
- Approved vs Used vs Remaining
- Percentage calculations
- Per program/division

**CashFlowChart**: Line chart over time
- Income, expenses, and balance trends
- Monthly aggregation
- Multi-line visualization

**DataTable**: Detailed transaction tables
- Recent income and expenses
- Sortable columns
- Formatted dates and amounts

## Dummy Data

Comprehensive dummy data provided in CSV format:

- **15 Income Entries**: Realistic income sources (sponsorships, membership fees, event tickets)
- **20 Expense Entries**: Various expense categories (venue, logistics, consumption, etc.)
- **7 Budget Allocations**: Different programs/divisions with budget tracking
- **5 Months of Cash Flow**: Monthly aggregated data

All data follows realistic patterns and is internally consistent.

## Real-Time Synchronization

**How it works:**
1. User edits Google Sheets
2. Changes saved immediately
3. Dashboard polls API every 30 seconds
4. API caches responses for 30 seconds
5. Fresh data displayed automatically

**Maximum delay**: ~60 seconds from edit to display
**Manual refresh**: Available via button for instant updates

## Setup Requirements

1. **Node.js 18+** installed
2. **Google Sheets** with proper structure
3. **Google Sheets API Key** from Google Cloud Console
4. **Environment Variables** configured (.env.local)

See `SETUP_GUIDE.md` for detailed instructions.

## Key Design Decisions

### 1. Google Sheets as Single Source of Truth
- **Why**: Easy for non-technical users to maintain
- **Benefit**: No database setup, familiar interface

### 2. Server-Side API Route
- **Why**: Keep API key secure
- **Benefit**: Prevents client-side exposure of credentials

### 3. 30-Second Refresh Rate
- **Why**: Balance between real-time and API quota
- **Benefit**: Near real-time without excessive API calls

### 4. TypeScript Throughout
- **Why**: Type safety and better developer experience
- **Benefit**: Fewer bugs, better IDE support

### 5. Read-Only Dashboard
- **Why**: Transparency focus, prevents accidental edits
- **Benefit**: All edits in one place (Google Sheets)

## Security Considerations

### Current Implementation
- ✅ API key stored server-side only
- ✅ Read-only access (cannot modify sheets)
- ✅ Public sheets required (appropriate for transparency)

### For Sensitive Data
- Consider Google OAuth authentication
- Implement user access control
- Use private sheets with service accounts
- Add rate limiting and IP restrictions

## Performance

- **API Calls**: Minimized via 30-second server-side cache
- **Data Size**: Efficient for hundreds of transactions
- **Rendering**: Optimized React components
- **Charts**: Recharts handles medium datasets well

## Maintenance

### Regular Tasks
- Update dummy data as needed
- Monitor Google Sheets API quota
- Update dependencies periodically
- Backup Google Sheets data

### Troubleshooting
See `SETUP_GUIDE.md` for common issues and solutions.

## Future Enhancements

Potential improvements:
- Export to PDF/Excel
- Email notifications for budget thresholds
- Multi-year comparisons
- Advanced filtering
- User authentication
- Mobile app
- WebSocket for instant updates

## Deliverables Checklist

✅ Financial dashboard UI
✅ Google Sheets dummy data (CSV format)
✅ Data integration logic
✅ Documentation:
  - ✅ Sheet structure explanation
  - ✅ Sync mechanism explanation
  - ✅ Visualization mapping
  - ✅ Setup guide
  - ✅ System architecture

## Getting Started

1. Read `SETUP_GUIDE.md` for step-by-step instructions
2. Set up Google Sheets with dummy data
3. Configure environment variables
4. Install dependencies: `npm install`
5. Run development server: `npm run dev`
6. Open http://localhost:3000

## Support

For issues or questions:
1. Check `SETUP_GUIDE.md` troubleshooting section
2. Review `SYSTEM_EXPLANATION.md` for technical details
3. Verify data structure matches `DATA_STRUCTURE_QUICK_REFERENCE.md`

---

**Built with transparency and organizational innovation in mind.**
