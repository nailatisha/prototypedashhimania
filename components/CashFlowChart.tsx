'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CashFlowSummary } from '@/lib/types';
import { formatIDR } from '@/lib/utils';

interface CashFlowChartProps {
  data: CashFlowSummary[];
}

export default function CashFlowChart({ data }: CashFlowChartProps) {
  const formatCurrency = (value: number) => formatIDR(value);
  
  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cash Flow Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={formatMonth}
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis 
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => formatMonth(label)}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalIncome" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Total Income"
            dot={{ fill: '#10b981', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="totalExpense" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Total Expense"
            dot={{ fill: '#ef4444', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="endingBalance" 
            stroke="#6366f1" 
            strokeWidth={2}
            name="Ending Balance"
            dot={{ fill: '#6366f1', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
