import {
  AlertTriangle,
  Clock,
  Shield,
  ChevronRight,
  ArrowUpRight,
  User,
  Zap,
} from 'lucide-react';
import { complaints } from '../data/mockData';

interface EscalationsPageProps {
  onSelectComplaint: (id: string) => void;
}

export default function EscalationsPage({ onSelectComplaint }: EscalationsPageProps) {
  const escalated = complaints.filter(c => c.status === 'Escalated' || c.slaStatus === 'Breached' || c.escalationLevel > 0);
  const slaBreached = complaints.filter(c => c.slaStatus === 'Breached');
  const regulatory = complaints.filter(c => c.regulatoryFlag);
  const critical = complaints.filter(c => c.severity === 'Critical');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Escalation Management</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor escalated complaints, SLA breaches, and regulatory flags</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Escalated', value: escalated.length, icon: <AlertTriangle size={20} />, color: 'from-red-600 to-red-700' },
          { label: 'SLA Breached', value: slaBreached.length, icon: <Clock size={20} />, color: 'from-orange-600 to-orange-700' },
          { label: 'Regulatory Flagged', value: regulatory.length, icon: <Shield size={20} />, color: 'from-purple-600 to-purple-700' },
          { label: 'Critical Severity', value: critical.length, icon: <Zap size={20} />, color: 'from-red-600 to-pink-700' },
        ].map((card, i) => (
          <div key={i} className="glass-card rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* SLA Breached */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-red-400" />
          <h3 className="font-semibold text-white">SLA Breached — Immediate Attention Required</h3>
          <span className="ml-auto text-xs bg-red-500/15 text-red-400 px-3 py-1 rounded-full font-medium">{slaBreached.length} breaches</span>
        </div>
        <div className="space-y-3">
          {slaBreached.map(c => (
            <button
              key={c.id}
              onClick={() => onSelectComplaint(c.id)}
              className="w-full text-left p-4 rounded-xl bg-red-500/[0.05] border border-red-500/15 hover:border-red-500/30 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-red-400 font-medium">{c.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    c.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>{c.severity}</span>
                  {c.regulatoryFlag && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-medium flex items-center gap-0.5">
                      <Shield size={8} /> Regulatory
                    </span>
                  )}
                </div>
                <p className="text-sm text-white truncate">{c.subject}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <User size={10} className="inline mr-1" />{c.customerName} • {c.assignedTeam} • Escalation Level {c.escalationLevel}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-red-400 font-medium">SLA Breached</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Deadline: {new Date(c.slaDeadline).toLocaleString()}</p>
              </div>
              <ChevronRight size={18} className="text-gray-600 group-hover:text-red-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Regulatory Flagged */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-purple-400" />
          <h3 className="font-semibold text-white">Regulatory Compliance Flags</h3>
          <span className="ml-auto text-xs bg-purple-500/15 text-purple-400 px-3 py-1 rounded-full font-medium">{regulatory.length} flagged</span>
        </div>
        <div className="space-y-3">
          {regulatory.map(c => (
            <button
              key={c.id}
              onClick={() => onSelectComplaint(c.id)}
              className="w-full text-left p-4 rounded-xl bg-purple-500/[0.05] border border-purple-500/15 hover:border-purple-500/30 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-purple-400 font-medium">{c.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-gray-400 font-medium">{c.category}</span>
                </div>
                <p className="text-sm text-white truncate">{c.subject}</p>
                <p className="text-xs text-gray-500 mt-1">{c.customerName} • {c.assignedTeam}</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* All Escalated */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} className="text-orange-400" />
          <h3 className="font-semibold text-white">All Escalated Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-900/20">
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">ID</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">Customer</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">Subject</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">Level</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">SLA</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500">Team</th>
                <th className="text-left py-2.5 px-4 text-[11px] uppercase tracking-wider text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {escalated.map(c => (
                <tr
                  key={c.id}
                  onClick={() => onSelectComplaint(c.id)}
                  className="border-b border-indigo-900/10 hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-mono text-indigo-400">{c.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-300">{c.customerName}</td>
                  <td className="py-3 px-4 text-sm text-gray-300 max-w-[200px] truncate">{c.subject}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(l => (
                        <div key={l} className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold ${
                          l <= c.escalationLevel ? 'bg-red-500/20 text-red-400' : 'bg-white/[0.05] text-gray-700'
                        }`}>{l}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      c.slaStatus === 'On Track' ? 'bg-green-500/15 text-green-400' :
                      c.slaStatus === 'At Risk' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-red-500/15 text-red-400'
                    }`}>{c.slaStatus}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{c.assignedTeam}</td>
                  <td className="py-3 px-4"><ChevronRight size={14} className="text-gray-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
