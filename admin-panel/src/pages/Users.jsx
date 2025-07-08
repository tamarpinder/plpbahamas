import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  MoreHorizontal,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Users as UsersIcon,
  CheckCircle,
  XCircle,
  Eye,
  SlidersHorizontal,
  CheckSquare,
  Square
} from 'lucide-react';
import { generateMockUsers, userStats } from '../data/mockUsers';
import { FilterPanel } from '../components/FilterPanel';
import { BulkActions } from '../components/BulkActions';
import { AddSupporterModal } from '../components/modals/AddSupporterModal';

const allUsers = generateMockUsers(50);

function UserRow({ user, onViewDetails, isSelected, onSelect }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <tr className={`hover:bg-gray-50 border-b border-gray-200 ${isSelected ? 'bg-blue-50' : ''}`}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelect(user.id)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            {isSelected ? (
              <CheckSquare className="w-4 h-4 text-blue-600" />
            ) : (
              <Square className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={14} />
          {user.votingDistrict}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
          {user.verified && <CheckCircle size={12} className="mr-1" />}
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className={`font-medium ${getEngagementColor(user.engagementScore)}`}>
            {user.engagementScore}%
          </div>
          <div className="text-gray-500">{user.volunteerStatus}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        ${user.donationTotal.toFixed(2)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {user.eventsAttended}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(user)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Eye size={16} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.demographics.profession} • {user.votingDistrict}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle size={24} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="admin-card p-4">
            <h3 className="heading-sm mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <span>Age: {user.age}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-gray-400" />
                <span>{user.parish}</span>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="admin-card p-4">
            <h3 className="heading-sm mb-4">Engagement</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement Score</span>
                <span className="font-bold text-lg">{user.engagementScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">News Views</span>
                <span className="font-medium">{user.engagement.newsViews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Shares</span>
                <span className="font-medium">{user.engagement.socialShares}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Comments</span>
                <span className="font-medium">{user.engagement.commentsPosted}</span>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="admin-card p-4">
            <h3 className="heading-sm mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Donations</span>
                <span className="font-bold text-green-600">${user.donationTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Events Attended</span>
                <span className="font-medium">{user.eventsAttended}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Active</span>
                <span className="font-medium">{new Date(user.lastActive).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Interests & Badges */}
          <div className="lg:col-span-2 admin-card p-4">
            <h3 className="heading-sm mb-4">Interests & Achievements</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                      <Award size={12} />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="admin-card p-4">
            <h3 className="heading-sm mb-4">Demographics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Education</span>
                <span className="font-medium">{user.demographics.education}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Income Level</span>
                <span className="font-medium">{user.demographics.income}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gender</span>
                <span className="font-medium">{user.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState(allUsers);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesDistrict = districtFilter === 'all' || user.votingDistrict === districtFilter;
      
      // Apply advanced filters
      const matchesAdvancedFilters = Object.entries(activeFilters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        
        switch (key) {
          case 'search':
            return user.name.toLowerCase().includes(value.toLowerCase()) ||
                   user.email.toLowerCase().includes(value.toLowerCase());
          case 'status':
            return user.status === value;
          case 'location':
            return user.votingDistrict === value;
          case 'engagement':
            const score = user.engagementScore;
            return (value === 'high' && score >= 70) ||
                   (value === 'medium' && score >= 40 && score < 70) ||
                   (value === 'low' && score < 40);
          case 'tags':
            return value.some(tag => user.badges.includes(tag));
          case 'donated':
            return user.donationTotal > 0;
          case 'recurring':
            return user.donationTotal > 100; // Mock recurring logic
          case 'attended':
            return user.eventsAttended > 0;
          case 'volunteer':
            return user.volunteerStatus !== 'None';
          case 'dateRange':
            const now = new Date();
            const userDate = new Date(user.lastActive);
            const daysDiff = Math.floor((now - userDate) / (1000 * 60 * 60 * 24));
            return (value === '7d' && daysDiff <= 7) ||
                   (value === '30d' && daysDiff <= 30) ||
                   (value === '90d' && daysDiff <= 90) ||
                   (value === '1y' && daysDiff <= 365);
          default:
            return true;
        }
      });
      
      return matchesSearch && matchesStatus && matchesDistrict && matchesAdvancedFilters;
    });
  }, [searchTerm, statusFilter, districtFilter, activeFilters, users]);

  const districts = [...new Set(users.map(user => user.votingDistrict))];

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        const newSelected = prev.filter(id => id !== userId);
        setAllSelected(newSelected.length === filteredUsers.length);
        return newSelected;
      } else {
        const newSelected = [...prev, userId];
        setAllSelected(newSelected.length === filteredUsers.length);
        return newSelected;
      }
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
      setAllSelected(false);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
      setAllSelected(true);
    }
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, 'on users:', selectedIds);
    // Handle different bulk actions
    switch (action.id) {
      case 'email':
        alert(`Sending email to ${selectedIds.length} users`);
        break;
      case 'sms':
        alert(`Sending SMS to ${selectedIds.length} users`);
        break;
      case 'export':
        alert(`Exporting ${selectedIds.length} users`);
        break;
      case 'delete':
        alert(`Deleting ${selectedIds.length} users`);
        break;
      default:
        alert(`Action ${action.label} on ${selectedIds.length} users`);
    }
    setSelectedUsers([]);
    setAllSelected(false);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const getActiveFilterCount = () => {
    return Object.entries(activeFilters).filter(([key, value]) => 
      value && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  const handleAddSupporter = (supporterData) => {
    setUsers(prev => [supporterData, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Supporters</h1>
        <p className="text-gray-600 mt-2">
          Manage your supporter database and analyze user engagement patterns.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Supporters</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.total.toLocaleString()}</p>
            </div>
            <UsersIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.active.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.newThisMonth}</p>
            </div>
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.verified.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="admin-card p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search supporters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilterPanel(true)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                getActiveFilterCount() > 0 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={18} />
              Advanced Filters
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={18} />
              Export
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={18} />
              Add Supporter
            </button>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full data-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    Supporter
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onViewDetails={setSelectedUser}
                  isSelected={selectedUsers.includes(user.id)}
                  onSelect={handleSelectUser}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No supporters found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        activeFilters={activeFilters}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedItems={selectedUsers}
        onClearSelection={() => {
          setSelectedUsers([]);
          setAllSelected(false);
        }}
        onBulkAction={handleBulkAction}
        actionType="users"
      />

      {/* User detail modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Add Supporter Modal */}
      <AddSupporterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddSupporter}
      />
    </div>
  );
}