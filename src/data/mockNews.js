export const mockNews = [
  {
    id: 1,
    title: "PLP Healthcare Initiative Launches",
    content: "The Progressive Liberal Party announces a comprehensive healthcare program designed to provide universal coverage for all Bahamian families. This groundbreaking initiative will expand access to medical services across all Family Islands.",
    category: "HEALTHCARE",
    date: "2024-12-20",
    author: "PLP Communications Team",
    image: "/assets/images/news/healthcare.jpg",
    likes: 145,
    comments: [
      { id: 1, author: "Marcus Johnson", text: "This is exactly what our community needs! Healthcare should be accessible to everyone.", timestamp: "2024-12-20T10:30:00Z" },
      { id: 2, author: "Sophia Williams", text: "Great initiative for healthcare access. When will this be implemented?", timestamp: "2024-12-20T11:15:00Z" },
      { id: 3, author: "David Thompson", text: "Finally, a comprehensive plan that addresses our healthcare challenges.", timestamp: "2024-12-20T12:00:00Z" }
    ],
    shares: 28,
    readTime: "3 min",
    featured: true
  },
  {
    id: 2,
    title: "Community Town Hall Success",
    content: "Over 200 residents attended the Nassau Central town hall meeting to discuss community development priorities. Citizens voiced concerns about infrastructure, education, and economic opportunities.",
    category: "COMMUNITY",
    date: "2024-12-19",
    author: "Nassau Central Office",
    image: "/assets/images/news/townhall.jpg",
    likes: 89,
    comments: [
      { id: 1, author: "Maria Rodriguez", text: "Proud to see such community engagement! This is democracy in action.", timestamp: "2024-12-19T19:30:00Z" },
      { id: 2, author: "James Brown", text: "Looking forward to the next meeting. We need more of these discussions.", timestamp: "2024-12-19T20:15:00Z" }
    ],
    shares: 15,
    readTime: "2 min",
    featured: false
  },
  {
    id: 3,
    title: "Youth Employment Program Launches",
    content: "New job training initiative for young Bahamians aged 18-25 launches next month. The program includes skills development, internships, and direct job placement opportunities with local businesses.",
    category: "EMPLOYMENT",
    date: "2024-12-18",
    author: "Youth Development Office",
    image: "/assets/images/news/youth-employment.jpg",
    likes: 203,
    comments: [
      { id: 1, author: "Lisa Davis", text: "This will help so many young people get started in their careers!", timestamp: "2024-12-18T14:20:00Z" },
      { id: 2, author: "Michael Roberts", text: "Excellent opportunity for our youth. How do we apply?", timestamp: "2024-12-18T15:45:00Z" },
      { id: 3, author: "Sarah Wilson", text: "My nephew will be perfect for this program. Thank you PLP!", timestamp: "2024-12-18T16:30:00Z" }
    ],
    shares: 42,
    readTime: "4 min",
    featured: true
  },
  {
    id: 4,
    title: "Infrastructure Investment Announced",
    content: "Major infrastructure improvements planned for Family Islands including road repairs, bridge construction, and utility upgrades. The $50 million investment will create jobs and improve quality of life.",
    category: "INFRASTRUCTURE",
    date: "2024-12-17",
    author: "Infrastructure Development Team",
    image: "/assets/images/news/infrastructure.jpg",
    likes: 156,
    comments: [
      { id: 1, author: "Guest", text: "About time we see investment in infrastructure! Our roads need serious work.", timestamp: "2024-12-17T16:20:00Z" },
      { id: 2, author: "Patricia Lewis", text: "This will make a huge difference for families on the outer islands.", timestamp: "2024-12-17T17:15:00Z" }
    ],
    shares: 33,
    readTime: "5 min",
    featured: false
  },
  {
    id: 5,
    title: "Environmental Protection Initiative",
    content: "New marine conservation program to protect Bahamian coral reefs and marine life. Partnership with international organizations brings $30 million in funding for conservation efforts.",
    category: "ENVIRONMENT",
    date: "2024-12-16",
    author: "Environmental Affairs Office",
    image: "/assets/images/news/environment.jpg",
    likes: 278,
    comments: [
      { id: 1, author: "Dr. Emma Clarke", text: "Protecting our beautiful waters is crucial for tourism and fishing industries!", timestamp: "2024-12-16T13:45:00Z" },
      { id: 2, author: "Captain John Miller", text: "As a fisherman, I fully support this initiative. We need healthy reefs.", timestamp: "2024-12-16T14:30:00Z" }
    ],
    shares: 67,
    readTime: "4 min",
    featured: true
  },
  {
    id: 6,
    title: "Education Technology Upgrade",
    content: "Schools across The Bahamas to receive new computers and high-speed internet access. Digital literacy programs will prepare students for the modern workforce.",
    category: "EDUCATION",
    date: "2024-12-15",
    author: "Education Ministry",
    image: "/assets/images/news/education.jpg",
    likes: 192,
    comments: [
      { id: 1, author: "Teacher Janet Smith", text: "Our children deserve the best education technology! This is wonderful news.", timestamp: "2024-12-15T09:20:00Z" },
      { id: 2, author: "Parent Association", text: "Finally! Our kids will be able to compete globally with these resources.", timestamp: "2024-12-15T10:45:00Z" }
    ],
    shares: 45,
    readTime: "3 min",
    featured: false
  }
];

export const mockNewsCategories = [
  "ALL",
  "HEALTHCARE", 
  "COMMUNITY",
  "EMPLOYMENT",
  "INFRASTRUCTURE", 
  "ENVIRONMENT",
  "EDUCATION",
  "ECONOMY"
];