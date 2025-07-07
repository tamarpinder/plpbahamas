import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Newspaper, Search, Calendar, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import useAppStore from '../stores/useAppStore';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const { news, newsLoading, selectedNewsCategory, setSelectedNewsCategory, likeNews } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticles, setExpandedArticles] = useState({});

  const categories = ['ALL', 'Policy Updates', 'Community Impact', 'Campaign Trail', 'Healthcare', 'Education'];

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (articleId) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const handleLike = async (articleId) => {
    await likeNews(articleId);
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">News & Updates</h1>
        <p className="text-gray-800">Stay informed about our movement and community initiatives</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search news..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedNewsCategory} onValueChange={setSelectedNewsCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="data-[state=active]:bg-[#FFC600]">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedNewsCategory} className="mt-6">
          {newsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC600] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No news articles found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Newspaper className="h-4 w-4" />
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.readTime}
                        </span>
                        <span>By {article.author}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className={expandedArticles[article.id] ? '' : 'line-clamp-3'}>
                        {article.summary}
                      </CardDescription>
                      
                      {article.keyPoints && expandedArticles[article.id] && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Key Points:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {article.keyPoints.map((point, i) => (
                              <li key={i} className="text-sm text-gray-700">{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(article.id)}
                            className="flex items-center gap-1"
                          >
                            <Heart className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{article.comments.length}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(article)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => toggleExpanded(article.id)}
                        >
                          {expandedArticles[article.id] ? 'Show Less' : 'Read More'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsPage;