import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Video, 
  Mic, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Globe,
  Share2,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Upload,
  Download,
  MoreHorizontal,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { mockContent, contentStats } from '../data/mockContent';

function ContentCard({ content }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Mic className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return <CheckCircle2 className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'archived': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="admin-card admin-card-hover p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-blue-600">
              {getTypeIcon(content.type)}
              <span className="text-sm font-medium capitalize">{content.type}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(content.status)}
                {content.status}
              </div>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{content.excerpt}</p>
        </div>
        
        {content.thumbnail && (
          <div className="ml-4 flex-shrink-0">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{content.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(content.publishDate || content.createdAt).toLocaleDateString()}</span>
          </div>
          {content.category && (
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>{content.category}</span>
            </div>
          )}
        </div>

        {content.status === 'published' && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{content.views?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={14} />
              <span>{content.likes?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{content.comments?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 size={14} />
              <span>{content.shares?.toLocaleString() || 0}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {content.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
          {content.tags?.length > 2 && (
            <span className="text-xs text-gray-500">+{content.tags.length - 2} more</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MediaUploadCard() {
  return (
    <div className="admin-card p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
      <div className="text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Media</h3>
        <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Select Files
        </button>
      </div>
    </div>
  );
}

function RecentActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'published': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'edited': return <Edit className="w-4 h-4 text-blue-600" />;
      case 'created': return <Plus className="w-4 h-4 text-gray-600" />;
      case 'archived': return <XCircle className="w-4 h-4 text-yellow-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.details}</p>
      </div>
      <div className="text-xs text-gray-400">
        {activity.timestamp}
      </div>
    </div>
  );
}

export function Content() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || content.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const contentTypes = [...new Set(mockContent.map(content => content.type))];
  const categories = [...new Set(mockContent.map(content => content.category).filter(Boolean))];
  const recentActivity = contentStats.recentActivity.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Content Management</h1>
        <p className="text-gray-600 mt-2">
          Create, manage, and analyze your digital content and media assets.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">{contentStats.totalContent}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+12%</span>
            <span className="text-sm text-gray-500 ml-2">this month</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{contentStats.published}</p>
            </div>
            <Globe className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">Drafts: </span>
            <span className="text-sm font-medium ml-1">{contentStats.drafts}</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{contentStats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">This month: </span>
            <span className="text-sm font-medium ml-1">{contentStats.monthlyViews.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{contentStats.engagementRate}%</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+3.2%</span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
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
                placeholder="Search content..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {contentTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
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
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Upload size={18} />
              Upload
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={18} />
              New Content
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
          
          {filteredContent.length === 0 && (
            <div className="admin-card p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or create new content.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick upload */}
          <MediaUploadCard />

          {/* Recent activity */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Recent Activity</h3>
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <RecentActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Content performance */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Top Performing</h3>
            <div className="space-y-3">
              {contentStats.topPerforming.slice(0, 5).map((content, index) => (
                <div key={content.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                      <p className="text-xs text-gray-500">{content.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{content.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}