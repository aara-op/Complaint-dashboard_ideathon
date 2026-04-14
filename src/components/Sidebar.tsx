import React from 'react';
import {
  LayoutDashboard,
  MessageSquareWarning,
  BarChart3,
  BrainCircuit,
  AlertTriangle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const menuItems: { icon: React.ReactNode; label: string; page: PageType; badge?: number }[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', page: 'dashboard' },
  { icon: <MessageSquareWarning size={20} />, label: 'Complaints', page: 'complaints', badge: 43 },
  { icon: <BarChart3 size={20} />, label: 'Analytics', page: 'analytics' },
  { icon: <BrainCircuit size={20} />, label: 'AI Insights', page: 'ai-insights' },
  { icon: <AlertTriangle size={20} />, label: 'Escalations', page: 'escalations', badge: 12 },
  { icon: <Settings size={20} />, label: 'Settings', page: 'settings' },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggle, onLogout }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#12131f] border-r border-indigo-900/30 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[250px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-indigo-900/30 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
            Complai.nt
          </span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${collapsed ? 'text-center' : 'px-3'}`}>
          {collapsed ? '•••' : 'Navigation'}
        </div>
        {menuItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 group relative ${
              currentPage === item.page
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className={`shrink-0 ${currentPage === item.page ? 'text-indigo-400' : ''}`}>
              {item.icon}
            </span>
            {!collapsed && (
              <>
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-indigo-900/30 p-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          title="Logout"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 mt-1 rounded-lg text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
