import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Heart, Target, Users, Award } from 'lucide-react';
import DonationFormGamified from '../components/DonationFormGamified';
import { motion } from 'framer-motion';

const DonationPage = () => {
  const impactStats = [
    {
      icon: Target,
      title: 'Healthcare Initiative',
      description: 'Supporting universal healthcare access',
      raised: 75000,
      goal: 100000,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Community Programs',
      description: 'Funding local development projects',
      raised: 120000,
      goal: 150000,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Youth Leadership',
      description: 'Empowering the next generation',
      raised: 45000,
      goal: 75000,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getProgressPercentage = (raised, goal) => (raised / goal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heart className="h-16 w-16 mx-auto mb-4 text-gray-900" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
        <p className="text-xl text-gray-800 max-w-2xl mx-auto">
          Your donation helps us build stronger communities and create lasting positive change across the Bahamas.
        </p>
      </motion.div>

      {/* Impact Campaigns */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {impactStats.map((campaign, index) => {
            const Icon = campaign.icon;
            const progress = getProgressPercentage(campaign.raised, campaign.goal);
            
            return (
              <motion.div
                key={campaign.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Card>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${campaign.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                        <span className="text-gray-600">${campaign.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${campaign.color} transition-all duration-300`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-green-600">
                          {Math.round(progress)}% Complete
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Donation Form */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
            <DonationFormGamified />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Your Donation Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Direct Community Impact</h4>
                    <p className="text-gray-600 text-sm">Your contributions fund programs that directly benefit families and communities across the Bahamas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Transparent Use</h4>
                    <p className="text-gray-600 text-sm">We provide regular updates on how your donations are used to create positive change.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sustainable Development</h4>
                    <p className="text-gray-600 text-sm">Supporting long-term solutions for healthcare, education, and economic growth.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-[#FFC600] pl-4">
                    <p className="font-semibold">Community Health Clinics</p>
                    <p className="text-sm text-gray-600">Opened 5 new health clinics in underserved areas</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold">Education Support</p>
                    <p className="text-sm text-gray-600">Provided scholarships to 200+ students</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold">Infrastructure Projects</p>
                    <p className="text-sm text-gray-600">Improved roads and utilities in 15 communities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DonationPage;