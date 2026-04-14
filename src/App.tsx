import { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { PageType } from './types';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ComplaintsPage from './pages/ComplaintsPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import EscalationsPage from './pages/EscalationsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setSelectedComplaintId(null);
  };

  const handleSelectComplaint = (id: string) => {
    setSelectedComplaintId(id);
    setCurrentPage('complaint-detail');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setSelectedComplaintId(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    if (currentPage === 'complaint-detail' && selectedComplaintId) {
      return (
        <ComplaintDetailPage
          complaintId={selectedComplaintId}
          onBack={() => handleNavigate('complaints')}
          onSelectComplaint={handleSelectComplaint}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onSelectComplaint={handleSelectComplaint} />;
      case 'complaints':
        return <ComplaintsPage onSelectComplaint={handleSelectComplaint} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'ai-insights':
        return <AIInsightsPage />;
      case 'escalations':
        return <EscalationsPage onSelectComplaint={handleSelectComplaint} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} onSelectComplaint={handleSelectComplaint} />;
    }
  };

  const pageTitle: Record<string, string> = {
    dashboard: 'Dashboard',
    complaints: 'Complaints',
    'complaint-detail': 'Complaint Details',
    analytics: 'Analytics',
    'ai-insights': 'AI Insights',
    escalations: 'Escalations',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[68px]' : 'ml-[250px]'}`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0f1117]/80 backdrop-blur-xl border-b border-indigo-900/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-white">{pageTitle[currentPage] || 'Dashboard'}</h2>
            <span className="text-xs text-gray-600">/</span>
            <span className="text-xs text-gray-500">Complai.nt</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search complaints, customers..."
                className="w-64 pl-9 pr-4 py-2 bg-white/[0.04] border border-indigo-900/20 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/40 placeholder-gray-600"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg bg-white/[0.04] border border-indigo-900/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/30 transition-all">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                5
              </span>
            </button>

            {/* User */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-indigo-900/20 hover:border-indigo-500/30 transition-all">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold">
                JR
              </div>
              <span className="text-sm text-gray-300 hidden xl:block">James R.</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderPage()}
        </main>
      </div>

      {/* AI Assistant Button */}
      <AIAssistant
        onNavigate={handleNavigate}
        onSelectComplaint={handleSelectComplaint}
      />
    </div>
  );
}
