import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative w-full max-w-md px-6 animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 mb-5 shadow-2xl shadow-indigo-500/30 animate-pulse-glow">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Complai.nt
          </h1>
          <p className="text-gray-500 text-sm">Unified Customer Complaint Communication Dashboard</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium">Powered by Gen-AI</span>
            <Sparkles size={14} className="text-indigo-400" />
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8 gradient-border">
          <h2 className="text-xl font-bold text-white mb-1">Employee Login</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to access the complaint management dashboard</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@complaint.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-indigo-900/30 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/[0.04] border border-indigo-900/30 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-indigo-600" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-indigo-900/30">
            <p className="text-center text-xs text-gray-600">
              Demo credentials: any email & password
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © 2025 Complai.nt — Secure Employee Portal v2.1
        </p>
      </div>
    </div>
  );
}
