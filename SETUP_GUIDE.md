# HIMANIA Financial Dashboard - Setup Guide

This guide will walk you through setting up the HIMANIA Financial Dashboard with Google Sheets integration.

## Step 1: Create Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename the spreadsheet to "HIMANIA Financial Data" (or any name you prefer)

### Create the Sheets

You need to create 4 separate sheets (tabs) within your spreadsheet:

#### Sheet 1: Income
1. Click the "+" button at the bottom to add a new sheet
2. Rename it to "Income"
3. Add the following headers in row 1:
   - Date
   - Source of Income
   - Description
   - Amount (IDR)
   - Program / Division

#### Sheet 2: Expenses
1. Add another sheet and rename it to "Expenses"
2. Add the following headers in row 1:
   - Date
   - Expense Category
   - Description
   - Amount (IDR)
   - Program / Division

#### Sheet 3: Budget Allocation
1. Add another sheet and rename it to "Budget Allocation"
2. Add the following headers in row 1:
   - Program / Division
   - Approved Budget (IDR)
   - Used Budget (IDR)
   - Remaining Budget (IDR)

#### Sheet 4: Cash Flow Summary (Optional)
1. Add another sheet and rename it to "Cash Flow Summary"
2. Add the following headers in row 1:
   - Month
   - Total Income
   - Total Expense
   - Ending Balance

### Import Dummy Data (Optional)

You can use the CSV files in the `dummy-data/` folder to populate your sheets:

1. Open each CSV file (income.csv, expenses.csv, budget-allocation.csv, cash-flow-summary.csv)
2. Copy the data
3. Paste it into the corresponding sheet in Google Sheets (starting from row 2, keeping row 1 as headers)

**OR** manually type in the data from `DUMMY_DATA_STRUCTURE.md`

## Step 2: Publish Google Sheet

1. In your Google Sheet, click **File** > **Share** > **Publish to web**
2. Select "Entire document" or select all sheets
3. Choose "Web page" as the format
4. Click **Publish**
5. Copy the link (you'll use the Sheet ID from this URL)

The URL will look like:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit#gid=0
```

Extract the `YOUR_SHEET_ID_HERE` part - this is your Sheet ID.

## Step 3: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
   - (Optional but recommended) Restrict the API key to only Google Sheets API

## Step 4: Configure Environment Variables

1. In the project root, create a file named `.env.local`
2. Add the following content:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_ID=your_sheet_id_here
```

Replace:
- `your_api_key_here` with the API key from Step 3
- `your_sheet_id_here` with the Sheet ID from Step 2

**Important**: Never commit `.env.local` to version control (it's already in `.gitignore`)

## Step 5: Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the dashboard loading your financial data from Google Sheets!

## Troubleshooting

### "Failed to fetch financial data" Error

1. **Check API Key**: Make sure your Google Sheets API key is correct and has the Sheets API enabled
2. **Check Sheet ID**: Verify the Sheet ID matches your spreadsheet URL
3. **Check Sheet Names**: Ensure your sheet tabs are named exactly:
   - `Income`
   - `Expenses`
   - `Budget Allocation`
   - `Cash Flow Summary` (optional)
4. **Check Sheet Headers**: Make sure the first row of each sheet has the exact headers as specified
5. **Check Publishing**: Ensure your sheet is published to the web (File > Share > Publish to web)

### Data Not Appearing

1. Check that your data rows start from row 2 (row 1 should be headers)
2. Verify date formats are YYYY-MM-DD
3. Ensure amount values are numbers (not text)
4. Check browser console for error messages

### API Quota Exceeded

Google Sheets API has a quota limit. If you exceed it:
- Wait a few minutes and try again
- Consider implementing caching in production
- Check your Google Cloud Console for quota details

## Data Updates

- **Real-time Sync**: The dashboard automatically refreshes every 30 seconds
- **Manual Refresh**: Click the "Refresh Data" button in the top-right corner
- **Edit Data**: All edits should be made in Google Sheets - changes will appear on the dashboard within 30 seconds

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Set environment variables in your hosting platform's dashboard
2. Use the same `.env.local` variable names:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SHEETS_ID`
3. Ensure your Google Sheets is still published to the web
4. Consider restricting your API key to specific domains for security

## Security Notes

- The dashboard is **read-only** - it cannot modify your Google Sheets
- Your API key should be kept secret and never exposed to the client
- For production, consider using a server-side API proxy or Google OAuth for better security
- The current implementation uses public API key which works for read-only public sheets
