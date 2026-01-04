import React, { useState } from 'react';
import { FaSave, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    adminName: 'Super Admin',
    adminEmail: 'admin@earthmovers.com',
    notifications: {
      emailNotifications: true,
      contactAlerts: true,
      systemAlerts: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30
    }
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Mock save - replace with API call
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const updateSetting = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FaUser className="mr-2" />
          Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Name
            </label>
            <input
              type="text"
              value={settings.adminName}
              onChange={(e) => setSettings(prev => ({ ...prev, adminName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FaEnvelope className="mr-2" />
          Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
              Email notifications for new contacts
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="contactAlerts"
              checked={settings.notifications.contactAlerts}
              onChange={(e) => updateSetting('notifications', 'contactAlerts', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="contactAlerts" className="ml-2 text-sm text-gray-700">
              Real-time alerts for new contact submissions
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="systemAlerts"
              checked={settings.notifications.systemAlerts}
              onChange={(e) => updateSetting('notifications', 'systemAlerts', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="systemAlerts" className="ml-2 text-sm text-gray-700">
              System maintenance and error alerts
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FaLock className="mr-2" />
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactorAuth"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-700">
              Enable two-factor authentication
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <FaSave />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;