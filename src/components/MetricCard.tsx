import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  subtitle?: string;
}

export default function MetricCard({ title, value, icon: Icon, iconColor, subtitle }: MetricCardProps) {
  return (
    <div className="bg-[#181B1F] border border-[#2B2F36] rounded-lg p-5 hover:border-[#3B3F46] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[#A0A4A8] text-sm font-medium mb-2">{title}</p>
          <p className="text-white text-3xl font-bold mb-1 transition-all duration-300">{value}</p>
          {subtitle && (
            <p className="text-[#6C7075] text-xs transition-all duration-300">{subtitle}</p>
          )}
        </div>
        <div className={`${iconColor} p-3 rounded-lg bg-opacity-10`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
