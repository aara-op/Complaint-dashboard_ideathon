import {
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { rootCauses, topIssues, trendData } from '../data/mockData';

const predictionData = [
  { month: 'Feb', predicted: 410, confidence: 87 },
  { month: 'Mar', predicted: 385, confidence: 82 },
  { month: 'Apr', predicted: 360, confidence: 76 },
];

const automationStats = [
  { label: 'Auto-Categorized', value: '94.2%', description: 'Complaints automatically categorized by AI' },
  { label: 'Sentiment Accuracy', value: '92.7%', description: 'Correct sentiment classification rate' },
  { label: 'Draft Responses Used', value: '78.3%', description: 'AI drafts approved by agents with minor edits' },
  { label: 'Duplicate Detection', value: '89.1%', description: 'Related complaints correctly identified' },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <BrainCircuit size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Gen-AI Insights</h1>
          <p className="text-gray-500 text-sm mt-0.5">AI-powered trend analysis, root cause identification, and predictive insights</p>
        </div>
      </div>

      {/* AI Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {automationStats.map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-5 hover:border-indigo-500/30 transition-all">
            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.value}</p>
            <p className="text-sm font-semibold text-white mt-2">{stat.label}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Root Cause Analysis */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <Target size={20} className="text-red-400" />
          <h3 className="font-semibold text-white text-lg">Root Cause Identification</h3>
          <span className="ml-auto text-xs text-indigo-400 bg-indigo-600/15 px-3 py-1 rounded-full">AI Generated</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {rootCauses.map((rc, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-indigo-500/20 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    rc.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    rc.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    rc.impact === 'Critical' ? 'bg-red-500/15 text-red-400' :
                    rc.impact === 'High' ? 'bg-orange-500/15 text-orange-400' :
                    'bg-yellow-500/15 text-yellow-400'
                  }`}>
                    {rc.impact}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white/[0.05] px-2 py-0.5 rounded-md">{rc.category}</span>
              </div>
              <h4 className="font-medium text-white text-sm mb-1">{rc.cause}</h4>
              <p className="text-xs text-gray-500">Affecting <span className="text-indigo-400 font-semibold">{rc.complaints}</span> complaints</p>
              <button className="mt-3 text-xs text-indigo-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View affected complaints <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Analysis & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emerging Trends */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp size={20} className="text-cyan-400" />
            <h3 className="font-semibold text-white">Emerging Trends</h3>
          </div>
          <div className="space-y-3">
            {topIssues.filter(i => i.trend === 'up').map((issue, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border-l-2 border-red-500/50">
                <div className="flex items-center gap-3">
                  <TrendingUp size={16} className="text-red-400" />
                  <div>
                    <p className="text-sm text-white font-medium">{issue.issue}</p>
                    <p className="text-xs text-gray-500">{issue.count} complaints</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-red-400">+{issue.change}%</span>
              </div>
            ))}
            {topIssues.filter(i => i.trend === 'down').map((issue, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border-l-2 border-green-500/50">
                <div className="flex items-center gap-3">
                  <TrendingDown size={16} className="text-green-400" />
                  <div>
                    <p className="text-sm text-white font-medium">{issue.issue}</p>
                    <p className="text-xs text-gray-500">{issue.count} complaints</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-400">{issue.change}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Lightbulb size={20} className="text-amber-400" />
            <h3 className="font-semibold text-white">Predictive Forecast</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[...trendData.slice(-3), ...predictionData.map(p => ({ month: p.month, complaints: p.predicted, resolved: Math.round(p.predicted * 0.85) }))]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1e1f2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="complaints" radius={[6, 6, 0, 0]}>
                {[...trendData.slice(-3), ...predictionData].map((_, index) => (
                  <Cell key={index} fill={index >= 3 ? '#6366f180' : '#6366f1'} stroke={index >= 3 ? '#6366f1' : 'none'} strokeDasharray={index >= 3 ? '4 4' : '0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {predictionData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-white/[0.03]">
                <span className="text-gray-400">{p.month} 2025 (Predicted)</span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">~{p.predicted} complaints</span>
                  <span className="text-xs text-indigo-400">{p.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-indigo-600/[0.08] to-purple-600/[0.08] border-indigo-500/20">
        <div className="flex items-center gap-3 mb-5">
          <Zap size={20} className="text-amber-400" />
          <h3 className="font-semibold text-white text-lg">AI Recommended Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Fix Payment Gateway Timeout',
              impact: 'Would resolve ~287 complaints',
              priority: 'Critical',
              effort: 'Medium',
              icon: <AlertTriangle size={18} className="text-red-400" />,
            },
            {
              title: 'Release iOS Hotfix v3.2.1',
              impact: 'Would resolve ~234 complaints',
              priority: 'High',
              effort: 'Low',
              icon: <BarChart3 size={18} className="text-orange-400" />,
            },
            {
              title: 'Clear Holiday Refund Backlog',
              impact: 'Would resolve ~198 complaints',
              priority: 'High',
              effort: 'Low',
              icon: <CheckCircle2 size={18} className="text-green-400" />,
            },
          ].map((rec, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/30 transition-all">
              <div className="flex items-center gap-2 mb-3">{rec.icon} <span className="text-sm font-semibold text-white">{rec.title}</span></div>
              <p className="text-xs text-indigo-300 mb-3">{rec.impact}</p>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  rec.priority === 'Critical' ? 'bg-red-500/15 text-red-400' : 'bg-orange-500/15 text-orange-400'
                }`}>{rec.priority}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-gray-400 font-medium">Effort: {rec.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
