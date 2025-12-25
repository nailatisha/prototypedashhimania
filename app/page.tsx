'use client';

import { useEffect, useState } from 'react';
import KPICard from '@/components/KPICard';
import IncomeChart from '@/components/IncomeChart';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetChart from '@/components/BudgetChart';
import CashFlowChart from '@/components/CashFlowChart';
import DataTable from '@/components/DataTable';
import { IncomeEntry, ExpenseEntry, BudgetAllocation, CashFlowSummary } from '@/lib/types';

interface FinancialData {
  income: IncomeEntry[];
  expenses: ExpenseEntry[];
  budget: BudgetAllocation[];
  cashFlow: CashFlowSummary[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    currentBalance: number;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/financial-data');
      
      const result = await response.json();
      
      if (!response.ok) {
        // If API returns error object, use its details
        const errorMsg = result.details || result.error || 'Failed to fetch financial data';
        throw new Error(errorMsg);
      }
      
      // Check if response has error property
      if (result.error) {
        throw new Error(result.details || result.error);
      }
      
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-left whitespace-pre-line">{error}</p>
            </div>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium mb-6"
            >
              Retry
            </button>
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
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-600">
                  📖 This is a prototype version. For production with Google Sheets, see <code className="bg-blue-100 px-1 rounded">SETUP_GUIDE.md</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HIMANIA FIA UI's Financial Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Open, transparent, and real-time financial information
              </p>
            </div>
            <div className="text-right">
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="mt-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Total Income"
            value={data.summary.totalIncome}
            variant="income"
            icon="💰"
          />
          <KPICard
            title="Total Expenses"
            value={data.summary.totalExpenses}
            variant="expense"
            icon="💸"
          />
          <KPICard
            title="Current Balance"
            value={data.summary.currentBalance}
            variant="balance"
            subtitle={data.summary.currentBalance >= 0 ? 'Positive balance' : 'Deficit'}
            icon="💳"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncomeChart data={data.income} />
          <ExpenseChart data={data.expenses} />
        </div>

        {/* Budget Realization Chart with Table */}
        {data.budget && data.budget.length > 0 && (
          <div className="mb-8">
            <BudgetChart data={data.budget} />
          </div>
        )}

        {/* Cash Flow Chart */}
        {data.cashFlow.length > 0 && (
          <div className="mb-8">
            <CashFlowChart data={data.cashFlow} />
          </div>
        )}

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Recent Income"
            type="income"
            data={data.income.slice(-10).reverse()}
          />
          <DataTable
            title="Recent Expenses"
            type="expense"
            data={data.expenses.slice(-10).reverse()}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This dashboard is read-only. All financial data must be updated in Google Sheets. 
            Changes will automatically appear on this dashboard within 30 seconds.
          </p>
        </div>
      </main>
    </div>
  );
}
