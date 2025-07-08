import React from 'react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure system preferences and administrative options.
        </p>
      </div>
      
      <div className="admin-card p-8 text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Settings Panel Coming Soon</h2>
        <p className="text-gray-600">
          This section will include system configuration, user permissions, and integration settings.
        </p>
      </div>
    </div>
  );
}