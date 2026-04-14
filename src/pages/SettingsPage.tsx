import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Clock,
  Mail,
  Save,
  BrainCircuit,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'ai', label: 'AI Settings', icon: <BrainCircuit size={16} /> },
    { id: 'sla', label: 'SLA Rules', icon: <Clock size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your dashboard preferences and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="glass-card rounded-xl p-3">
          <div className="space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200 border border-transparent'
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 glass-card rounded-xl p-6">
          {activeSection === 'profile' && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-5">Profile Settings</h3>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  JR
                </div>
                <div>
                  <p className="text-white font-semibold">James Rodriguez</p>
                  <p className="text-sm text-gray-500">Senior Support Agent</p>
                  <button className="text-xs text-indigo-400 mt-1 hover:text-indigo-300">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', value: 'James Rodriguez' },
                  { label: 'Email', value: 'j.rodriguez@complaint.com' },
                  { label: 'Department', value: 'Billing Support' },
                  { label: 'Role', value: 'Senior Agent' },
                  { label: 'Employee ID', value: 'EMP-2847' },
                  { label: 'Phone', value: '+1-555-0142' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-sm text-gray-400 mb-1.5 block">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-indigo-900/30 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <button className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'New complaint assigned', desc: 'Get notified when a new complaint is assigned to you', on: true },
                  { label: 'SLA warnings', desc: 'Alert when SLA deadline is approaching', on: true },
                  { label: 'SLA breaches', desc: 'Immediate notification on SLA breach', on: true },
                  { label: 'Escalation updates', desc: 'When a complaint is escalated', on: true },
                  { label: 'AI insights', desc: 'Weekly AI-generated insights digest', on: false },
                  { label: 'Customer responses', desc: 'When a customer responds to a complaint', on: true },
                  { label: 'Regulatory alerts', desc: 'Compliance-related notifications', on: true },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-white font-medium">{notif.label}</p>
                        <p className="text-xs text-gray-500">{notif.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notif.on} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-5">AI Configuration</h3>
              <div className="space-y-4">
                {[
                  { label: 'Auto-categorization', desc: 'Automatically categorize incoming complaints using NLP', on: true },
                  { label: 'Sentiment analysis', desc: 'Analyze customer sentiment in real-time', on: true },
                  { label: 'Draft response generation', desc: 'Generate AI draft responses for agent review', on: true },
                  { label: 'Duplicate detection', desc: 'Identify and link related/duplicate complaints', on: true },
                  { label: 'Root cause analysis', desc: 'AI-powered root cause identification', on: true },
                  { label: 'Predictive analytics', desc: 'Forecast complaint volumes and trends', on: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <BrainCircuit size={16} className="text-indigo-400" />
                      <div>
                        <p className="text-sm text-white font-medium">{setting.label}</p>
                        <p className="text-xs text-gray-500">{setting.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={setting.on} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeSection === 'sla' || activeSection === 'security' || activeSection === 'appearance') && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-5">{sections.find(s => s.id === activeSection)?.label} Settings</h3>
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center mx-auto mb-4">
                  {sections.find(s => s.id === activeSection)?.icon}
                </div>
                <p className="text-gray-400">Configuration options for {activeSection} coming soon.</p>
                <p className="text-xs text-gray-600 mt-1">This feature is under development.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
