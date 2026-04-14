import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Mail,
  Phone,
  MessageCircle,
  Twitter,
  Globe,
  Users,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Link2,
} from 'lucide-react';
import { complaints } from '../data/mockData';

interface ComplaintsPageProps {
  onSelectComplaint: (id: string) => void;
}

const channelIcons: Record<string, React.ReactNode> = {
  'Email': <Mail size={14} />,
  'Phone': <Phone size={14} />,
  'Chat': <MessageCircle size={14} />,
  'Social Media': <Twitter size={14} />,
  'Web Portal': <Globe size={14} />,
  'In-Person': <Users size={14} />,
};

export default function ComplaintsPage({ onSelectComplaint }: ComplaintsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch = !searchQuery ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchSeverity = severityFilter === 'All' || c.severity === severityFilter;
      const matchCategory = categoryFilter === 'All' || c.category === categoryFilter;
      return matchSearch && matchStatus && matchSeverity && matchCategory;
    });
  }, [searchQuery, statusFilter, severityFilter, categoryFilter]);

  const categories = ['All', ...new Set(complaints.map(c => c.category))];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Complaints</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all customer complaints across channels</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-600/15 text-indigo-400 font-medium">{filtered.length} results</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, customer, subject, or keyword..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-indigo-900/30 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-gray-600"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters ? 'border-indigo-500 bg-indigo-600/15 text-indigo-300' : 'border-indigo-900/30 text-gray-400 hover:text-gray-200'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-600/25 transition-all">
            <Sparkles size={16} />
            AI Categorize
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-3 border-t border-indigo-900/20 animate-fade-in">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/[0.04] border border-indigo-900/30 text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
              >
                {['All', 'New', 'In Progress', 'Escalated', 'Resolved', 'Closed'].map(s => (
                  <option key={s} value={s} className="bg-[#1e1f2e]">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/[0.04] border border-indigo-900/30 text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
              >
                {['All', 'Critical', 'High', 'Medium', 'Low'].map(s => (
                  <option key={s} value={s} className="bg-[#1e1f2e]">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/[0.04] border border-indigo-900/30 text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
              >
                {categories.map(s => (
                  <option key={s} value={s} className="bg-[#1e1f2e]">{s}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => { setStatusFilter('All'); setSeverityFilter('All'); setCategoryFilter('All'); setSearchQuery(''); }}
              className="self-end px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Complaints Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-900/30">
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">ID</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Customer</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Subject</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Channel</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Category</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Severity</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Sentiment</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Status</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">SLA</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectComplaint(c.id)}
                  className="border-b border-indigo-900/10 hover:bg-indigo-600/[0.05] cursor-pointer transition-colors group"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono text-indigo-400 font-medium">{c.id}</span>
                    {c.relatedComplaints.length > 0 && (
                      <span className="ml-1.5 inline-flex items-center" title={`Related: ${c.relatedComplaints.join(', ')}`}>
                        <Link2 size={10} className="text-purple-400" />
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm text-gray-200 font-medium">{c.customerName}</p>
                      <p className="text-[11px] text-gray-500">{c.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-gray-300 max-w-[250px] truncate">{c.subject}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      {channelIcons[c.channel]}
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-1 rounded-md bg-white/[0.05] text-gray-300">{c.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      c.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      c.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      c.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {c.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        c.sentimentScore < -0.7 ? 'bg-red-500' :
                        c.sentimentScore < -0.3 ? 'bg-orange-500' :
                        c.sentimentScore < 0.3 ? 'bg-gray-500' :
                        'bg-green-500'
                      }`} />
                      <span className="text-xs text-gray-400">{c.sentiment}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      c.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                      c.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400' :
                      c.status === 'Escalated' ? 'bg-red-500/20 text-red-400' :
                      c.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                      c.slaStatus === 'On Track' ? 'bg-green-500/15 text-green-400' :
                      c.slaStatus === 'At Risk' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-red-500/15 text-red-400'
                    }`}>
                      {c.slaStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ArrowUpRight size={16} className="text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Filter size={40} className="mx-auto text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No complaints match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
