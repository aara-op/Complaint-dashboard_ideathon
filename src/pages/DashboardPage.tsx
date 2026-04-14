import {
  MessageSquareWarning,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  Zap,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { dashboardStats, complaints, channelData, severityData, trendData, weeklyData } from '../data/mockData';
import { PageType } from '../types';

interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
  onSelectComplaint: (id: string) => void;
}

const statCards = [
  { label: 'Total Complaints', value: dashboardStats.totalComplaints.toLocaleString(), icon: <MessageSquareWarning size={22} />, color: 'from-indigo-600 to-indigo-700', change: '+5.2%', up: true },
  { label: 'New Today', value: dashboardStats.newToday, icon: <TrendingUp size={22} />, color: 'from-cyan-600 to-cyan-700', change: '+12.3%', up: true },
  { label: 'Resolved', value: dashboardStats.resolved.toLocaleString(), icon: <CheckCircle2 size={22} />, color: 'from-emerald-600 to-emerald-700', change: '+8.1%', up: true },
  { label: 'Escalated', value: dashboardStats.escalated, icon: <AlertTriangle size={22} />, color: 'from-red-600 to-red-700', change: '-3.2%', up: false },
  { label: 'Avg Resolution', value: dashboardStats.avgResolutionTime, icon: <Clock size={22} />, color: 'from-amber-600 to-amber-700', change: '-15min', up: false },
  { label: 'SLA Compliance', value: `${dashboardStats.slaCompliance}%`, icon: <ShieldCheck size={22} />, color: 'from-purple-600 to-purple-700', change: '+1.2%', up: true },
];

const severityColors = ['#ef4444', '#f97316', '#f59e0b', '#10b981'];

export default function DashboardPage({ onNavigate, onSelectComplaint }: DashboardPageProps) {
  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Agent</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your complaints today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
            <Star size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-white">{dashboardStats.csat}</span>
            <span className="text-xs text-gray-500">CSAT</span>
          </div>
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-xs text-green-400 font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 hover:border-indigo-500/30 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Complaint Trends (6 Months)</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Received</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Resolved</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              <Line type="monotone" dataKey="complaints" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Pie */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">By Severity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
              >
                {severityData.map((_, i) => (
                  <Cell key={i} fill={severityColors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {severityData.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: severityColors[i] }} />
                {s.name}: {s.count}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Overview */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barGap={4}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="complaints" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channels */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">By Channel</h3>
          <div className="space-y-3">
            {channelData.map((ch, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{ch.name}</span>
                  <span className="text-white font-medium">{ch.count}</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(ch.count / 892) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Complaints</h3>
            <button
              onClick={() => onNavigate('complaints')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View All <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {recentComplaints.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectComplaint(c.id)}
                className="w-full text-left p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-transparent hover:border-indigo-500/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-indigo-400">{c.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        c.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        c.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        c.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {c.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 truncate">{c.subject}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    c.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                    c.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400' :
                    c.status === 'Escalated' ? 'bg-red-500/20 text-red-400' :
                    c.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Quick Actions Banner */}
      <div className="glass-card rounded-xl p-5 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-indigo-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
            <Zap size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Gen-AI Quick Actions</h3>
            <p className="text-xs text-gray-400 mt-0.5">AI has identified 3 high-priority actions that could resolve 127 complaints</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('ai-insights')} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
              <Users size={16} />
              View Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
