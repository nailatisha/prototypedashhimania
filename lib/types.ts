export interface IncomeEntry {
  date: string;
  sourceOfIncome: string;
  description: string;
  amount: number;
  programDivision: string;
}

export interface ExpenseEntry {
  date: string;
  expenseCategory: string;
  description: string;
  amount: number;
  programDivision: string;
}

export interface BudgetAllocation {
  programDivision: string;
  approvedBudget: number;
  usedBudget: number;
  remainingBudget: number;
}

export interface CashFlowSummary {
  month: string;
  totalIncome: number;
  totalExpense: number;
  endingBalance: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  budgetRealization: BudgetAllocation[];
}


