import { Users, MapPin, Clock, Star } from 'lucide-react';

export function ListingStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {[
        { icon: Users, label: 'Members', value: '500+' },
        { icon: MapPin, label: 'Location', value: 'Downtown' },
        { icon: Clock, label: 'Hours', value: '24/7' },
        { icon: Star, label: 'Rating', value: '4.8' },
      ].map((stat, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <stat.icon className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-sm text-white/60">{stat.label}</div>
            <div className="text-lg font-semibold text-white">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 