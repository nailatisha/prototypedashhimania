'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BudgetAllocation } from '@/lib/types';
import { formatIDR } from '@/lib/utils';

interface BudgetChartProps {
  data: BudgetAllocation[];
}

export default function BudgetChart({ data }: BudgetChartProps) {
  // If no data, don't render
  if (!data || data.length === 0) {
    return null;
  }

  const chartData = data
    .map(item => ({
      name: item.programDivision,
      approved: item.approvedBudget,
      used: item.usedBudget,
      remaining: item.remainingBudget,
      percentage: item.approvedBudget > 0 
        ? ((item.usedBudget / item.approvedBudget) * 100).toFixed(1)
        : '0',
    }))
    .sort((a, b) => b.approved - a.approved); // Sort by approved budget descending

  const formatCurrency = (value: number) => formatIDR(value);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Budget Realization by Program</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No budget data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={11}
                interval={0}
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'used') {
                    return [
                      `${formatCurrency(value)} (${props.payload.percentage}%)`,
                      'Used Budget'
                    ];
                  }
                  return [formatCurrency(value), name === 'approved' ? 'Approved Budget' : 'Remaining Budget'];
                }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="approved" fill="#94a3b8" name="Approved Budget" />
              <Bar dataKey="used" fill="#ef4444" name="Used Budget" />
              <Bar dataKey="remaining" fill="#10b981" name="Remaining Budget" />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Compact summary table below chart */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Program</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-700">Approved</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-700">Used</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-700">Remaining</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">Usage</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => {
                  const percentage = parseFloat(item.percentage);
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-2 font-medium text-gray-900">{item.name}</td>
                      <td className="py-2 px-2 text-right text-gray-600">{formatIDR(item.approved)}</td>
                      <td className="py-2 px-2 text-right font-medium text-red-600">{formatIDR(item.used)}</td>
                      <td className="py-2 px-2 text-right font-medium text-green-600">{formatIDR(item.remaining)}</td>
                      <td className="py-2 px-2 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          percentage >= 80 
                            ? 'bg-red-100 text-red-800' 
                            : percentage >= 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
