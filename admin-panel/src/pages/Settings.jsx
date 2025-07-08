import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Database, 
  Key, 
  Mail, 
  Smartphone, 
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Settings as SettingsIcon,
  Users,
  Lock,
  Monitor,
  Download,
  Upload,
  RefreshCw,
  Zap,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react';

function SettingCard({ icon: Icon, title, description, children, badge }) {
  return (
    <div className="admin-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {badge && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ToggleSwitch({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function UserRoleCard({ user, onEdit, onDelete }) {
  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-100 text-red-800';
      case 'Admin': return 'bg-blue-100 text-blue-800';
      case 'Manager': return 'bg-purple-100 text-purple-800';
      case 'Editor': return 'bg-green-100 text-green-800';
      case 'Viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
          {user.role}
        </span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(user)}
            className="p-1 text-gray-400 hover:text-blue-600 rounded"
          >
            <Edit size={14} />
          </button>
          <button 
            onClick={() => onDelete(user)}
            className="p-1 text-gray-400 hover:text-red-600 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    organizationName: 'Progressive Liberal Party',
    timezone: 'America/Nassau',
    dateFormat: 'MM/DD/YYYY',
    currency: 'BSD',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    
    // Security
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginHistory: true,
    
    // Integrations
    facebookIntegration: true,
    twitterIntegration: false,
    instagramIntegration: true,
    emailService: 'mailchimp',
    
    // Appearance
    darkMode: false,
    compactMode: false,
    primaryColor: '#0066CC'
  });

  const [users] = useState([
    { id: 1, name: 'Philip Davis', email: 'p.davis@plp.bs', role: 'Super Admin', lastLogin: '2024-01-08' },
    { id: 2, name: 'Chester Cooper', email: 'c.cooper@plp.bs', role: 'Admin', lastLogin: '2024-01-08' },
    { id: 3, name: 'Sarah Johnson', email: 's.johnson@plp.bs', role: 'Manager', lastLogin: '2024-01-07' },
    { id: 4, name: 'Marcus Williams', email: 'm.williams@plp.bs', role: 'Editor', lastLogin: '2024-01-06' },
    { id: 5, name: 'Lisa Thompson', email: 'l.thompson@plp.bs', role: 'Viewer', lastLogin: '2024-01-05' }
  ]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'users', name: 'Users & Roles', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'data', name: 'Data & Backup', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure system preferences, user permissions, and administrative options.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={SettingsIcon}
              title="Organization Settings"
              description="Basic information about your organization"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={settings.organizationName}
                    onChange={(e) => updateSetting('organizationName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => updateSetting('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="America/Nassau">Nassau (EST)</option>
                    <option value="America/New_York">New York (EST)</option>
                    <option value="America/Toronto">Toronto (EST)</option>
                  </select>
                </div>
              </div>
            </SettingCard>

            <SettingCard
              icon={Monitor}
              title="Display Preferences"
              description="Customize how data is displayed"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => updateSetting('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => updateSetting('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="BSD">Bahamian Dollar (BSD)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                </div>
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <SettingCard
              icon={Users}
              title="Team Members"
              description="Manage user accounts and permissions"
              badge={`${users.length} users`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Current Team Members</h4>
                    <p className="text-sm text-gray-500">Manage roles and permissions for each team member</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={16} />
                    Add User
                  </button>
                </div>
                <div className="space-y-3">
                  {users.map((user) => (
                    <UserRoleCard
                      key={user.id}
                      user={user}
                      onEdit={(user) => console.log('Edit user:', user)}
                      onDelete={(user) => console.log('Delete user:', user)}
                    />
                  ))}
                </div>
              </div>
            </SettingCard>

            <SettingCard
              icon={Lock}
              title="Role Permissions"
              description="Configure what each role can access"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Permission</th>
                      <th className="text-center py-3 px-2">Viewer</th>
                      <th className="text-center py-3 px-2">Editor</th>
                      <th className="text-center py-3 px-2">Manager</th>
                      <th className="text-center py-3 px-2">Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'View Dashboard', viewer: true, editor: true, manager: true, admin: true },
                      { name: 'Manage Content', viewer: false, editor: true, manager: true, admin: true },
                      { name: 'Manage Users', viewer: false, editor: false, manager: true, admin: true },
                      { name: 'View Analytics', viewer: false, editor: true, manager: true, admin: true },
                      { name: 'System Settings', viewer: false, editor: false, manager: false, admin: true }
                    ].map((permission) => (
                      <tr key={permission.name}>
                        <td className="py-3 px-4 font-medium text-gray-900">{permission.name}</td>
                        <td className="text-center py-3 px-2">
                          {permission.viewer ? <CheckCircle2 size={16} className="text-green-600 mx-auto" /> : '—'}
                        </td>
                        <td className="text-center py-3 px-2">
                          {permission.editor ? <CheckCircle2 size={16} className="text-green-600 mx-auto" /> : '—'}
                        </td>
                        <td className="text-center py-3 px-2">
                          {permission.manager ? <CheckCircle2 size={16} className="text-green-600 mx-auto" /> : '—'}
                        </td>
                        <td className="text-center py-3 px-2">
                          {permission.admin ? <CheckCircle2 size={16} className="text-green-600 mx-auto" /> : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={Shield}
              title="Authentication"
              description="Security settings for user accounts"
            >
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.twoFactorAuth}
                  onChange={(value) => updateSetting('twoFactorAuth', value)}
                  label="Two-Factor Authentication"
                  description="Require 2FA for all admin accounts"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => updateSetting('passwordExpiry', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </SettingCard>

            <SettingCard
              icon={Key}
              title="API & Access"
              description="Manage API keys and external access"
            >
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.loginHistory}
                  onChange={(value) => updateSetting('loginHistory', value)}
                  label="Login History Tracking"
                  description="Keep logs of all login attempts"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sk_live_1234567890abcdef"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={Bell}
              title="Notification Preferences"
              description="Configure how you receive alerts"
            >
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.emailNotifications}
                  onChange={(value) => updateSetting('emailNotifications', value)}
                  label="Email Notifications"
                  description="Receive notifications via email"
                />
                <ToggleSwitch
                  enabled={settings.pushNotifications}
                  onChange={(value) => updateSetting('pushNotifications', value)}
                  label="Push Notifications"
                  description="Browser push notifications"
                />
                <ToggleSwitch
                  enabled={settings.smsNotifications}
                  onChange={(value) => updateSetting('smsNotifications', value)}
                  label="SMS Notifications"
                  description="Critical alerts via SMS"
                />
                <ToggleSwitch
                  enabled={settings.weeklyReports}
                  onChange={(value) => updateSetting('weeklyReports', value)}
                  label="Weekly Reports"
                  description="Automated weekly summaries"
                />
              </div>
            </SettingCard>

            <SettingCard
              icon={Mail}
              title="Email Templates"
              description="Customize notification templates"
            >
              <div className="space-y-3">
                {[
                  { name: 'Welcome Email', status: 'Active' },
                  { name: 'Event Reminder', status: 'Active' },
                  { name: 'Donation Receipt', status: 'Active' },
                  { name: 'Newsletter Template', status: 'Draft' }
                ].map((template) => (
                  <div key={template.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-sm text-gray-500">Status: {template.status}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={Globe}
              title="Social Media"
              description="Connect your social media accounts"
            >
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.facebookIntegration}
                  onChange={(value) => updateSetting('facebookIntegration', value)}
                  label="Facebook"
                  description="Post updates automatically"
                />
                <ToggleSwitch
                  enabled={settings.twitterIntegration}
                  onChange={(value) => updateSetting('twitterIntegration', value)}
                  label="Twitter/X"
                  description="Share content on Twitter"
                />
                <ToggleSwitch
                  enabled={settings.instagramIntegration}
                  onChange={(value) => updateSetting('instagramIntegration', value)}
                  label="Instagram"
                  description="Cross-post to Instagram"
                />
              </div>
            </SettingCard>

            <SettingCard
              icon={Zap}
              title="Third-party Services"
              description="External service integrations"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Service Provider
                  </label>
                  <select
                    value={settings.emailService}
                    onChange={(e) => updateSetting('emailService', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="mailchimp">Mailchimp</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="constant-contact">Constant Contact</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Payment Gateway', status: 'Connected', color: 'green' },
                    { name: 'SMS Service', status: 'Disconnected', color: 'red' },
                    { name: 'Analytics Tracking', status: 'Connected', color: 'green' }
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${service.color}-500`}></div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                      </div>
                      <span className={`text-sm text-${service.color}-600`}>
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={Palette}
              title="Theme Settings"
              description="Customize the look and feel"
            >
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.darkMode}
                  onChange={(value) => updateSetting('darkMode', value)}
                  label="Dark Mode"
                  description="Use dark theme interface"
                />
                <ToggleSwitch
                  enabled={settings.compactMode}
                  onChange={(value) => updateSetting('compactMode', value)}
                  label="Compact Mode"
                  description="Reduce spacing for more content"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => updateSetting('primaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => updateSetting('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </SettingCard>

            <SettingCard
              icon={Monitor}
              title="Dashboard Layout"
              description="Customize your dashboard view"
            >
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Widget Preferences</p>
                {[
                  { name: 'Recent Activity', enabled: true },
                  { name: 'Quick Stats', enabled: true },
                  { name: 'Upcoming Events', enabled: true },
                  { name: 'Top Content', enabled: false },
                  { name: 'Live Notifications', enabled: true }
                ].map((widget) => (
                  <div key={widget.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{widget.name}</span>
                    <input
                      type="checkbox"
                      checked={widget.enabled}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </SettingCard>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingCard
              icon={Database}
              title="Data Management"
              description="Import, export, and backup data"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    <Download size={16} />
                    Export Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    <Upload size={16} />
                    Import Data
                  </button>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Last Backup</p>
                      <p className="text-sm text-yellow-700">January 7, 2024 at 2:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </SettingCard>

            <SettingCard
              icon={BarChart3}
              title="Analytics & Reports"
              description="Data retention and reporting settings"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention Period
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="5">5 Years</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Auto-generated Reports</p>
                  {[
                    { name: 'Monthly Summary', enabled: true },
                    { name: 'Quarterly Analytics', enabled: true },
                    { name: 'Annual Report', enabled: false }
                  ].map((report) => (
                    <div key={report.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{report.name}</span>
                      <input
                        type="checkbox"
                        checked={report.enabled}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SettingCard>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}