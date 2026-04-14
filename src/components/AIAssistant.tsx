import { useState } from 'react';
import {
  BrainCircuit,
  X,
  Send,
  Sparkles,
  LayoutDashboard,
  MessageSquareWarning,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { PageType } from '../types';

interface AIAssistantProps {
  onNavigate: (page: PageType) => void;
  onSelectComplaint: (id: string) => void;
}

const quickActions = [
  { icon: <LayoutDashboard size={16} />, label: 'Go to Dashboard', page: 'dashboard' as PageType },
  { icon: <MessageSquareWarning size={16} />, label: 'View Complaints', page: 'complaints' as PageType },
  { icon: <BarChart3 size={16} />, label: 'See Analytics', page: 'analytics' as PageType },
  { icon: <AlertTriangle size={16} />, label: 'Check Escalations', page: 'escalations' as PageType },
  { icon: <BrainCircuit size={16} />, label: 'AI Insights', page: 'ai-insights' as PageType },
];

const aiSuggestions = [
  { text: '🔴 3 SLA breaches need immediate attention', action: 'escalations' as PageType },
  { text: '📈 Billing complaints up 12% this week', action: 'analytics' as PageType },
  { text: '🔒 2 GDPR-flagged complaints require review', action: 'complaints' as PageType },
  { text: '⚡ iOS app crash complaints trending — root cause identified', action: 'ai-insights' as PageType },
];

export default function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I\'m your AI assistant. I can help you navigate the dashboard, find complaints, analyze trends, or suggest actions. What would you like to do?' },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');

    setTimeout(() => {
      let response = '';
      const q = userMsg.toLowerCase();
      if (q.includes('escalat') || q.includes('urgent') || q.includes('critical')) {
        response = 'I found 12 escalated complaints. The most critical is CMP-002 (SmartHome Hub safety issue) and CMP-007 (GDPR data breach). Would you like me to navigate to the Escalations page?';
      } else if (q.includes('billing') || q.includes('refund')) {
        response = 'Billing complaints are up 12% this week, primarily driven by duplicate charges (342 cases). The root cause has been identified as a payment gateway timeout issue. I recommend reviewing the Analytics page for the full trend analysis.';
      } else if (q.includes('trend') || q.includes('analytic')) {
        response = 'Key trends this month: 1) iOS app crashes increased 34%, 2) Billing overcharges up 12%, 3) Staff behavior complaints down 12%. Overall CSAT is 4.2/5. Navigate to Analytics for detailed charts.';
      } else if (q.includes('suggest') || q.includes('action') || q.includes('recommend')) {
        response = 'Top recommended actions: 1) Address payment gateway timeout (287 complaints), 2) Release iOS hotfix (234 complaints), 3) Clear holiday refund backlog (198 complaints). These would resolve 25% of all open complaints.';
      } else {
        response = 'I can help you with: navigating the dashboard, finding specific complaints, analyzing trends, checking SLA status, or suggesting next-best actions. What would you like to explore?';
      }
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 800);
  };

  return (
    <>
      {/* AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/30 hover:scale-110 transition-transform animate-pulse-glow"
        title="AI Assistant"
      >
        {isOpen ? <X size={24} /> : <BrainCircuit size={24} />}
      </button>

      {/* AI Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[600px] bg-[#1a1b2e] border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-900/40 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-indigo-500/20 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">AI Navigation Assistant</h3>
                <p className="text-xs text-indigo-300">Powered by Gen-AI</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="px-4 py-3 border-b border-indigo-900/30">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Quick Navigate</p>
            <div className="flex flex-wrap gap-1.5">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => { onNavigate(action.page); setIsOpen(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-xs hover:bg-indigo-600/20 transition-colors"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Alerts */}
          <div className="px-4 py-3 border-b border-indigo-900/30">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 flex items-center gap-1">
              <Lightbulb size={12} /> AI Suggestions
            </p>
            <div className="space-y-1.5">
              {aiSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { onNavigate(s.action); setIsOpen(false); }}
                  className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-xs text-gray-300 transition-colors group"
                >
                  <span>{s.text}</span>
                  <ArrowRight size={14} className="text-gray-600 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[120px] max-h-[200px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white/[0.06] text-gray-300 rounded-bl-md border border-indigo-900/20'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-indigo-900/30 px-4 py-3">
            <div className="flex items-center gap-2 bg-white/[0.05] border border-indigo-900/30 rounded-xl px-3 py-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AI anything..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
