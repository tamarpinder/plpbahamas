import React, { useState } from 'react';
import { 
  Filter, 
  X, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  Save,
  RotateCcw
} from 'lucide-react';

export function FilterPanel({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  onClearFilters,
  filterConfig = {},
  activeFilters = {}
}) {
  const [filters, setFilters] = useState(activeFilters);
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Active Supporters', filters: { status: 'active', engagement: 'high' } },
    { id: 2, name: 'Recent Donors', filters: { donated: true, dateRange: '30d' } },
    { id: 3, name: 'Event Attendees', filters: { attended: true, location: 'Nassau' } }
  ]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const clearAllFilters = () => {
    setFilters({});
    onClearFilters();
  };

  const loadSavedFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
  };

  const saveCurrentFilter = () => {
    const name = prompt('Enter filter name:');
    if (name) {
      setSavedFilters(prev => [
        ...prev,
        { id: Date.now(), name, filters: { ...filters } }
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Advanced Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Saved Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Filters</h3>
            <div className="space-y-2">
              {savedFilters.map((savedFilter) => (
                <button
                  key={savedFilter.id}
                  onClick={() => loadSavedFilter(savedFilter)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">{savedFilter.name}</span>
                  <span className="text-xs text-gray-500">
                    {Object.keys(savedFilter.filters).length} filters
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Options */}
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder="Search by name, email, or ID..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange || ''}
                onChange={(e) => updateFilter('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location || ''}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="Nassau">Nassau</option>
                <option value="Grand Bahama">Grand Bahama</option>
                <option value="Abaco">Abaco</option>
                <option value="Eleuthera">Eleuthera</option>
                <option value="Exuma">Exuma</option>
                <option value="Other">Other Islands</option>
              </select>
            </div>

            {/* Engagement Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Engagement Level
              </label>
              <select
                value={filters.engagement || ''}
                onChange={(e) => updateFilter('engagement', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-y-2">
                {['Youth', 'Senior', 'Volunteer', 'Donor', 'VIP', 'Media'].map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.tags?.includes(tag) || false}
                      onChange={(e) => {
                        const currentTags = filters.tags || [];
                        if (e.target.checked) {
                          updateFilter('tags', [...currentTags, tag]);
                        } else {
                          updateFilter('tags', currentTags.filter(t => t !== tag));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Donation Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.donated || false}
                    onChange={(e) => updateFilter('donated', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has donated</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.recurring || false}
                    onChange={(e) => updateFilter('recurring', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Recurring donor</span>
                </label>
              </div>
            </div>

            {/* Event Attendance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Attendance
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.attended || false}
                    onChange={(e) => updateFilter('attended', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has attended events</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.volunteer || false}
                    onChange={(e) => updateFilter('volunteer', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Volunteer</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button
              onClick={saveCurrentFilter}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Save size={16} />
              Save Filter
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <RotateCcw size={16} />
                Clear All
              </button>
              
              <button
                onClick={applyFilters}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Filter size={16} />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {Object.keys(filters).length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Active Filters</h4>
              <div className="space-y-1">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || (Array.isArray(value) && value.length === 0)) return null;
                  return (
                    <div key={key} className="text-sm text-blue-700">
                      <span className="font-medium capitalize">{key}: </span>
                      <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}