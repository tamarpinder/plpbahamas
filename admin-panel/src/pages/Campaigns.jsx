import React, { useState } from 'react';
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { mockCampaigns, donationStats } from '../data/mockCampaigns';

function ProgressBar({ current, goal, className = "" }) {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function CampaignCard({ campaign }) {
  const percentage = (campaign.raised / campaign.goal) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24));
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className={`admin-card admin-card-hover p-6 border-l-4 ${getPriorityColor(campaign.priority)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar size={14} />
            <span>Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
            {daysLeft > 0 && <span className="text-blue-600 font-medium">({daysLeft} days left)</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
        </div>
        <ProgressBar current={campaign.raised} goal={campaign.goal} />
        
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="text-gray-600">Raised: </span>
            <span className="font-semibold text-green-600">${campaign.raised.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-600">Goal: </span>
            <span className="font-semibold">${campaign.goal.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{campaign.donors}</div>
            <div className="text-xs text-gray-500">Donors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">${Math.round(campaign.raised / campaign.donors)}</div>
            <div className="text-xs text-gray-500">Avg. Donation</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentDonationItem({ donation }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <DollarSign size={14} className="text-white" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{donation.donor}</div>
          <div className="text-sm text-gray-500">{donation.date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-green-600">${donation.amount}</div>
        <div className="text-xs text-gray-500">Donation</div>
      </div>
    </div>
  );
}

export function Campaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(mockCampaigns.map(campaign => campaign.category))];
  const recentDonations = donationStats.recentTransactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Campaigns & Donations</h1>
        <p className="text-gray-600 mt-2">
          Track fundraising campaigns and analyze donation patterns across all initiatives.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">${donationStats.totalRaised.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{donationStats.thisMonth.growth}%</span>
            <span className="text-sm text-gray-500 ml-2">this month</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900">{donationStats.totalDonors.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">New this month: </span>
            <span className="text-sm font-medium ml-1">{donationStats.thisMonth.donors}</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{mockCampaigns.filter(c => c.status === 'active').length}</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">Average goal: </span>
            <span className="text-sm font-medium ml-1">${Math.round(mockCampaigns.reduce((acc, c) => acc + c.goal, 0) / mockCampaigns.length).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Donation</p>
              <p className="text-2xl font-bold text-gray-900">${donationStats.averageDonation}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">Range: </span>
            <span className="text-sm font-medium ml-1">$25 - $5,000</span>
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="admin-card p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search campaigns..."
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
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Campaigns grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          
          {filteredCampaigns.length === 0 && (
            <div className="admin-card p-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or create a new campaign.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent donations */}
          <div className="admin-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-sm">Recent Donations</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {recentDonations.map((donation) => (
                <RecentDonationItem key={donation.id} donation={donation} />
              ))}
            </div>
          </div>

          {/* Donation breakdown */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Donation Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(donationStats.byAmount).map(([range, count]) => (
                <div key={range} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{range}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top performers */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Top Donors</h3>
            <div className="space-y-3">
              {donationStats.topDonors.slice(0, 5).map((donor, index) => (
                <div key={donor.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{donor.name}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">${donor.totalDonated.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}