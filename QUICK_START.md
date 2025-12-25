# Quick Start Guide

Get the HIMANIA Financial Dashboard running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Google account

## Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets

**Option A: Use the provided dummy data**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Create 4 sheets (tabs): `Income`, `Expenses`, `Budget Allocation`, `Cash Flow Summary`
4. Copy the CSV data from `dummy-data/` folder into each corresponding sheet
5. Make sure row 1 has headers (they should already be there if you copy correctly)

**Option B: Start fresh**

1. Create a new Google Sheet
2. Follow the structure in `DUMMY_DATA_STRUCTURE.md`

### 3. Publish Your Sheet

1. In Google Sheets: **File** > **Share** > **Publish to web**
2. Click **Publish**
3. Copy the Sheet ID from the URL (the string between `/d/` and `/edit`)

### 4. Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or use existing)
3. Enable **Google Sheets API** (APIs & Services > Library > Search "Google Sheets API" > Enable)
4. Create API Key (APIs & Services > Credentials > Create Credentials > API Key)
5. Copy the API key

### 5. Configure Environment

Create `.env.local` in the project root:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_ID=your_sheet_id_here
```

### 6. Run the Dashboard

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

**"Failed to fetch financial data"**
- Check that your Sheet ID is correct
- Verify API key is valid
- Make sure sheets are named exactly: `Income`, `Expenses`, `Budget Allocation`
- Ensure sheet is published (File > Share > Publish to web)

**No data showing**
- Check that row 1 has headers (not data)
- Verify column names match exactly (see `DATA_STRUCTURE_QUICK_REFERENCE.md`)
- Check browser console for errors

For more detailed help, see `SETUP_GUIDE.md`.
