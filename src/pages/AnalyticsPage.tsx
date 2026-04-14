import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import {
  categoryDistribution,
  sentimentData,
  channelData,
  topIssues,
  toneAnalysis,
  trendData,
  severityData,
} from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  PieChartIcon,
  Activity,
  Megaphone,
} from 'lucide-react';

const sentimentColors = ['#ef4444', '#f97316', '#6b7280', '#10b981'];
const toneColors = ['#ef4444', '#f97316', '#f59e0b', '#3b82f6', '#6b7280', '#10b981'];

const radarData = [
  { subject: 'Billing', A: 842, fullMark: 1000 },
  { subject: 'Product', A: 623, fullMark: 1000 },
  { subject: 'Technical', A: 534, fullMark: 1000 },
  { subject: 'Service', A: 445, fullMark: 1000 },
  { subject: 'Privacy', A: 198, fullMark: 1000 },
  { subject: 'Delivery', A: 205, fullMark: 1000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics & Statistics</h1>
        <p className="text-gray-500 text-sm mt-1">Pictorial representation of major issues, complaint volume, and customer tone analysis</p>
      </div>

      {/* Top Issues Bar Chart - Major Feature */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Major Issues — Complaint Count</h3>
              <p className="text-xs text-gray-500">Bar graph showing top complaint categories by volume</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topIssues} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis type="category" dataKey="issue" axisLine={false} tickLine={false} tick={{ fill: '#e2e8f0', fontSize: 12 }} width={160} />
            <Tooltip
              contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '13px' }}
              cursor={{ fill: 'rgba(99,102,241,0.05)' }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="url(#barGradient)">
              {topIssues.map((_, index) => (
                <Cell key={index} fill={index < 3 ? '#6366f1' : index < 5 ? '#8b5cf6' : '#a78bfa'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Issue Trends Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-900/20">
                <th className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-gray-500">Rank</th>
                <th className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-gray-500">Issue</th>
                <th className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-gray-500">Count</th>
                <th className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-gray-500">Trend</th>
                <th className="text-left py-2 px-3 text-[11px] uppercase tracking-wider text-gray-500">Change</th>
              </tr>
            </thead>
            <tbody>
              {topIssues.map((issue, i) => (
                <tr key={i} className="border-b border-indigo-900/10">
                  <td className="py-2.5 px-3 text-sm font-bold text-indigo-400">#{i + 1}</td>
                  <td className="py-2.5 px-3 text-sm text-gray-300">{issue.issue}</td>
                  <td className="py-2.5 px-3 text-sm text-white font-semibold">{issue.count}</td>
                  <td className="py-2.5 px-3">
                    {issue.trend === 'up' && <TrendingUp size={16} className="text-red-400" />}
                    {issue.trend === 'down' && <TrendingDown size={16} className="text-green-400" />}
                    {issue.trend === 'same' && <Minus size={16} className="text-gray-500" />}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-medium ${
                      issue.change > 0 ? 'text-red-400' : issue.change < 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {issue.change > 0 ? '+' : ''}{issue.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tone Analysis - Major Feature */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center">
              <Megaphone size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Customer Tone Analysis</h3>
              <p className="text-xs text-gray-500">Distribution of customer emotional tone across all complaints</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={toneAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="tone" axisLine={false} tickLine={false} tick={{ fill: '#e2e8f0', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '13px' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {toneAnalysis.map((_, index) => (
                  <Cell key={index} fill={toneColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {toneAnalysis.map((tone, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-400">{tone.tone}</div>
                <div className="flex-1 h-8 bg-white/[0.03] rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                    style={{ width: `${tone.percentage * 2.5}%`, backgroundColor: toneColors[i] + '40' }}
                  >
                    <span className="text-xs font-bold text-white">{tone.count}</span>
                  </div>
                </div>
                <div className="w-14 text-right text-sm font-semibold text-white">{tone.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <PieChartIcon size={18} className="text-indigo-400" />
            <h3 className="font-semibold text-white">Complaints by Category</h3>
          </div>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {categoryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5">
              {categoryDistribution.map((cat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-gray-400 w-28">{cat.name}</span>
                  <span className="text-sm font-semibold text-white">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <Activity size={18} className="text-indigo-400" />
            <h3 className="font-semibold text-white">Sentiment Distribution</h3>
          </div>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {sentimentData.map((_, i) => (
                    <Cell key={i} fill={sentimentColors[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5">
              {sentimentData.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sentimentColors[i] }} />
                  <span className="text-sm text-gray-400 w-28">{s.name}</span>
                  <span className="text-sm font-semibold text-white">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trend & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-white mb-5">Monthly Trend — Complaints vs Resolved</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              <Line type="monotone" dataKey="complaints" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 5 }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-white mb-5">Category Radar — Complaint Hotspots</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(99,102,241,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
              <Radar name="Complaints" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Histogram */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-white mb-5">Complaint Volume by Channel — Histogram</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#e2e8f0', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {channelData.map((_, index) => (
                <Cell key={index} fill={`hsl(${230 + index * 20}, 70%, ${55 + index * 5}%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Severity Stats */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-white mb-5">Severity Distribution — Bar Graph</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={severityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#e2e8f0', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {severityData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
