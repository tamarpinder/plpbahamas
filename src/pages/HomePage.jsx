import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, Users, Calendar, Trophy, Heart, Newspaper, TrendingUp } from 'lucide-react';
import useAppStore from '../stores/useAppStore';
import useAuthStore from '../stores/useAuthStore';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { dashboardStats, news, events, initializeApp } = useAppStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-8 text-gray-900"
        {...fadeIn}
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Join the Movement'}
          </h1>
          <p className="text-xl mb-6">
            Be part of the change. Together, we're building a stronger Bahamas.
          </p>
          <div className="flex flex-wrap gap-4">
            {!isAuthenticated && (
              <Link to="/login">
                <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-gray-900 text-gray-900">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      {dashboardStats && (
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeMembers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Next event in 2 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Supporting our mission</p>
            </CardContent>
          </Card>

          {isAuthenticated && dashboardStats.userStats && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Impact</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.userStats.donationTotal}</div>
                <p className="text-xs text-muted-foreground">{dashboardStats.userStats.badges} badges earned</p>
              </CardContent>
            </Card>
          )}
        </motion.section>
      )}

      {/* Latest News */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link to="/news">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((article) => (
            <Card key={article.id} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Newspaper className="h-4 w-4" />
                  <span>{article.category}</span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">{article.summary}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <Link to={`/news/${article.id}`}>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.slice(0, 2).map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{event.title}</CardTitle>
                  {event.is_live_streamed && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Live Stream</span>
                  )}
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(event.date_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.attending_count} attending</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to={`/events/${event.id}`}>
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Your support helps us build stronger communities and create positive change across the Bahamas.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/donate">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </Link>
          <Link to="/volunteer">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              <Users className="mr-2 h-5 w-5" />
              Volunteer
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;