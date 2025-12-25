# HIMANIA Financial Dashboard

An open, transparent, and real-time financial dashboard for HIMANIA student organization.

**🚀 PROTOTYPE MODE**: This version reads data from CSV files (no Google Sheets API required!)

## Features

- 📊 Financial data from CSV files (prototype mode)
- 💰 Income and expense tracking
- 📈 Budget realization per program/division
- 📉 Cash flow trends visualization
- 🎯 KPI cards for key metrics
- 🌐 Accessible to all board members (read-only)

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Source**: CSV files in `dummy-data/` folder (prototype mode)

## Setup Instructions (Prototype Mode)

### 1. Prerequisites

- Node.js 18+ installed

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

That's it! 🎉 The dashboard will automatically read data from CSV files in the `dummy-data/` folder.

**No API keys or Google Sheets setup needed for prototype mode!**

## Data Structure

See `DUMMY_DATA_STRUCTURE.md` for detailed information about the Google Sheets structure.

## How It Works (Prototype Mode)

1. **Data Source**: CSV files in `dummy-data/` folder serve as the data source
2. **CSV Reader**: Dashboard reads and parses CSV files server-side
3. **Auto Refresh**: Data refreshes automatically (every 30 seconds by default)
4. **Visualization**: Data is transformed and displayed in charts, KPIs, and tables

**To use Google Sheets in production**: See `SETUP_GUIDE.md` for instructions on switching to Google Sheets API.

## Project Structure

```
├── app/
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── KPICard.tsx        # KPI metric cards
│   ├── IncomeChart.tsx    # Income visualization
│   ├── ExpenseChart.tsx   # Expense visualization
│   ├── BudgetChart.tsx    # Budget realization chart
│   ├── CashFlowChart.tsx  # Cash flow trend chart
│   └── DataTable.tsx      # Detailed data tables
├── lib/
│   ├── sheets.ts          # Google Sheets API integration
│   └── types.ts           # TypeScript type definitions
├── public/                # Static assets
└── DUMMY_DATA_STRUCTURE.md # Data structure documentation
```

## Notes

- The dashboard is **read-only** - all edits must be made in Google Sheets
- Data synchronization happens automatically (no manual refresh needed)
- All amounts are in IDR (Indonesian Rupiah)
