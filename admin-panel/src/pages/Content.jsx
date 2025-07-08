import React from 'react';

export function Content() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Content</h1>
        <p className="text-gray-600 mt-2">
          Manage news articles, media assets, and content publication.
        </p>
      </div>
      
      <div className="admin-card p-8 text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Content Management Coming Soon</h2>
        <p className="text-gray-600">
          This section will include article editing, media library, and content analytics.
        </p>
      </div>
    </div>
  );
}