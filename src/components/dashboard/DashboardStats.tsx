import { Card } from '../ui/card';
import { Users, Star, Eye, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Profile Views',
    value: '1,234',
    change: '+12.3%',
    trend: 'up',
    icon: Eye,
  },
  {
    label: 'Total Reviews',
    value: '48',
    change: '+4',
    trend: 'up',
    icon: Star,
  },
  {
    label: 'Avg. Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Leads Generated',
    value: '156',
    change: '+23.5%',
    trend: 'up',
    icon: Users,
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 bg-white/5 border-white/10">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="w-5 h-5 text-emerald-400" />
            <span className={`text-sm ${
              stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 