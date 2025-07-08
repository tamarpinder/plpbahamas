import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  User, 
  FileText, 
  Calendar, 
  Target, 
  Mail, 
  BarChart3,
  ArrowRight,
  Clock,
  Hash
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock search data - in real app this would come from API
const mockSearchData = [
  // Users
  { id: 'u1', type: 'user', title: 'Sarah Johnson', subtitle: 'Communications Manager', path: '/users', icon: User },
  { id: 'u2', type: 'user', title: 'Marcus Williams', subtitle: 'Youth Coordinator', path: '/users', icon: User },
  { id: 'u3', type: 'user', title: 'Lisa Thompson', subtitle: 'Environmental Advocate', path: '/users', icon: User },
  
  // Content
  { id: 'c1', type: 'content', title: 'Healthcare Initiative Launch', subtitle: 'Published article • 15.4k views', path: '/content', icon: FileText },
  { id: 'c2', type: 'content', title: 'Youth Rally Promotional Video', subtitle: 'Video content • 8.7k views', path: '/content', icon: FileText },
  { id: 'c3', type: 'content', title: 'Economic Development Strategy', subtitle: 'Draft document', path: '/content', icon: FileText },
  
  // Events
  { id: 'e1', type: 'event', title: 'Town Hall: Healthcare Initiative', subtitle: 'Jan 15, 2024 • Nassau Community Center', path: '/events', icon: Calendar },
  { id: 'e2', type: 'event', title: 'Youth Engagement Rally', subtitle: 'Jan 20, 2024 • Queen Elizabeth Sports Centre', path: '/events', icon: Calendar },
  { id: 'e3', type: 'event', title: 'Women\'s Empowerment Forum', subtitle: 'Jan 25, 2024 • Atlantis Resort', path: '/events', icon: Calendar },
  
  // Campaigns
  { id: 'ca1', type: 'campaign', title: 'Healthcare Reform Funding', subtitle: 'Active • $125,340 raised', path: '/campaigns', icon: Target },
  { id: 'ca2', type: 'campaign', title: 'Youth Education Initiative', subtitle: 'Active • $87,500 raised', path: '/campaigns', icon: Target },
  
  // Communications
  { id: 'co1', type: 'communication', title: 'Healthcare Initiative Announcement', subtitle: 'Email • 15,420 recipients', path: '/communications', icon: Mail },
  { id: 'co2', type: 'communication', title: 'Youth Rally Reminder', subtitle: 'SMS • 3,250 recipients', path: '/communications', icon: Mail },
  
  // Analytics/Reports
  { id: 'a1', type: 'analytics', title: 'Monthly Engagement Report', subtitle: 'December 2024 report', path: '/analytics', icon: BarChart3 },
  { id: 'a2', type: 'analytics', title: 'Campaign Performance Dashboard', subtitle: 'Real-time analytics', path: '/analytics', icon: BarChart3 }
];

function SearchResult({ result, onClick, isHighlighted }) {
  const Icon = result.icon;
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'user': return 'text-blue-600 bg-blue-100';
      case 'content': return 'text-green-600 bg-green-100';
      case 'event': return 'text-purple-600 bg-purple-100';
      case 'campaign': return 'text-yellow-600 bg-yellow-100';
      case 'communication': return 'text-orange-600 bg-orange-100';
      case 'analytics': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <button
      onClick={() => onClick(result)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
        isHighlighted ? 'bg-blue-50 border-l-2 border-blue-500' : ''
      }`}
    >
      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{result.title}</p>
        <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 capitalize">{result.type}</span>
        <ArrowRight size={14} className="text-gray-400" />
      </div>
    </button>
  );
}

function RecentSearches({ searches, onSelectSearch, onClearAll }) {
  if (searches.length === 0) return null;

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Recent searches</h3>
        <button 
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-1">
        {searches.slice(0, 5).map((search, index) => (
          <button
            key={index}
            onClick={() => onSelectSearch(search)}
            className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded w-full text-left"
          >
            <Clock size={14} />
            <span className="truncate">{search}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickActions({ onNavigate }) {
  const actions = [
    { label: 'New Event', path: '/events', icon: Calendar, color: 'text-purple-600' },
    { label: 'New Campaign', path: '/campaigns', icon: Target, color: 'text-yellow-600' },
    { label: 'New Content', path: '/content', icon: FileText, color: 'text-green-600' },
    { label: 'Send Message', path: '/communications', icon: Mail, color: 'text-orange-600' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Quick actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onNavigate(action.path)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon size={16} className={action.color} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([
    'healthcare initiative',
    'youth rally',
    'sarah johnson',
    'campaign analytics'
  ]);
  
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Filter search results based on query
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const filtered = mockSearchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    setHighlightedIndex(-1);
  }, [query]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && results[highlightedIndex]) {
            handleResultClick(results[highlightedIndex]);
          } else if (query.trim()) {
            // Save search and perform general search
            saveSearch(query);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, highlightedIndex, query, onClose]);

  const handleResultClick = (result) => {
    saveSearch(result.title);
    navigate(result.path);
    onClose();
    setQuery('');
  };

  const saveSearch = (searchTerm) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchTerm);
      return [searchTerm, ...filtered].slice(0, 10);
    });
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-4 border-b border-gray-200">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users, content, events, campaigns..."
              className="flex-1 text-lg placeholder-gray-400 border-none outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X size={16} />
              </button>
            )}
            <div className="ml-3 text-sm text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div>
                <RecentSearches 
                  searches={recentSearches}
                  onSelectSearch={handleRecentSearchClick}
                  onClearAll={clearRecentSearches}
                />
                <QuickActions onNavigate={(path) => {
                  navigate(path);
                  onClose();
                }} />
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-500">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                </div>
                <div>
                  {results.map((result, index) => (
                    <SearchResult
                      key={result.id}
                      result={result}
                      onClick={handleResultClick}
                      isHighlighted={index === highlightedIndex}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">
                  Try searching for users, content, events, or campaigns
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">↑</kbd>
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">↵</kbd>
                  <span>select</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Hash size={12} />
                <span>Tip: Use # for tags, @ for users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook for keyboard shortcut
export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isSearchOpen: isOpen,
    openSearch: () => setIsOpen(true),
    closeSearch: () => setIsOpen(false)
  };
}