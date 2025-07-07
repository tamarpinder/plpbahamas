import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Award, Heart, Users, Edit } from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Profile Not Available</h2>
        <p className="text-gray-600 mb-4">Please login to view your profile</p>
        <Button>Login</Button>
      </div>
    );
  }

  const userStats = [
    { icon: Heart, label: 'Total Donated', value: `$${user.donationTotal || 0}`, color: 'text-red-500' },
    { icon: Calendar, label: 'Events Attended', value: user.eventsAttended || 0, color: 'text-blue-500' },
    { icon: Users, label: 'Volunteer Hours', value: `${user.volunteerHours || 0}h`, color: 'text-green-500' },
    { icon: Award, label: 'Badges Earned', value: user.badges?.length || 0, color: 'text-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-800">Member since {new Date(user.memberSince).getFullYear()}</p>
              {user.verified && (
                <Badge className="bg-green-100 text-green-800 mt-1">Verified Member</Badge>
              )}
            </div>
          </div>
          <Button variant="outline" className="border-gray-900 text-gray-900">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.district && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{user.district}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Joined {new Date(user.memberSince).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
              <CardDescription>Your engagement with the movement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {userStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div 
                      key={stat.label}
                      className="text-center p-4 border rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {user.badges && user.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary">{badge}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No badges earned yet. Start engaging to earn your first badge!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-lg font-semibold text-[#FFC600]">
                  {user.volunteerStatus || 'New'}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Keep volunteering to advance your status!
                </p>
                <Button className="w-full mt-4" size="sm">
                  Find Volunteer Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Notifications</span>
                <Badge variant={user.notifications?.email ? "default" : "secondary"}>
                  {user.notifications?.email ? "On" : "Off"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Push Notifications</span>
                <Badge variant={user.notifications?.push ? "default" : "secondary"}>
                  {user.notifications?.push ? "On" : "Off"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Newsletter</span>
                <Badge variant={user.notifications?.newsletter ? "default" : "secondary"}>
                  {user.notifications?.newsletter ? "On" : "Off"}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Manage Preferences
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;