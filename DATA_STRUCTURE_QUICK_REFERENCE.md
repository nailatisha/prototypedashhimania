# Google Sheets Data Structure - Quick Reference

This is a quick reference guide for the exact column names and formats required in Google Sheets.

## Sheet Names (Case-Sensitive)

Must match exactly:
- `Income`
- `Expenses`
- `Budget Allocation`
- `Cash Flow Summary` (optional)

## Column Headers (Case-Sensitive)

### Income Sheet
```
Row 1 (Headers):
Date | Source of Income | Description | Amount (IDR) | Program / Division
```

**Data Format**:
- **Date**: YYYY-MM-DD (e.g., 2024-01-15)
- **Source of Income**: Text (e.g., "Sponsorship", "Membership Fee")
- **Description**: Text
- **Amount (IDR)**: Number (e.g., 5000000)
- **Program / Division**: Text (e.g., "Annual Event", "Marketing")

### Expenses Sheet
```
Row 1 (Headers):
Date | Expense Category | Description | Amount (IDR) | Program / Division
```

**Data Format**:
- **Date**: YYYY-MM-DD (e.g., 2024-01-20)
- **Expense Category**: Text (e.g., "Logistics", "Consumption", "Speaker Fee")
- **Description**: Text
- **Amount (IDR)**: Number (e.g., 3000000)
- **Program / Division**: Text

### Budget Allocation Sheet
```
Row 1 (Headers):
Program / Division | Approved Budget (IDR) | Used Budget (IDR) | Remaining Budget (IDR)
```

**Data Format**:
- **Program / Division**: Text
- **Approved Budget (IDR)**: Number
- **Used Budget (IDR)**: Number
- **Remaining Budget (IDR)**: Number

### Cash Flow Summary Sheet (Optional)
```
Row 1 (Headers):
Month | Total Income | Total Expense | Ending Balance
```

**Data Format**:
- **Month**: YYYY-MM (e.g., 2024-01)
- **Total Income**: Number
- **Total Expense**: Number
- **Ending Balance**: Number

## Important Notes

1. **First row must be headers** - Data starts from row 2
2. **Column names must match exactly** (case-sensitive, including spaces)
3. **Amounts should be numbers** (not text with currency symbols)
4. **Dates should be YYYY-MM-DD format** (other formats may work but not guaranteed)
5. **Empty rows are ignored** - Can have blank rows between data
6. **Program/Division names should be consistent** across all sheets

## Common Mistakes

❌ **Wrong**: "Date" vs "date" (case mismatch)
❌ **Wrong**: "Amount(IDR)" vs "Amount (IDR)" (space matters)
❌ **Wrong**: "Rp 5,000,000" (should be: 5000000)
❌ **Wrong**: "15/01/2024" (use: 2024-01-15)
❌ **Wrong**: Headers in row 2 (must be row 1)

✅ **Correct**: Exact column names as specified
✅ **Correct**: Numbers without formatting
✅ **Correct**: YYYY-MM-DD date format
✅ **Correct**: Headers in row 1, data from row 2

## Sample Row

### Income Example:
```
2024-01-15 | Sponsorship | Sponsorship from Company XYZ | 5000000 | Annual Event
```

### Expense Example:
```
2024-01-20 | Venue | Venue rental for Annual Event | 3000000 | Annual Event
```

### Budget Allocation Example:
```
Annual Event | 50000000 | 32200000 | 17800000
```

### Cash Flow Summary Example:
```
2024-01 | 7500000 | 3500000 | 4000000
```
