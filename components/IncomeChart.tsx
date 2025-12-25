'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IncomeEntry } from '@/lib/types';
import { formatIDR } from '@/lib/utils';
import { useMemo } from 'react';

interface IncomeChartProps {
  data: IncomeEntry[];
}

export default function IncomeChart({ data }: IncomeChartProps) {
  const chartData = useMemo(() => {
    const grouped = data.reduce((acc, entry) => {
      const source = entry.sourceOfIncome || 'Other';
      acc[source] = (acc[source] || 0) + entry.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      amount: value,
    })).sort((a, b) => b.amount - a.amount);
  }, [data]);

  const formatCurrency = (value: number) => formatIDR(value);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Income by Source</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
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
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          <Bar dataKey="amount" fill="#10b981" name="Income (IDR)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
