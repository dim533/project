import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Building2,
  ImageIcon,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  BarChart
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Building2, label: 'Listing', path: '/dashboard/listing' },
  { icon: ImageIcon, label: 'Photos', path: '/dashboard/photos' },
  { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: Users, label: 'Reviews', path: '/dashboard/reviews' },
  { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-white/10">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors",
                  location.pathname === item.path && "bg-white/10 text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 