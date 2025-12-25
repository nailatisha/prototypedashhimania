import { NextResponse } from 'next/server';
// Using CSV reader for prototype (no Google Sheets API needed)
import { 
  fetchIncomeDataFromCSV, 
  fetchExpenseDataFromCSV, 
  fetchBudgetDataFromCSV, 
  fetchCashFlowDataFromCSV 
} from '@/lib/csv-reader';

export const dynamic = 'force-dynamic';
export const revalidate = 30; // Revalidate every 30 seconds

export async function GET() {
  try {
    // Read data from CSV files in dummy-data folder
    const [income, expenses, budget, cashFlow] = await Promise.all([
      fetchIncomeDataFromCSV(),
      fetchExpenseDataFromCSV(),
      fetchBudgetDataFromCSV(),
      fetchCashFlowDataFromCSV(),
    ]);

    const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
    const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);
    const currentBalance = totalIncome - totalExpenses;

    return NextResponse.json({
      income,
      expenses,
      budget,
      cashFlow,
      summary: {
        totalIncome,
        totalExpenses,
        currentBalance,
      },
    });
  } catch (error) {
    console.error('Error fetching financial data from CSV:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch financial data', 
        details: `Error reading CSV files: ${errorMessage}\n\nMake sure CSV files exist in the dummy-data folder.`,
        technicalError: errorMessage
      },
      { status: 500 }
    );
  }
}
