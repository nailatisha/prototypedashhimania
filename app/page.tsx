import KPICard from '@/components/KPICard';
import IncomeChart from '@/components/IncomeChart';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetChart from '@/components/BudgetChart';
import CashFlowChart from '@/components/CashFlowChart';
import DataTable from '@/components/DataTable';
import { IncomeEntry, ExpenseEntry, BudgetAllocation, CashFlowSummary } from '@/lib/types';
import { 
  fetchIncomeDataFromCSV, 
  fetchExpenseDataFromCSV, 
  fetchBudgetDataFromCSV, 
  fetchCashFlowDataFromCSV 
} from '@/lib/csv-reader';

export default async function Dashboard() {
  // Read data directly from CSV files
  let income: IncomeEntry[] = [];
  let expenses: ExpenseEntry[] = [];
  let budget: BudgetAllocation[] = [];
  let cashFlow: CashFlowSummary[] = [];
  let error: string | null = null;

  try {
    [income, expenses, budget, cashFlow] = [
      fetchIncomeDataFromCSV(),
      fetchExpenseDataFromCSV(),
      fetchBudgetDataFromCSV(),
      fetchCashFlowDataFromCSV(),
    ];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load financial data';
    console.error('Error loading CSV data:', err);
  }

  const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);
  const currentBalance = totalIncome - totalExpenses;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-left whitespace-pre-line">{error}</p>
            </div>
            <div className="mt-6 text-left bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Prototype Mode - CSV Data</h3>
              <p className="text-sm text-blue-800 mb-3">
                This prototype reads data from CSV files in the <code className="bg-blue-100 px-2 py-1 rounded">dummy-data/</code> folder.
              </p>
              <p className="text-sm text-blue-800 mb-3">
                Make sure these files exist:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 mb-3">
                <li><code className="bg-blue-100 px-1 rounded">dummy-data/income.csv</code></li>
                <li><code className="bg-blue-100 px-1 rounded">dummy-data/expenses.csv</code></li>
                <li><code className="bg-blue-100 px-1 rounded">dummy-data/budget-allocation.csv</code></li>
                <li><code className="bg-blue-100 px-1 rounded">dummy-data/cash-flow-summary.csv</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HIMANIA FIA UI's Financial Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Open, transparent financial information
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Total Income"
            value={totalIncome}
            variant="income"
            icon="💰"
          />
          <KPICard
            title="Total Expenses"
            value={totalExpenses}
            variant="expense"
            icon="💸"
          />
          <KPICard
            title="Current Balance"
            value={currentBalance}
            variant="balance"
            subtitle={currentBalance >= 0 ? 'Positive balance' : 'Deficit'}
            icon="💳"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncomeChart data={income} />
          <ExpenseChart data={expenses} />
        </div>

        {/* Budget Realization Chart with Table */}
        {budget && budget.length > 0 && (
          <div className="mb-8">
            <BudgetChart data={budget} />
          </div>
        )}

        {/* Cash Flow Chart */}
        {cashFlow.length > 0 && (
          <div className="mb-8">
            <CashFlowChart data={cashFlow} />
          </div>
        )}

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Recent Income"
            type="income"
            data={income.slice(-10).reverse()}
          />
          <DataTable
            title="Recent Expenses"
            type="expense"
            data={expenses.slice(-10).reverse()}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This dashboard reads data from CSV files in the <code className="bg-blue-100 px-1 rounded">dummy-data/</code> folder. 
            To update the data, edit the CSV files and refresh the page.
          </p>
        </div>
      </main>
    </div>
  );
}
