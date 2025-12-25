# Google Sheets Data Structure for HIMANIA Financial Dashboard

This document describes the structure of the Google Sheets that serve as the data source for the dashboard.

## Sheet 1: Income

**Sheet Name**: `Income`

| Column | Description | Example |
|--------|-------------|---------|
| Date | Transaction date (YYYY-MM-DD format) | 2024-01-15 |
| Source of Income | Category of income | Sponsorship, Membership Fee, Event Ticket |
| Description | Detailed description | Sponsorship from Company XYZ for Annual Event |
| Amount (IDR) | Income amount in Indonesian Rupiah | 5000000 |
| Program / Division | Associated program or division | Annual Event, Marketing, General |

**Sample Data** (10-15 entries):

```
Date,Source of Income,Description,Amount (IDR),Program / Division
2024-01-15,Sponsorship,Sponsorship from Company XYZ for Annual Event,5000000,Annual Event
2024-01-20,Membership Fee,Membership fees collected (50 members),2500000,General
2024-02-01,Event Ticket,Ticket sales for Workshop Series,3500000,Workshop Series
2024-02-10,Sponsorship,Sponsorship from ABC Corp,3000000,Marketing
2024-02-15,Event Ticket,Ticket sales for Networking Event,2000000,Networking Event
2024-03-01,Membership Fee,Membership fees collected (30 members),1500000,General
2024-03-10,Sponsorship,Gold sponsor for Annual Event,10000000,Annual Event
2024-03-15,Event Ticket,Ticket sales for Leadership Seminar,4000000,Workshop Series
2024-03-20,Donation,General donation from alumni,1000000,General
2024-04-01,Sponsorship,Silver sponsor from DEF Inc,5000000,Annual Event
2024-04-10,Event Ticket,Ticket sales for Career Fair,6000000,Career Fair
2024-04-15,Membership Fee,Membership fees collected (40 members),2000000,General
2024-04-20,Sponsorship,Sponsorship for Workshop Series,2500000,Workshop Series
2024-05-01,Event Ticket,Ticket sales for Annual Event,15000000,Annual Event
2024-05-10,Donation,Special donation for scholarship fund,2000000,Scholarship
```

## Sheet 2: Expenses

**Sheet Name**: `Expenses`

| Column | Description | Example |
|--------|-------------|---------|
| Date | Transaction date (YYYY-MM-DD format) | 2024-01-20 |
| Expense Category | Category of expense | Logistics, Consumption, Publication, Speaker Fee, Venue, Equipment |
| Description | Detailed description | Venue rental for Annual Event |
| Amount (IDR) | Expense amount in Indonesian Rupiah | 3000000 |
| Program / Division | Associated program or division | Annual Event, Marketing, General |

**Sample Data** (15-20 entries):

```
Date,Expense Category,Description,Amount (IDR),Program / Division
2024-01-20,Venue,Venue rental for Annual Event,3000000,Annual Event
2024-01-25,Consumption,Food and beverages for board meeting,500000,General
2024-02-01,Logistics,Event materials and decorations,1500000,Annual Event
2024-02-05,Speaker Fee,Keynote speaker honorarium,2000000,Workshop Series
2024-02-10,Publication,Design and printing of event posters,800000,Marketing
2024-02-15,Equipment,AV equipment rental for workshop,1200000,Workshop Series
2024-02-20,Consumption,Catering for Workshop Series (50 pax),2500000,Workshop Series
2024-03-01,Logistics,Transportation for event setup,600000,Annual Event
2024-03-05,Publication,Social media advertising campaign,1500000,Marketing
2024-03-10,Speaker Fee,Guest speaker honorarium,1500000,Networking Event
2024-03-15,Venue,Networking event venue rental,2000000,Networking Event
2024-03-20,Consumption,Refreshments for Networking Event,800000,Networking Event
2024-04-01,Equipment,Photography and videography services,3000000,Annual Event
2024-04-05,Logistics,Annual Event stage and sound system,4000000,Annual Event
2024-04-10,Consumption,Gala dinner for Annual Event (200 pax),8000000,Annual Event
2024-04-15,Publication,Event brochure and program booklet,1200000,Annual Event
2024-04-20,Speaker Fee,Multiple speaker honorariums,5000000,Annual Event
2024-05-01,Equipment,Equipment rental for Career Fair,2500000,Career Fair
2024-05-05,Consumption,Career Fair refreshments,1500000,Career Fair
2024-05-10,Logistics,General office supplies,500000,General
```

## Sheet 3: Budget Allocation

**Sheet Name**: `Budget Allocation`

| Column | Description | Example |
|--------|-------------|---------|
| Program / Division | Program or division name | Annual Event |
| Approved Budget (IDR) | Total approved budget | 50000000 |
| Used Budget (IDR) | Total expenses (calculated from Expenses sheet) | 32000000 |
| Remaining Budget (IDR) | Remaining budget (Approved - Used) | 18000000 |

**Sample Data**:

```
Program / Division,Approved Budget (IDR),Used Budget (IDR),Remaining Budget (IDR)
Annual Event,50000000,32200000,17800000
Workshop Series,15000000,8700000,6300000
Networking Event,8000000,4300000,3700000
Career Fair,10000000,4000000,6000000
Marketing,12000000,2300000,9700000
General,5000000,1000000,4000000
Scholarship,3000000,0,3000000
```

**Note**: Used Budget values should be calculated by summing all expenses for each Program/Division from the Expenses sheet. For dummy data, these are manually entered but should be consistent with the Expenses sheet.

## Sheet 4: Cash Flow Summary (Optional)

**Sheet Name**: `Cash Flow Summary`

| Column | Description | Example |
|--------|-------------|---------|
| Month | Month and year (YYYY-MM format) | 2024-01 |
| Total Income | Sum of all income for the month | 7500000 |
| Total Expense | Sum of all expenses for the month | 3500000 |
| Ending Balance | Cumulative balance (previous balance + income - expense) | 4000000 |

**Sample Data**:

```
Month,Total Income,Total Expense,Ending Balance
2024-01,7500000,3500000,4000000
2024-02,5500000,5200000,4300000
2024-03,17000000,6300000,15000000
2024-04,26500000,18200000,23300000
2024-05,17000000,8500000,31800000
```

**Note**: This sheet can be auto-calculated from Income and Expenses sheets, or manually maintained for reporting purposes.

## How to Set Up in Google Sheets

1. Create a new Google Sheet
2. Create four separate sheets with the names: `Income`, `Expenses`, `Budget Allocation`, `Cash Flow Summary`
3. Add the header rows as specified above
4. Populate with the sample data provided
5. Publish the sheet: File > Share > Publish to web (select all sheets)
6. Copy the Sheet ID from the URL (the string between `/d/` and `/edit`)
7. Use this Sheet ID in your `.env.local` file

## Important Notes

- All dates should be in YYYY-MM-DD format for consistency
- All amounts are in Indonesian Rupiah (IDR)
- Program/Division names should be consistent across all sheets
- Used Budget in Budget Allocation should logically match the sum of expenses per division
- The dashboard will automatically fetch and display this data
