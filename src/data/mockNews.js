export const mockNews = [
  {
    id: 1,
    title: 'PLP Healthcare Initiative Launches',
    content: 'The Progressive Liberal Party announces a comprehensive healthcare program designed to provide universal coverage for all Bahamian families. This groundbreaking initiative will expand access to medical services across all Family Islands.',
    category: 'HEALTHCARE',
    date: '2025-01-20',
    author: 'PLP Communications Team',
    image: '/assets/images/news/healthcare.jpg',
    likes: 145,
    comments: [
      { id: 1, author: 'Marcus Johnson', level: 'Champion', levelIcon: '👑', text: 'This is exactly what our community needs! Healthcare should be accessible to everyone.', timestamp: '2025-01-20T10:30:00Z', likes: 12 },
      { id: 2, author: 'Sophia Williams', level: 'Activist', levelIcon: '⭐', text: 'Great initiative for healthcare access. When will this be implemented?', timestamp: '2025-01-20T11:15:00Z', likes: 8 },
      { id: 3, author: 'David Thompson', level: 'Supporter', levelIcon: '🤝', text: 'Finally, a comprehensive plan that addresses our healthcare challenges.', timestamp: '2025-01-20T12:00:00Z', likes: 15 }
    ],
    shares: 28,
    readTime: '3 min',
    featured: true
  },
  {
    id: 2,
    title: 'Community Town Hall Success',
    content: 'Over 200 residents attended the Nassau Central town hall meeting to discuss community development priorities. Citizens voiced concerns about infrastructure, education, and economic opportunities.',
    category: 'COMMUNITY',
    date: '2025-01-19',
    author: 'Nassau Central Office',
    image: '/assets/images/news/townhall.jpg',
    likes: 89,
    comments: [
      { id: 1, author: 'Maria Rodriguez', level: 'Champion', levelIcon: '👑', text: 'Proud to see such community engagement! This is democracy in action.', timestamp: '2025-01-19T19:30:00Z', likes: 22 },
      { id: 2, author: 'James Brown', level: 'Activist', levelIcon: '⭐', text: 'Looking forward to the next meeting. We need more of these discussions.', timestamp: '2025-01-19T20:15:00Z', likes: 9 },
      { id: 3, author: 'Angela Davis', level: 'Supporter', levelIcon: '🤝', text: 'Thank you for listening to the community! These town halls are so important.', timestamp: '2025-01-19T20:45:00Z', likes: 6 }
    ],
    shares: 15,
    readTime: '2 min',
    featured: false
  },
  {
    id: 3,
    title: 'Youth Employment Program Launches',
    content: 'New job training initiative for young Bahamians aged 18-25 launches next month. The program includes skills development, internships, and direct job placement opportunities with local businesses.',
    category: 'EMPLOYMENT',
    date: '2025-01-18',
    author: 'Youth Development Office',
    image: '/assets/images/news/youth-employment.jpg',
    likes: 203,
    comments: [
      { id: 1, author: 'Lisa Davis', level: 'Champion', levelIcon: '👑', text: 'This will help so many young people get started in their careers!', timestamp: '2025-01-18T14:20:00Z', likes: 18 },
      { id: 2, author: 'Michael Roberts', level: 'Activist', levelIcon: '⭐', text: 'Excellent opportunity for our youth. How do we apply?', timestamp: '2025-01-18T15:45:00Z', likes: 14 },
      { id: 3, author: 'Sarah Wilson', level: 'Supporter', levelIcon: '🤝', text: 'My nephew will be perfect for this program. Thank you PLP!', timestamp: '2025-01-18T16:30:00Z', likes: 11 }
    ],
    shares: 42,
    readTime: '4 min',
    featured: true
  },
  {
    id: 4,
    title: 'Infrastructure Investment Announced',
    content: 'Major infrastructure improvements planned for Family Islands including road repairs, bridge construction, and utility upgrades. The $50 million investment will create jobs and improve quality of life.',
    category: 'INFRASTRUCTURE',
    date: '2025-01-17',
    author: 'Infrastructure Development Team',
    image: '/assets/images/news/infrastructure.jpg',
    likes: 156,
    comments: [
      { id: 1, author: 'Robert Wilson', level: 'Activist', levelIcon: '⭐', text: 'About time we see investment in infrastructure! Our roads need serious work.', timestamp: '2025-01-17T16:20:00Z', likes: 25 },
      { id: 2, author: 'Patricia Lewis', level: 'Champion', levelIcon: '👑', text: 'This will make a huge difference for families on the outer islands.', timestamp: '2025-01-17T17:15:00Z', likes: 19 },
      { id: 3, author: 'Kevin Thompson', level: 'Supporter', levelIcon: '🤝', text: 'Great to see investment in the Family Islands. We need this!', timestamp: '2025-01-17T18:00:00Z', likes: 7 }
    ],
    shares: 33,
    readTime: '5 min',
    featured: false
  },
  {
    id: 5,
    title: 'Environmental Protection Initiative',
    content: 'New marine conservation program to protect Bahamian coral reefs and marine life. Partnership with international organizations brings $30 million in funding for conservation efforts.',
    category: 'ENVIRONMENT',
    date: '2025-01-16',
    author: 'Environmental Affairs Office',
    image: '/assets/images/news/environment.jpg',
    likes: 278,
    comments: [
      { id: 1, author: 'Dr. Emma Clarke', level: 'Champion', levelIcon: '👑', text: 'Protecting our beautiful waters is crucial for tourism and fishing industries!', timestamp: '2025-01-16T13:45:00Z', likes: 32 },
      { id: 2, author: 'Captain John Miller', level: 'Activist', levelIcon: '⭐', text: 'As a fisherman, I fully support this initiative. We need healthy reefs.', timestamp: '2025-01-16T14:30:00Z', likes: 28 },
      { id: 3, author: 'Marina Santos', level: 'Supporter', levelIcon: '🤝', text: 'Our coral reefs are so precious! Thank you for protecting them.', timestamp: '2025-01-16T15:15:00Z', likes: 13 }
    ],
    shares: 67,
    readTime: '4 min',
    featured: true
  },
  {
    id: 6,
    title: 'Education Technology Upgrade',
    content: 'Schools across The Bahamas to receive new computers and high-speed internet access. Digital literacy programs will prepare students for the modern workforce.',
    category: 'EDUCATION',
    date: '2025-01-15',
    author: 'Education Ministry',
    image: '/assets/images/news/education.jpg',
    likes: 192,
    comments: [
      { id: 1, author: 'Teacher Janet Smith', level: 'Champion', levelIcon: '👑', text: 'Our children deserve the best education technology! This is wonderful news.', timestamp: '2025-01-15T09:20:00Z', likes: 24 },
      { id: 2, author: 'Parent Association', level: 'Activist', levelIcon: '⭐', text: 'Finally! Our kids will be able to compete globally with these resources.', timestamp: '2025-01-15T10:45:00Z', likes: 16 },
      { id: 3, author: 'Principal Johnson', level: 'Supporter', levelIcon: '🤝', text: 'This technology upgrade will transform our classrooms!', timestamp: '2025-01-15T11:30:00Z', likes: 10 }
    ],
    shares: 45,
    readTime: '3 min',
    featured: false
  }
];

export const mockNewsCategories = [
  'ALL',
  'HEALTHCARE', 
  'COMMUNITY',
  'EMPLOYMENT',
  'INFRASTRUCTURE', 
  'ENVIRONMENT',
  'EDUCATION',
  'ECONOMY'
];