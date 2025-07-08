import React, { useState } from 'react';
import { X, FileText, Image, Video, Mic, Calendar, Tag, User, Globe } from 'lucide-react';

export function CreateContentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    type: 'article',
    category: 'news',
    status: 'draft',
    author: '',
    publishDate: '',
    scheduledDate: '',
    tags: '',
    metaDescription: '',
    featuredImage: '',
    priority: 'medium',
    allowComments: true,
    notes: ''
  });

  const contentTypes = [
    { value: 'article', label: 'Article/News', icon: FileText },
    { value: 'image', label: 'Image Post', icon: Image },
    { value: 'video', label: 'Video Content', icon: Video },
    { value: 'audio', label: 'Audio/Podcast', icon: Mic }
  ];

  const categories = [
    { value: 'news', label: 'News & Updates' },
    { value: 'policy', label: 'Policy Announcements' },
    { value: 'events', label: 'Event Coverage' },
    { value: 'community', label: 'Community Stories' },
    { value: 'education', label: 'Educational Content' },
    { value: 'healthcare', label: 'Healthcare Updates' },
    { value: 'environment', label: 'Environmental Issues' },
    { value: 'economy', label: 'Economic Development' },
    { value: 'youth', label: 'Youth Programs' },
    { value: 'opinion', label: 'Opinion Pieces' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Publish Now' },
    { value: 'scheduled', label: 'Schedule for Later' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContent = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      type: formData.type,
      category: formData.category,
      status: formData.status,
      author: formData.author || 'PLP Communications Team',
      publishDate: formData.status === 'published' ? new Date().toISOString().split('T')[0] : formData.publishDate,
      scheduledDate: formData.status === 'scheduled' ? formData.scheduledDate : null,
      lastModified: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      metaDescription: formData.metaDescription,
      featuredImage: formData.featuredImage,
      priority: formData.priority,
      allowComments: formData.allowComments,
      notes: formData.notes,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      thumbnail: formData.featuredImage || null
    };

    onSave(newContent);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      type: 'article',
      category: 'news',
      status: 'draft',
      author: '',
      publishDate: '',
      scheduledDate: '',
      tags: '',
      metaDescription: '',
      featuredImage: '',
      priority: 'medium',
      allowComments: true,
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Content</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Content Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter content title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt/Summary</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief summary of the content..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {contentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Content Body</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'article' ? 'Article Content' : 
                   formData.type === 'video' ? 'Video Description' :
                   formData.type === 'audio' ? 'Audio Description' : 
                   'Image Description'}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={
                    formData.type === 'article' ? 'Write your article content here...' :
                    formData.type === 'video' ? 'Describe the video content, key points, and context...' :
                    formData.type === 'audio' ? 'Describe the audio content, key points, and context...' :
                    'Describe the image, its significance, and context...'
                  }
                />
              </div>
            </div>

            {/* Media & SEO */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Media & SEO</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="SEO meta description for search engines..."
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. politics, bahamas, news, healthcare"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Publishing Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="PLP Communications Team"
                    />
                  </div>
                </div>
                {formData.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="datetime-local"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required={formData.status === 'scheduled'}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="allowComments"
                  checked={formData.allowComments}
                  onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allowComments" className="ml-2 block text-sm text-gray-900">
                  Allow comments on this content
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Internal notes for the editorial team..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700"
              >
                {formData.status === 'published' ? 'Publish Now' :
                 formData.status === 'scheduled' ? 'Schedule Content' :
                 'Save as Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}