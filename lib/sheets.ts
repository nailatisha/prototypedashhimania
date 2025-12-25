import { IncomeEntry, ExpenseEntry, BudgetAllocation, CashFlowSummary } from './types';

// These environment variables are only accessed server-side in API routes
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

/**
 * Fetch data from a specific sheet tab
 */
async function fetchSheetData(sheetName: string): Promise<string[][]> {
  if (!GOOGLE_SHEETS_ID) {
    throw new Error('GOOGLE_SHEETS_ID is not configured. Please add it to .env.local file.');
  }

  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error('GOOGLE_SHEETS_API_KEY is not configured. Please add it to .env.local file.');
  }

  // Use Google Sheets API v4
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${sheetName}?key=${GOOGLE_SHEETS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    
    if (!response.ok) {
      // Handle specific API errors
      if (response.status === 403) {
        throw new Error(`Access denied. Please check if:\n- Your API key is valid\n- Google Sheets API is enabled in Google Cloud Console\n- Your sheet is published (File > Share > Publish to web)`);
      } else if (response.status === 404) {
        throw new Error(`Sheet not found. Please check if:\n- Sheet ID is correct\n- Sheet "${sheetName}" exists in your spreadsheet\n- Sheet is published (File > Share > Publish to web)`);
      } else if (responseData.error) {
        throw new Error(`Google Sheets API Error: ${responseData.error.message || response.statusText}`);
      }
      throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`);
    }
    
    return responseData.values || [];
  } catch (error) {
    // Re-throw if it's already a formatted error
    if (error instanceof Error && error.message.includes('\n')) {
      throw error;
    }
    console.error(`Error fetching ${sheetName}:`, error);
    throw new Error(`Failed to fetch ${sheetName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse CSV-like data from Google Sheets rows
 */
function parseSheetData<T>(
  rows: string[][],
  parser: (row: string[], headers: string[]) => T | null
): T[] {
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1);
  
  return dataRows
    .map(row => {
      // Pad row to match header length
      while (row.length < headers.length) {
        row.push('');
      }
      return parser(row, headers);
    })
    .filter((item): item is T => item !== null);
}

/**
 * Fetch income data from Google Sheets
 */
export async function fetchIncomeData(): Promise<IncomeEntry[]> {
  const rows = await fetchSheetData('Income');
  
  return parseSheetData<IncomeEntry>(rows, (row, headers) => {
    try {
      const getValue = (colName: string) => {
        const index = headers.indexOf(colName);
        return index >= 0 ? row[index]?.trim() : '';
      };

      const date = getValue('Date');
      const amount = getValue('Amount (IDR)');
      
      if (!date || !amount) return null;

      return {
        date,
        sourceOfIncome: getValue('Source of Income'),
        description: getValue('Description'),
        amount: parseFloat(amount.replace(/[^\d.-]/g, '')) || 0,
        programDivision: getValue('Program / Division'),
      };
    } catch (error) {
      console.error('Error parsing income row:', error);
      return null;
    }
  });
}

/**
 * Fetch expense data from Google Sheets
 */
export async function fetchExpenseData(): Promise<ExpenseEntry[]> {
  const rows = await fetchSheetData('Expenses');
  
  return parseSheetData<ExpenseEntry>(rows, (row, headers) => {
    try {
      const getValue = (colName: string) => {
        const index = headers.indexOf(colName);
        return index >= 0 ? row[index]?.trim() : '';
      };

      const date = getValue('Date');
      const amount = getValue('Amount (IDR)');
      
      if (!date || !amount) return null;

      return {
        date,
        expenseCategory: getValue('Expense Category'),
        description: getValue('Description'),
        amount: parseFloat(amount.replace(/[^\d.-]/g, '')) || 0,
        programDivision: getValue('Program / Division'),
      };
    } catch (error) {
      console.error('Error parsing expense row:', error);
      return null;
    }
  });
}

/**
 * Fetch budget allocation data from Google Sheets
 */
export async function fetchBudgetData(): Promise<BudgetAllocation[]> {
  const rows = await fetchSheetData('Budget Allocation');
  
  return parseSheetData<BudgetAllocation>(rows, (row, headers) => {
    try {
      const getValue = (colName: string) => {
        const index = headers.indexOf(colName);
        return index >= 0 ? row[index]?.trim() : '';
      };

      const programDivision = getValue('Program / Division');
      const approved = getValue('Approved Budget (IDR)');
      
      if (!programDivision || !approved) return null;

      const approvedBudget = parseFloat(approved.replace(/[^\d.-]/g, '')) || 0;
      const usedBudget = parseFloat(getValue('Used Budget (IDR)').replace(/[^\d.-]/g, '')) || 0;
      const remainingBudget = parseFloat(getValue('Remaining Budget (IDR)').replace(/[^\d.-]/g, '')) || 0;

      return {
        programDivision,
        approvedBudget,
        usedBudget,
        remainingBudget,
      };
    } catch (error) {
      console.error('Error parsing budget row:', error);
      return null;
    }
  });
}

/**
 * Fetch cash flow summary data from Google Sheets
 */
export async function fetchCashFlowData(): Promise<CashFlowSummary[]> {
  try {
    const rows = await fetchSheetData('Cash Flow Summary');
    
    return parseSheetData<CashFlowSummary>(rows, (row, headers) => {
      try {
        const getValue = (colName: string) => {
          const index = headers.indexOf(colName);
          return index >= 0 ? row[index]?.trim() : '';
        };

        const month = getValue('Month');
        if (!month) return null;

        return {
          month,
          totalIncome: parseFloat(getValue('Total Income').replace(/[^\d.-]/g, '')) || 0,
          totalExpense: parseFloat(getValue('Total Expense').replace(/[^\d.-]/g, '')) || 0,
          endingBalance: parseFloat(getValue('Ending Balance').replace(/[^\d.-]/g, '')) || 0,
        };
      } catch (error) {
        console.error('Error parsing cash flow row:', error);
        return null;
      }
    });
  } catch (error) {
    // Cash Flow Summary is optional, return empty array if not available
    console.warn('Cash Flow Summary sheet not available:', error);
    return [];
  }
}

// Note: formatIDR moved to lib/utils.ts for client-side use
