import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import { Input } from '../../ui/input';
import useAppStore from '../../../stores/useAppStore';

const MobileNews = () => {
  const { news, selectedNewsCategory, setSelectedNewsCategory, likeNews } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['ALL', 'Policy', 'Community', 'Campaign', 'Healthcare'];

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = async (articleId) => {
    await likeNews(articleId);
  };

  if (selectedArticle) {
    return (
      <div className="h-full bg-white">
        {/* Article Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="p-2 -m-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold">Article</h1>
        </div>

        {/* Article Content */}
        <div className="p-4">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#FFC600]/10 text-[#FFC600] rounded-full text-sm font-medium mb-3">
              {selectedArticle.category}
            </span>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span>By {selectedArticle.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 leading-relaxed mb-4">
              {selectedArticle.summary}
            </p>
            
            {selectedArticle.keyPoints && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">Key Points:</h3>
                <ul className="space-y-1">
                  {selectedArticle.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-[#FFC600] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200 mt-6">
            <button
              onClick={() => handleLike(selectedArticle.id)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 active:bg-gray-100"
            >
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">{selectedArticle.likes}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 active:bg-gray-100">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">{selectedArticle.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 active:bg-gray-100">
              <Share2 className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-3">News & Updates</h1>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search news..."
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedNewsCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedNewsCategory === category
                  ? 'bg-[#FFC600] text-gray-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="p-4 space-y-4">
        {filteredNews.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-2xl p-4 shadow-sm active:scale-98 transition-transform"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-[#FFC600]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📰</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#FFC600] font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {article.summary}
                </p>
                
                {/* Stats */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{article.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{article.comments.length}</span>
                  </div>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNews;