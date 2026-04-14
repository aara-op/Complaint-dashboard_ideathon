import { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Send,
  Copy,
  Tag,
  Link2,
  Shield,
  MessageCircle,
  FileText,
  Zap,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import { complaints } from '../data/mockData';

interface ComplaintDetailPageProps {
  complaintId: string;
  onBack: () => void;
  onSelectComplaint: (id: string) => void;
}

export default function ComplaintDetailPage({ complaintId, onBack, onSelectComplaint }: ComplaintDetailPageProps) {
  const complaint = complaints.find(c => c.id === complaintId);
  const [activeTab, setActiveTab] = useState<'overview' | 'communications' | 'ai' | 'sla'>('overview');
  const [draftResponse, setDraftResponse] = useState('');
  const [showAiDraft, setShowAiDraft] = useState(false);

  if (!complaint) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Complaint not found</p>
      </div>
    );
  }

  const handleUseDraft = () => {
    setDraftResponse(complaint.aiSuggestedResponse);
    setShowAiDraft(false);
  };

  const tabs = [
    { id: 'overview', label: '360° Overview', icon: <User size={14} /> },
    { id: 'communications', label: 'Communications', icon: <MessageCircle size={14} /> },
    { id: 'ai', label: 'AI Analysis', icon: <Sparkles size={14} /> },
    { id: 'sla', label: 'SLA & Escalation', icon: <Shield size={14} /> },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-indigo-900/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-white">{complaint.id}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                complaint.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                complaint.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                complaint.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {complaint.severity}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                complaint.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                complaint.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400' :
                complaint.status === 'Escalated' ? 'bg-red-500/20 text-red-400' :
                complaint.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {complaint.status}
              </span>
              {complaint.regulatoryFlag && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-500/20 text-purple-400 flex items-center gap-1">
                  <Shield size={10} /> Regulatory
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{complaint.subject}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1 border border-indigo-900/20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in">
          {/* Customer Info */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><User size={16} className="text-indigo-400" /> Customer Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {complaint.customerName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{complaint.customerName}</p>
                  <p className="text-xs text-gray-500">{complaint.customerId}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail size={14} className="text-gray-600" />
                  {complaint.customerEmail}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone size={14} className="text-gray-600" />
                  {complaint.customerPhone}
                </div>
              </div>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="lg:col-span-2 glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><FileText size={16} className="text-indigo-400" /> Complaint Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Category</p>
                <p className="text-sm text-white">{complaint.category} &gt; {complaint.subcategory}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Product</p>
                <p className="text-sm text-white">{complaint.product}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Channel</p>
                <p className="text-sm text-white">{complaint.channel}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Sentiment</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    complaint.sentimentScore < -0.7 ? 'bg-red-500' :
                    complaint.sentimentScore < -0.3 ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`} />
                  <p className="text-sm text-white">{complaint.sentiment} ({complaint.sentimentScore})</p>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Description</p>
              <p className="text-sm text-gray-300 leading-relaxed">{complaint.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Key Issues (AI Extracted)</p>
              <div className="flex flex-wrap gap-2">
                {complaint.keyIssues.map((issue, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-1">
                    <Zap size={10} /> {issue}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 w-full">Tags</p>
              {complaint.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-white/[0.05] text-[11px] text-gray-400 flex items-center gap-1">
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
            {complaint.relatedComplaints.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 flex items-center gap-1">
                  <Link2 size={11} /> Related / Duplicate Complaints
                </p>
                <div className="flex gap-2">
                  {complaint.relatedComplaints.map((rc) => (
                    <button
                      key={rc}
                      onClick={() => onSelectComplaint(rc)}
                      className="px-3 py-1.5 rounded-lg bg-purple-600/10 border border-purple-500/20 text-xs text-purple-300 hover:bg-purple-600/20 transition-colors"
                    >
                      {rc} <ChevronRight size={12} className="inline" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'communications' && (
        <div className="space-y-5 animate-fade-in">
          {/* Communication History */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><MessageCircle size={16} className="text-indigo-400" /> Communication History</h3>
            <div className="space-y-4">
              {complaint.communications.map((com) => (
                <div
                  key={com.id}
                  className={`flex ${com.type === 'outbound' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl p-4 ${
                    com.type === 'outbound'
                      ? 'bg-indigo-600/15 border border-indigo-500/20 rounded-br-md'
                      : 'bg-white/[0.05] border border-white/[0.08] rounded-bl-md'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold ${com.type === 'outbound' ? 'text-indigo-400' : 'text-gray-300'}`}>
                        {com.from}
                      </span>
                      <span className="text-[10px] text-gray-600">via {com.channel}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{com.message}</p>
                    <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
                      <Clock size={10} /> {new Date(com.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draft Response */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2"><Edit3 size={16} className="text-indigo-400" /> Draft Response</h3>
              <button
                onClick={() => setShowAiDraft(!showAiDraft)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-xs text-indigo-300 font-medium hover:from-indigo-600/30 hover:to-purple-600/30 transition-all"
              >
                <Sparkles size={14} /> Generate AI Draft
              </button>
            </div>

            {showAiDraft && (
              <div className="mb-4 p-4 rounded-xl bg-indigo-600/[0.08] border border-indigo-500/20 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-300">AI Generated Draft</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">{complaint.aiSuggestedResponse}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUseDraft}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 transition-colors"
                  >
                    Use This Draft
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-gray-400 text-xs font-medium hover:text-white transition-colors flex items-center gap-1">
                    <Copy size={12} /> Copy
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={draftResponse}
              onChange={(e) => setDraftResponse(e.target.value)}
              placeholder="Type your response or use AI to generate a draft..."
              className="w-full h-32 bg-white/[0.04] border border-indigo-900/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-gray-600 resize-none"
            />
            <div className="flex items-center justify-end gap-2 mt-3">
              <button className="px-4 py-2 rounded-lg bg-white/[0.05] text-gray-400 text-sm font-medium hover:text-white transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
                <Send size={14} /> Send Response
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
          {/* AI Suggested Actions */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap size={16} className="text-amber-400" /> Suggested Next-Best Actions
            </h3>
            <div className="space-y-2">
              {complaint.aiSuggestedActions.map((action, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group">
                  <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-300 flex-1">{action}</span>
                  <button className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-md bg-indigo-600/20 text-indigo-400 text-[10px] font-medium transition-opacity">
                    Execute
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Root Cause */}
          <div className="space-y-5">
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-400" /> Root Cause Analysis
              </h3>
              <div className="p-4 rounded-lg bg-red-500/[0.06] border border-red-500/15">
                <p className="text-sm text-gray-300 leading-relaxed">{complaint.rootCause}</p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" /> AI Confidence Scores
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Category Accuracy', score: 97 },
                  { label: 'Sentiment Analysis', score: 92 },
                  { label: 'Root Cause Match', score: 85 },
                  { label: 'Response Quality', score: 89 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.score >= 90 ? 'bg-green-500' : item.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sla' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
          {/* SLA Tracking */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" /> SLA Tracking
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03]">
                <div>
                  <p className="text-xs text-gray-500">SLA Status</p>
                  <p className={`text-lg font-bold mt-0.5 ${
                    complaint.slaStatus === 'On Track' ? 'text-green-400' :
                    complaint.slaStatus === 'At Risk' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>{complaint.slaStatus}</p>
                </div>
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                  complaint.slaStatus === 'On Track' ? 'border-green-500/50' :
                  complaint.slaStatus === 'At Risk' ? 'border-yellow-500/50' :
                  'border-red-500/50'
                }`}>
                  {complaint.slaStatus === 'On Track' ? <CheckCircle2 size={20} className="text-green-400" /> :
                   complaint.slaStatus === 'Breached' ? <AlertTriangle size={20} className="text-red-400" /> :
                   <Clock size={20} className="text-yellow-400" />}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">Created</p>
                  <p className="text-sm text-white mt-1">{new Date(complaint.createdAt).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">SLA Deadline</p>
                  <p className="text-sm text-white mt-1">{new Date(complaint.slaDeadline).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">Last Updated</p>
                  <p className="text-sm text-white mt-1">{new Date(complaint.updatedAt).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">Assigned To</p>
                  <p className="text-sm text-white mt-1">{complaint.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Management */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" /> Escalation Management
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03]">
                <div>
                  <p className="text-xs text-gray-500">Escalation Level</p>
                  <p className="text-lg font-bold text-white mt-0.5">Level {complaint.escalationLevel}</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map(level => (
                    <div
                      key={level}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        level <= complaint.escalationLevel
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-white/[0.05] text-gray-600'
                      }`}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03]">
                <p className="text-[10px] uppercase text-gray-500 font-semibold">Assigned Team</p>
                <p className="text-sm text-white mt-1">{complaint.assignedTeam}</p>
              </div>
              {complaint.resolutionNotes && (
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">Resolution Notes</p>
                  <p className="text-sm text-gray-300 mt-1">{complaint.resolutionNotes}</p>
                </div>
              )}
              {complaint.regulatoryFlag && (
                <div className="p-4 rounded-lg bg-purple-500/[0.08] border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-purple-400" />
                    <span className="text-sm font-semibold text-purple-300">Regulatory Flag Active</span>
                  </div>
                  <p className="text-xs text-gray-400">This complaint has been flagged for regulatory reporting. Compliance team has been notified.</p>
                </div>
              )}
              <button className="w-full py-2.5 rounded-lg bg-red-600/15 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-600/25 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle size={14} /> Escalate to Next Level
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
