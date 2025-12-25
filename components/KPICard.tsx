import { formatIDR } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number;
  subtitle?: string;
  variant?: 'income' | 'expense' | 'balance';
  icon?: React.ReactNode;
}

export default function KPICard({ 
  title, 
  value, 
  subtitle, 
  variant = 'balance',
  icon 
}: KPICardProps) {
  const variantStyles = {
    income: 'bg-green-50 border-green-200 text-green-700',
    expense: 'bg-red-50 border-red-200 text-red-700',
    balance: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  };

  const iconColors = {
    income: 'text-green-600',
    expense: 'text-red-600',
    balance: 'text-indigo-600',
  };

  return (
    <div className={`rounded-lg border-2 p-6 ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
          <p className="text-3xl font-bold">{formatIDR(value)}</p>
          {subtitle && (
            <p className="text-sm mt-2 opacity-70">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`text-4xl ${iconColors[variant]} opacity-50`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
