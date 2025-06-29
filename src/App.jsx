import { useState, useEffect } from 'react'
import plpLogo from './assets/Flag_of_the_Progressive_Liberal_Party.png'
import './App.css'
import { mockApi } from './services/mockApi.js'
import DonationForm from './components/DonationForm.jsx'
import VolunteerForm from './components/VolunteerForm.jsx'
import ScreenContainer from './components/ScreenContainer.jsx'
import EventCard from './components/EventCard.jsx'

function App() {
  const [currentView, setCurrentView] = useState('welcome')
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [dashboardStats, setDashboardStats] = useState({ activeMembers: 0, upcomingEvents: 0 })
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState({})
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showVolunteerForm, setShowVolunteerForm] = useState(false)
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    votingDistrict: ''
  })
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  // Dark mode effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Load user from localStorage on app start
  useEffect(() => {
    const currentUser = mockApi.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setIsGuest(false)
    }
  }, [])

  // Demo data for fallback
  const demoNews = [
    {
      id: 1,
      title: "PLP Healthcare Initiative Launches",
      content: "New comprehensive healthcare program announced for all Bahamian families.",
      category: "HEALTHCARE",
      date: "2024-12-20",
      likes: 45,
      comments: [
        { id: 1, author: "Marcus Johnson", text: "This is exactly what our community needs!" },
        { id: 2, author: "Sophia Williams", text: "Great initiative for healthcare access." }
      ],
      shares: 8
    },
    {
      id: 2,
      title: "Community Town Hall Success",
      content: "Over 200 residents attended the Nassau Central town hall meeting to discuss community development.",
      category: "COMMUNITY",
      date: "2024-12-19",
      likes: 32,
      comments: [
        { id: 1, author: "David Thompson", text: "Proud to see such community engagement!" },
        { id: 2, author: "Maria Rodriguez", text: "Looking forward to the next meeting." }
      ],
      shares: 15
    },
    {
      id: 3,
      title: "Youth Employment Program",
      content: "New job training initiative for young Bahamians aged 18-25 launches next month.",
      category: "EMPLOYMENT",
      date: "2024-12-18",
      likes: 67,
      comments: [
        { id: 1, author: "James Brown", text: "This will help so many young people!" },
        { id: 2, author: "Lisa Davis", text: "Excellent opportunity for our youth." }
      ],
      shares: 22
    },
    {
      id: 4,
      title: "Infrastructure Investment Announced",
      content: "Major infrastructure improvements planned for Family Islands including road repairs and utilities.",
      category: "INFRASTRUCTURE",
      date: "2024-12-17",
      likes: 54,
      comments: [
        { id: 1, author: "Guest", text: "About time we see investment in infrastructure!" }
      ],
      shares: 18
    },
    {
      id: 5,
      title: "Environmental Protection Initiative",
      content: "New marine conservation program to protect Bahamian coral reefs and marine life.",
      category: "ENVIRONMENT",
      date: "2024-12-16",
      likes: 89,
      comments: [
        { id: 1, author: "Guest", text: "Protecting our beautiful waters is crucial!" }
      ],
      shares: 31
    },
    {
      id: 6,
      title: "Education Technology Upgrade",
      content: "Schools across The Bahamas to receive new computers and high-speed internet access.",
      category: "EDUCATION",
      date: "2024-12-15",
      likes: 76,
      comments: [
        { id: 1, author: "Guest", text: "Our children deserve the best education technology!" }
      ],
      shares: 25
    }
  ]

  const demoEvents = [
    {
      id: 1,
      title: "Community Rally - Nassau",
      description: "Join us for a community rally in downtown Nassau to discuss our vision for The Bahamas.",
      date_time: "2024-12-25T18:00:00",
      location: "Rawson Square, Nassau",
      event_type: "Rally",
      is_live_streamed: true,
      interested_count: 45,
      attending_count: 23
    },
    {
      id: 2,
      title: "Economic Forum - Freeport",
      description: "Discussion on economic development and job creation opportunities in Grand Bahama.",
      date_time: "2024-12-28T14:00:00",
      location: "Grand Bahama Convention Centre",
      event_type: "Forum",
      is_live_streamed: false,
      interested_count: 32,
      attending_count: 18
    },
    {
      id: 3,
      title: "Infrastructure Town Hall",
      description: "Community input session on infrastructure improvements and development projects.",
      date_time: "2024-12-30T19:00:00",
      location: "Eleuthera Community Center",
      event_type: "Town Hall",
      is_live_streamed: true,
      interested_count: 28,
      attending_count: 15
    },
    {
      id: 4,
      title: "Youth Leadership Summit",
      description: "Empowering young Bahamians to become tomorrow's leaders through workshops and networking.",
      date_time: "2025-01-05T10:00:00",
      location: "University of The Bahamas, Nassau",
      event_type: "Summit",
      is_live_streamed: true,
      interested_count: 67,
      attending_count: 34
    },
    {
      id: 5,
      title: "Healthcare Information Session",
      description: "Learn about new healthcare initiatives and how they benefit Bahamian families.",
      date_time: "2025-01-08T16:00:00",
      location: "Abaco Community Center",
      event_type: "Information Session",
      is_live_streamed: false,
      interested_count: 41,
      attending_count: 22
    }
  ]

  // API Functions using Mock API Service
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const data = await mockApi.fetchDashboardStats()
      setDashboardStats({
        activeMembers: data.activeMembers,
        upcomingEvents: data.upcomingEvents
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setMessage('Error loading dashboard data. Please try again.')
      setTimeout(() => setMessage(''), 3000)
      setDashboardStats({ activeMembers: 3, upcomingEvents: 5 })
    } finally {
      setLoading(false)
    }
  }

  const fetchNews = async () => {
    try {
      setLoading(true)
      const data = await mockApi.fetchNews()
      setNews(data)
    } catch (error) {
      console.error('Error fetching news:', error)
      setMessage('Error loading news. Please try again.')
      setTimeout(() => setMessage(''), 3000)
      setNews(demoNews)
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await mockApi.fetchEvents()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      setMessage('Error loading events. Please try again.')
      setTimeout(() => setMessage(''), 3000)
      setEvents(demoEvents)
    } finally {
      setLoading(false)
    }
  }

  // Enhanced interaction functions using Mock API
  const handleLike = async (newsId) => {
    try {
      const result = await mockApi.likeNews(newsId)
      if (result.success) {
        const updatedNews = news.map(item => {
          if (item.id === newsId) {
            return { ...item, likes: result.likes }
          }
          return item
        })
        setNews(updatedNews)
        setMessage('Post liked! 👍')
        setTimeout(() => setMessage(''), 2000)
      }
    } catch (error) {
      console.error('Error liking post:', error)
      setMessage('Error liking post. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleComment = async (newsId) => {
    if (!newComment.trim()) return
    
    try {
      const result = await mockApi.addComment(newsId, newComment)
      if (result.success) {
        const updatedNews = news.map(item => {
          if (item.id === newsId) {
            return { 
              ...item, 
              comments: [...(item.comments || []), result.comment]
            }
          }
          return item
        })
        setNews(updatedNews)
        setNewComment('')
        setMessage('Comment added! 💬')
        setTimeout(() => setMessage(''), 2000)
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      setMessage('Error adding comment. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleRSVP = async (eventId, action) => {
    // Check if user needs to be logged in for RSVP
    if (isGuest) {
      setMessage('Please sign up or log in to RSVP for events!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const result = await mockApi.rsvpEvent(eventId, action)
      if (result.success) {
        const updatedEvents = events.map(event => {
          if (event.id === eventId) {
            return { 
              ...event, 
              attending_count: result.attending,
              interested_count: result.interested
            }
          }
          return event
        })
        setEvents(updatedEvents)
        setMessage(action === 'rsvp' ? 'RSVP confirmed! 🎉' : 'Marked as interested! ⭐')
        setTimeout(() => setMessage(''), 2000)
      }
    } catch (error) {
      console.error('Error with RSVP:', error)
      setMessage('Error updating RSVP. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleContinueAsGuest = () => {
    setIsGuest(true)
    setCurrentView('dashboard')
    fetchDashboardStats()
    fetchNews()
    fetchEvents()
  }

  const handleDonationSuccess = (donation) => {
    setMessage(`Thank you for your $${donation.amount} donation! 🙏`)
    setTimeout(() => setMessage(''), 5000)
  }

  const handleVolunteerSuccess = (application) => {
    setMessage('Thank you for volunteering! We will be in touch soon. 🤝')
    setTimeout(() => setMessage(''), 5000)
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      setMessage('Please fill in all required fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (signupForm.password.length < 6) {
      setMessage('Password must be at least 6 characters long')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (!signupForm.email.includes('@')) {
      setMessage('Please enter a valid email address')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setLoading(true)
    try {
      const result = await mockApi.register(signupForm)
      
      if (result.success) {
        setUser(result.user)
        setIsGuest(false)
        setMessage(`Welcome to PLP, ${result.user.name}! 🎉`)
        setTimeout(() => setMessage(''), 3000)
        setCurrentView('dashboard')
        
        // Reset form
        setSignupForm({
          name: '',
          email: '',
          password: '',
          age: '',
          votingDistrict: ''
        })
        
        // Load dashboard data
        fetchDashboardStats()
        fetchNews()
        fetchEvents()
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    
    if (!loginForm.email || !loginForm.password) {
      setMessage('Please fill in all fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setLoading(true)
    try {
      const result = await mockApi.login(loginForm.email, loginForm.password)
      
      if (result.success) {
        setUser(result.user)
        setIsGuest(false)
        setMessage(`Welcome back, ${result.user.name}! 👋`)
        setTimeout(() => setMessage(''), 3000)
        setCurrentView('dashboard')
        
        // Reset form
        setLoginForm({
          email: '',
          password: ''
        })
        
        // Load dashboard data
        fetchDashboardStats()
        fetchNews()
        fetchEvents()
      } else {
        setMessage('Invalid email or password')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Login failed. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await mockApi.logout()
      setUser(null)
      setIsGuest(false)
      setCurrentView('welcome')
      setMessage('You have been logged out')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatEventDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      'HEALTHCARE': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'COMMUNITY': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      'EMPLOYMENT': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      'INFRASTRUCTURE': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      'ENVIRONMENT': 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      'EDUCATION': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)'
    }
    return colors[category] || 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
  }

  const getEventTypeColor = (type) => {
    const colors = {
      'Rally': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      'Forum': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      'Town Hall': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'Summit': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      'Information Session': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    }
    return colors[type] || 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
  }

  // Welcome Screen
  if (currentView === 'welcome') {
    return (
      <div className="iphone-mockup">
        <div className="plp-app">
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <div className="main-content">
          <div className="welcome-screen">
          <img 
            src={plpLogo} 
            alt="PLP Logo" 
            className="welcome-logo"
          />
          <h1 className="welcome-title">PLP</h1>
          <p className="welcome-subtitle">
            Believe in The Bahamas
          </p>
          <p className="welcome-subtitle">
            Stay connected with your community, get the latest news, and participate in building a better Bahamas.
          </p>
          
          <div className="welcome-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentView('signup')}
            >
              👤 Sign Up
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('login')}
            >
              🔑 Log In
            </button>
            <button 
              className="btn btn-ghost"
              onClick={handleContinueAsGuest}
            >
              👁️ Continue as Guest
            </button>
          </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  // Sign Up Screen
  if (currentView === 'signup') {
    return (
      <div className="iphone-mockup">
        <div className="plp-app">
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <div className="main-content">
          <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Join the PLP Community</h2>
            <p className="form-subtitle">Create your account to stay connected</p>
          </div>
          
          {message && <div className={`message ${message.includes('Error') || message.includes('failed') ? 'error' : 'success'}`}>{message}</div>}
          {loading && <div className="loading-indicator">Creating account...</div>}
          
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter your full name"
                value={signupForm.name}
                onChange={(e) => setSignupForm(prev => ({...prev, name: e.target.value}))}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e) => setSignupForm(prev => ({...prev, email: e.target.value}))}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Create a password (min 6 characters)"
                value={signupForm.password}
                onChange={(e) => setSignupForm(prev => ({...prev, password: e.target.value}))}
                minLength="6"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                className="form-input age-input" 
                placeholder="Age" 
                min="18" 
                max="100"
                value={signupForm.age}
                onChange={(e) => setSignupForm(prev => ({...prev, age: e.target.value}))}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Voting District</label>
              <select 
                className="form-select"
                value={signupForm.votingDistrict}
                onChange={(e) => setSignupForm(prev => ({...prev, votingDistrict: e.target.value}))}
              >
                <option value="">Select your voting district</option>
                <option value="Nassau Central">Nassau Central</option>
                <option value="Nassau East">Nassau East</option>
                <option value="Nassau West">Nassau West</option>
                <option value="Freeport">Freeport</option>
                <option value="Eleuthera">Eleuthera</option>
                <option value="Abaco">Abaco</option>
                <option value="Exuma">Exuma</option>
                <option value="Andros">Andros</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%', marginBottom: '1rem'}}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-ghost" 
              style={{width: '100%'}}
              onClick={() => setCurrentView('welcome')}
            >
              Back to Welcome
            </button>
          </form>
          </div>
        </div>
        </div>
      </div>
    )
  }

  // Login Screen
  if (currentView === 'login') {
    return (
      <div className="iphone-mockup">
        <div className="plp-app">
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <div className="main-content">
          <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Sign in to your PLP account</p>
          </div>
          
          {message && <div className={`message ${message.includes('Error') || message.includes('failed') || message.includes('Invalid') ? 'error' : 'success'}`}>{message}</div>}
          {loading && <div className="loading-indicator">Signing in...</div>}
          
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%', marginBottom: '1rem'}}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-ghost" 
              style={{width: '100%'}}
              onClick={() => setCurrentView('welcome')}
            >
              Back to Welcome
            </button>
          </form>
          </div>
        </div>
        </div>
      </div>
    )
  }

  // Main App with Bottom Navigation
  return (
    <div className="iphone-mockup">
      <div className="plp-app">
      <div className="status-bar">
        <span className="status-time">9:41</span>
        <div className="status-icons">
          <button 
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="main-content">
        {/* Dashboard */}
        {currentView === 'dashboard' && (
        <ScreenContainer>
          <div className="fade-in">
            <div className="dashboard-header">
              <img src={plpLogo} alt="PLP Logo" className="dashboard-logo" />
              <h1 className="dashboard-title">Welcome {isGuest ? 'Guest' : user?.name || 'Member'}!</h1>
              <p className="dashboard-subtitle">Stay connected with your PLP community</p>
            </div>

            {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
            {loading && <div className="loading-indicator">Loading...</div>}

            <div className="scrollable-content">

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{dashboardStats.activeMembers}</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{dashboardStats.upcomingEvents}</div>
              <div className="stat-label">Upcoming Events</div>
            </div>
          </div>

          <div className="news-section">
            <h2 className="section-title">Latest News</h2>
            <div className="news-list">
              {news.slice(0, 3).map(item => (
                <div key={item.id} className="news-card">
                  <div 
                    className="news-category"
                    style={{ background: getCategoryColor(item.category) }}
                  >
                    {item.category}
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.content}</p>
                  <div className="news-meta">
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="news-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleLike(item.id)}
                    >
                      ❤️ {item.likes}
                    </button>
                    <button className="action-btn">
                      💬 {item.comments?.length || 0}
                    </button>
                    <button className="action-btn">
                      📤 {item.shares}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
          </div>
        </ScreenContainer>
      )}

      {/* News */}
      {currentView === 'news' && (
        <ScreenContainer>
          <div className="fade-in">
            <h2 className="section-title">Latest News</h2>
            
            {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
            {loading && <div className="loading-indicator">Loading news...</div>}

            <div className="scrollable-content">
          
          <div className="news-list">
            {news.map(item => (
              <div key={item.id} className="news-card">
                <div 
                  className="news-category"
                  style={{ background: getCategoryColor(item.category) }}
                >
                  {item.category}
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.content}</p>
                <div className="news-meta">
                  <span>{formatDate(item.date)}</span>
                </div>
                <div className="news-actions">
                  <button 
                    className="action-btn"
                    onClick={() => handleLike(item.id)}
                  >
                    ❤️ {item.likes}
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => setShowComments({...showComments, [item.id]: !showComments[item.id]})}
                  >
                    💬 {item.comments?.length || 0}
                  </button>
                  <button className="action-btn">
                    📤 {item.shares}
                  </button>
                </div>
                
                {showComments[item.id] && (
                  <div className="comments-section">
                    <div className="comments-list">
                      {item.comments?.map(comment => (
                        <div key={comment.id} className="comment">
                          <div className="comment-author">{comment.author}</div>
                          <div className="comment-text">{comment.text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="comment-form">
                      <input
                        type="text"
                        className="comment-input"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button 
                        className="comment-submit"
                        onClick={() => handleComment(item.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
            </div>
          </div>
        </ScreenContainer>
      )}

      {/* Events */}
      {currentView === 'events' && (
        <ScreenContainer>
          <div className="fade-in">
            <h2 className="section-title">Upcoming Events</h2>
            
            {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
            {loading && <div className="loading-indicator">Loading events...</div>}
            
            <div className="scrollable-content">
              {events.length > 0 ? (
                <div className="events-list">
                  {events.map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onRSVP={handleRSVP}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📅</div>
                  <h3 className="empty-state-title">No Events Available</h3>
                  <p className="empty-state-description">
                    Check back later for upcoming PLP events and community gatherings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScreenContainer>
      )}

      {/* Live */}
      {currentView === 'live' && (
        <ScreenContainer>
          <div className="dashboard fade-in">
          <h2 className="section-title">Live Streaming</h2>
          <div className="news-card">
            <h3 className="news-title">No Live Streams Currently</h3>
            <p className="news-excerpt">Check back later for live events and town halls.</p>
            <div className="news-section">
              <h3>Upcoming Live Events:</h3>
              {events.filter(event => event.is_live_streamed).map(event => (
                <div key={event.id} className="news-card" style={{marginTop: '1rem'}}>
                  <h4>{event.title}</h4>
                  <p>{formatEventDateTime(event.date_time)}</p>
                  <p>{event.location}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </ScreenContainer>
      )}

      {/* Profile */}
      {currentView === 'profile' && (
        <ScreenContainer>
          <div className="dashboard fade-in">
          <h2 className="section-title">Profile</h2>
          <div className="news-card">
            <h3 className="news-title">{isGuest ? 'Guest User' : user?.name || 'Your Profile'}</h3>
            <p className="news-excerpt">
              {isGuest 
                ? 'You are browsing as a guest. Sign up to access full features!' 
                : `Welcome back, ${user?.name}! Manage your account settings and stay connected with the PLP community.`}
            </p>
            
            {user && !isGuest && (
              <div style={{marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', marginBottom: '1rem'}}>
                <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--primary)'}}>Account Details</h4>
                <p style={{margin: '0.25rem 0', fontSize: '0.875rem'}}><strong>Email:</strong> {user.email}</p>
                {user.age && <p style={{margin: '0.25rem 0', fontSize: '0.875rem'}}><strong>Age:</strong> {user.age}</p>}
                {user.votingDistrict && <p style={{margin: '0.25rem 0', fontSize: '0.875rem'}}><strong>District:</strong> {user.votingDistrict}</p>}
                <p style={{margin: '0.25rem 0', fontSize: '0.875rem'}}><strong>Member since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
                <p style={{margin: '0.25rem 0', fontSize: '0.875rem'}}><strong>Status:</strong> {user.verified ? '✅ Verified' : '⏳ Pending Verification'}</p>
              </div>
            )}

            {isGuest && (
              <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentView('signup')}
                  style={{marginRight: '0.5rem', marginBottom: '0.5rem'}}
                >
                  Sign Up
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setCurrentView('login')}
                  style={{marginBottom: '0.5rem'}}
                >
                  Log In
                </button>
              </div>
            )}

            {user && !isGuest && (
              <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <button 
                  className="btn btn-ghost"
                  onClick={handleLogout}
                  style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
                >
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>

          {/* Community Actions */}
          <div className="news-card">
            <h3 className="news-title">Get Involved</h3>
            <p className="news-excerpt">Support the PLP and help build a better Bahamas for everyone.</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem'}}>
              <button 
                className="btn btn-primary"
                onClick={() => setShowDonationForm(true)}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
              >
                💰 Make a Donation
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setShowVolunteerForm(true)}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
              >
                🤝 Volunteer with Us
              </button>
              
              <button 
                className="btn btn-ghost"
                onClick={() => setCurrentView('events')}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
              >
                📅 View Events
              </button>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="news-card">
            <h3 className="news-title">Share & Connect</h3>
            <p className="news-excerpt">Spread the word about PLP initiatives on social media.</p>
            
            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap'}}>
              <button 
                className="btn btn-ghost"
                onClick={() => setMessage('Shared to Facebook! 📘')}
                style={{flex: '1', minWidth: '120px'}}
              >
                📘 Facebook
              </button>
              <button 
                className="btn btn-ghost"
                onClick={() => setMessage('Shared to Instagram! 📷')}
                style={{flex: '1', minWidth: '120px'}}
              >
                📷 Instagram
              </button>
              <button 
                className="btn btn-ghost"
                onClick={() => setMessage('Shared to Twitter! 🐦')}
                style={{flex: '1', minWidth: '120px'}}
              >
                🐦 Twitter
              </button>
            </div>
          </div>
          </div>
        </ScreenContainer>
      )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'news' ? 'active' : ''}`}
          onClick={() => setCurrentView('news')}
        >
          <span className="nav-icon">📰</span>
          <span>News</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'events' ? 'active' : ''}`}
          onClick={() => setCurrentView('events')}
        >
          <span className="nav-icon">📅</span>
          <span>Events</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'live' ? 'active' : ''}`}
          onClick={() => setCurrentView('live')}
        >
          <span className="nav-icon">📺</span>
          <span>Live</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentView('profile')}
        >
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </button>
      </div>

      {/* Modal Forms */}
      {showDonationForm && (
        <DonationForm
          onClose={() => setShowDonationForm(false)}
          onSuccess={handleDonationSuccess}
        />
      )}

      {showVolunteerForm && (
        <VolunteerForm
          onClose={() => setShowVolunteerForm(false)}
          onSuccess={handleVolunteerSuccess}
        />
      )}
      </div>
    </div>
  )
}

export default App

