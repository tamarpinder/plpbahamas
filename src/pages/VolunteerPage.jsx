import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import VolunteerForm from '../components/VolunteerForm';
import { Users, Clock, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const VolunteerPage = () => {
  const volunteerOpportunities = [
    {
      id: 1,
      title: 'Community Canvassing',
      description: 'Join our door-to-door outreach efforts to connect with voters',
      location: 'Nassau Central',
      timeCommitment: '4 hours',
      volunteersNeeded: 15,
      skills: ['Communication', 'Community Engagement']
    },
    {
      id: 2,
      title: 'Event Coordination',
      description: 'Help organize and run community events and town halls',
      location: 'Various Locations',
      timeCommitment: '6-8 hours',
      volunteersNeeded: 8,
      skills: ['Organization', 'Event Planning']
    },
    {
      id: 3,
      title: 'Digital Outreach',
      description: 'Manage social media and online campaign activities',
      location: 'Remote',
      timeCommitment: 'Flexible',
      volunteersNeeded: 5,
      skills: ['Social Media', 'Content Creation']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Users className="h-16 w-16 mx-auto mb-4 text-gray-900" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer With Us</h1>
        <p className="text-xl text-gray-800 max-w-2xl mx-auto">
          Join thousands of volunteers making a difference in communities across the Bahamas.
        </p>
      </motion.div>

      {/* Why Volunteer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Why Volunteer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Make a Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your time and effort directly impact communities and help create positive change.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Develop Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gain valuable experience in leadership, communication, and community organizing.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with like-minded individuals who share your passion for positive change.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Current Opportunities */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Current Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {volunteerOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{opportunity.timeCommitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.volunteersNeeded} volunteers needed</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {opportunity.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Volunteer Application Form */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Apply to Volunteer</h2>
            <VolunteerForm />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Orientation</h4>
                    <p className="text-gray-600 text-sm">Attend a brief orientation to learn about our mission and processes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Training</h4>
                    <p className="text-gray-600 text-sm">Receive training specific to your volunteer role and responsibilities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Make Impact</h4>
                    <p className="text-gray-600 text-sm">Start volunteering and making a real difference in your community.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                    Recognition certificates and awards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                    Networking opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                    Skill development workshops
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                    Volunteer appreciation events
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                    Letters of recommendation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default VolunteerPage;