import { IncomeEntry, ExpenseEntry, BudgetAllocation, CashFlowSummary } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Read and parse CSV file
 */
function parseCSV(csvContent: string): string[][] {
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    
    return result;
  });
}

/**
 * Read CSV file from dummy-data folder
 */
function readCSVFile(filename: string): string[][] {
  const filePath = path.join(process.cwd(), 'dummy-data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parseCSV(fileContent);
}

/**
 * Fetch income data from CSV
 */
export function fetchIncomeDataFromCSV(): IncomeEntry[] {
  const rows = readCSVFile('income.csv');
  
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1);
  
  return dataRows
    .map(row => {
      // Pad row to match header length
      while (row.length < headers.length) {
        row.push('');
      }
      
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
    })
    .filter((item): item is IncomeEntry => item !== null);
}

/**
 * Fetch expense data from CSV
 */
export function fetchExpenseDataFromCSV(): ExpenseEntry[] {
  const rows = readCSVFile('expenses.csv');
  
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1);
  
  return dataRows
    .map(row => {
      while (row.length < headers.length) {
        row.push('');
      }
      
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
    })
    .filter((item): item is ExpenseEntry => item !== null);
}

/**
 * Fetch budget allocation data from CSV
 */
export function fetchBudgetDataFromCSV(): BudgetAllocation[] {
  const rows = readCSVFile('budget-allocation.csv');
  
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1);
  
  return dataRows
    .map(row => {
      while (row.length < headers.length) {
        row.push('');
      }
      
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
    })
    .filter((item): item is BudgetAllocation => item !== null);
}

/**
 * Fetch cash flow summary data from CSV
 */
export function fetchCashFlowDataFromCSV(): CashFlowSummary[] {
  try {
    const rows = readCSVFile('cash-flow-summary.csv');
    
    if (rows.length === 0) return [];
    
    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1);
    
    return dataRows
      .map(row => {
        while (row.length < headers.length) {
          row.push('');
        }
        
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
      })
      .filter((item): item is CashFlowSummary => item !== null);
  } catch (error) {
    console.warn('Cash Flow Summary CSV not available:', error);
    return [];
  }
}


