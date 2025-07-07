// Mock Donation and Campaign Data
export const mockCampaigns = [
  {
    id: 1,
    name: 'Build Better Schools Initiative',
    description: 'Funding for new educational facilities and technology across The Bahamas',
    goal_amount: 250000,
    current_amount: 187500,
    start_date: '2024-11-01T00:00:00Z',
    end_date: '2025-03-31T23:59:59Z',
    is_active: true,
    image_url: '/images/school-campaign.jpg',
    category: 'Education',
    urgency: 'high'
  },
  {
    id: 2,
    name: 'Healthcare for All',
    description: 'Expanding healthcare access to underserved communities',
    goal_amount: 500000,
    current_amount: 342000,
    start_date: '2024-10-15T00:00:00Z',
    end_date: '2025-06-30T23:59:59Z',
    is_active: true,
    image_url: '/images/healthcare-campaign.jpg',
    category: 'Healthcare',
    urgency: 'medium'
  },
  {
    id: 3,
    name: 'Youth Employment Program',
    description: 'Job training and creation for young Bahamians',
    goal_amount: 150000,
    current_amount: 98750,
    start_date: '2024-12-01T00:00:00Z',
    end_date: '2025-05-31T23:59:59Z',
    is_active: true,
    image_url: '/images/youth-campaign.jpg',
    category: 'Employment',
    urgency: 'medium'
  },
  {
    id: 4,
    name: 'Election 2026 Campaign Fund',
    description: 'Supporting PLP candidates across all constituencies',
    goal_amount: 1000000,
    current_amount: 456789,
    start_date: '2024-09-01T00:00:00Z',
    end_date: '2026-05-01T23:59:59Z',
    is_active: true,
    image_url: '/images/election-campaign.jpg',
    category: 'Campaign',
    urgency: 'high'
  },
  {
    id: 5,
    name: 'Environmental Protection Fund',
    description: 'Marine conservation and climate change initiatives',
    goal_amount: 300000,
    current_amount: 125000,
    start_date: '2024-11-15T00:00:00Z',
    end_date: '2025-12-31T23:59:59Z',
    is_active: true,
    image_url: '/images/environment-campaign.jpg',
    category: 'Environment',
    urgency: 'low'
  }
];

export const mockDonations = [
  {
    id: 1,
    user_id: 1,
    amount: 250.00,
    currency: 'USD',
    payment_method: 'Credit Card',
    transaction_id: 'txn_1234567890',
    status: 'completed',
    donation_date: '2024-12-20T14:30:00Z',
    campaign_id: 1,
    is_recurring: false,
    anonymous: false,
    message: 'Proud to support better education for our children!',
    user_name: 'Marcus Johnson'
  },
  {
    id: 2,
    user_id: 2,
    amount: 100.00,
    currency: 'USD',
    payment_method: 'PayPal',
    transaction_id: 'txn_0987654321',
    status: 'completed',
    donation_date: '2024-12-19T09:15:00Z',
    campaign_id: 2,
    is_recurring: true,
    recurring_frequency: 'monthly',
    anonymous: false,
    message: 'Healthcare is a right, not a privilege.',
    user_name: 'Sophia Williams'
  },
  {
    id: 3,
    user_id: 3,
    amount: 500.00,
    currency: 'USD',
    payment_method: 'Bank Transfer',
    transaction_id: 'txn_1122334455',
    status: 'completed',
    donation_date: '2024-12-18T16:45:00Z',
    campaign_id: 4,
    is_recurring: false,
    anonymous: true,
    message: 'For a better Bahamas in 2026!',
    user_name: 'Anonymous'
  },
  {
    id: 4,
    user_id: 4,
    amount: 75.00,
    currency: 'USD',
    payment_method: 'Credit Card',
    transaction_id: 'txn_5566778899',
    status: 'completed',
    donation_date: '2024-12-17T11:20:00Z',
    campaign_id: 3,
    is_recurring: false,
    anonymous: false,
    message: 'Our youth deserve opportunities!',
    user_name: 'David Thompson'
  },
  {
    id: 5,
    user_id: 5,
    amount: 1000.00,
    currency: 'USD',
    payment_method: 'Credit Card',
    transaction_id: 'txn_9988776655',
    status: 'completed',
    donation_date: '2024-12-16T13:10:00Z',
    campaign_id: 1,
    is_recurring: false,
    anonymous: false,
    message: 'Education is the foundation of progress.',
    user_name: 'Maria Rodriguez'
  }
];

// Donation milestones for gamification
export const donationMilestones = [
  { amount: 1, badge: 'Blue Heart', points: 10, celebration: '🎉 First donation!' },
  { amount: 25, badge: null, points: 25, celebration: '💫 Keep it up!' },
  { amount: 50, badge: null, points: 50, celebration: '🌟 Amazing support!' },
  { amount: 100, badge: 'Wave Maker', points: 100, celebration: '🌊 Wave Maker unlocked!' },
  { amount: 250, badge: null, points: 250, celebration: '⭐ Incredible generosity!' },
  { amount: 500, badge: 'Thunder Strike', points: 500, celebration: '⚡ Thunder Strike unlocked!' },
  { amount: 1000, badge: 'Flame Bearer', points: 1000, celebration: '🔥 Flame Bearer unlocked!' },
  { amount: 2500, badge: null, points: 2500, celebration: '💎 Diamond supporter!' },
  { amount: 5000, badge: 'Diamond Patron', points: 5000, celebration: '💎 Diamond Patron unlocked!' },
  { amount: 10000, badge: 'Constellation', points: 10000, celebration: '🌟 Constellation unlocked!' }
];

// Mock donation leaderboard
export const donationLeaderboard = [
  { rank: 1, user_name: 'Anonymous', total_amount: 15750, badge: 'Constellation' },
  { rank: 2, user_name: 'Patricia Davis', total_amount: 12500, badge: 'Constellation' },
  { rank: 3, user_name: 'Michael Brown', total_amount: 8900, badge: 'Diamond Patron' },
  { rank: 4, user_name: 'Jennifer Wilson', total_amount: 7200, badge: 'Diamond Patron' },
  { rank: 5, user_name: 'Robert Garcia', total_amount: 5800, badge: 'Diamond Patron' },
  { rank: 6, user_name: 'Lisa Johnson', total_amount: 4200, badge: 'Flame Bearer' },
  { rank: 7, user_name: 'James Miller', total_amount: 3500, badge: 'Flame Bearer' },
  { rank: 8, user_name: 'Sarah Anderson', total_amount: 2800, badge: 'Flame Bearer' },
  { rank: 9, user_name: 'David Clark', total_amount: 1900, badge: 'Flame Bearer' },
  { rank: 10, user_name: 'Maria Rodriguez', total_amount: 1000, badge: 'Flame Bearer' }
];

export const getDonationMilestone = (totalAmount) => {
  for (let i = donationMilestones.length - 1; i >= 0; i--) {
    if (totalAmount >= donationMilestones[i].amount) {
      return donationMilestones[i];
    }
  }
  return null;
};

export const getNextDonationMilestone = (totalAmount) => {
  for (let milestone of donationMilestones) {
    if (totalAmount < milestone.amount) {
      return milestone;
    }
  }
  return null;
};

export const calculateProgress = (current, goal) => {
  return Math.min((current / goal) * 100, 100);
};