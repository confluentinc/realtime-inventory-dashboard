import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'red' | 'green' | 'indigo';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  red: 'bg-red-50 text-red-600',
  green: 'bg-green-50 text-green-600',
  indigo: 'bg-indigo-50 text-indigo-600'
};

export default function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend === 'up' ? (
          <TrendingUp className="w-5 h-5 text-green-500" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-500" />
        )}
      </div>
      <div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
        <p className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}
