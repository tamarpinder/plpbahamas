from flask import Flask
from src.models.user import db, User, News, Event, RSVP, NewsInteraction, Comment
from datetime import datetime, timedelta
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///plp_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    # Create the test user with specified credentials
    test_user = User(
        full_name="Test User",
        email="test@email.com",
        password="12345678",
        phone="+1-242-555-1234",
        voting_district="Nassau Central",
        age=30,
        gender="Other",
        interests=json.dumps(["Healthcare", "Education", "Economy"]),
        notification_preferences=json.dumps({})
    )
    db.session.add(test_user)
    
    # Add some demo users with passwords
    demo_users = [
        {
            "full_name": "Marcus Johnson",
            "email": "marcus.johnson@email.com",
            "password": "password123",
            "phone": "+1-242-555-0001",
            "voting_district": "Nassau East",
            "age": 34,
            "gender": "Male",
            "interests": ["Healthcare", "Economy"]
        },
        {
            "full_name": "Sophia Williams",
            "email": "sophia.williams@email.com", 
            "password": "password123",
            "phone": "+1-242-555-0002",
            "voting_district": "Freeport West",
            "age": 28,
            "gender": "Female",
            "interests": ["Education", "Environment"]
        },
        {
            "full_name": "David Thompson",
            "email": "david.thompson@email.com",
            "password": "password123", 
            "phone": "+1-242-555-0003",
            "voting_district": "Eleuthera Central",
            "age": 45,
            "gender": "Male",
            "interests": ["Infrastructure", "Tourism"]
        }
    ]
    
    for user_data in demo_users:
        user = User(
            full_name=user_data["full_name"],
            email=user_data["email"],
            password=user_data["password"],
            phone=user_data["phone"],
            voting_district=user_data["voting_district"],
            age=user_data["age"],
            gender=user_data["gender"],
            interests=json.dumps(user_data["interests"]),
            notification_preferences=json.dumps({})
        )
        db.session.add(user)
    
    # Add demo news
    news_items = [
        {
            "title": "PLP Launches New Healthcare Initiative",
            "summary": "Comprehensive healthcare reform to benefit all Bahamians",
            "content": "The Progressive Liberal Party announces a groundbreaking healthcare initiative that will provide universal coverage for all Bahamian citizens. This comprehensive reform includes expanded clinic hours, new medical facilities, and partnerships with international healthcare providers.",
            "author": "PLP Communications Team",
            "category": "Healthcare",
            "likes_count": 45,
            "comments_count": 12,
            "shares_count": 18
        },
        {
            "title": "Community Town Hall Success in Nassau",
            "summary": "Record attendance at recent community engagement event",
            "content": "Over 500 residents attended the PLP community town hall in Nassau, discussing local infrastructure improvements, job creation, and educational opportunities. The event highlighted the party's commitment to grassroots engagement and community-driven solutions.",
            "author": "Community Outreach Team",
            "category": "Community",
            "likes_count": 67,
            "comments_count": 25,
            "shares_count": 22
        },
        {
            "title": "Youth Employment Program Expansion",
            "summary": "New opportunities for young Bahamians entering the workforce",
            "content": "The PLP announces the expansion of its youth employment program, creating 1,000 new job opportunities for Bahamians aged 18-25. The program includes skills training, mentorship, and partnerships with local businesses to ensure sustainable career paths.",
            "author": "Youth Development Team",
            "category": "Employment",
            "likes_count": 89,
            "comments_count": 34,
            "shares_count": 41
        },
        {
            "title": "Infrastructure Investment in Family Islands",
            "summary": "Major improvements planned for transportation and utilities",
            "content": "A $50 million infrastructure investment will improve roads, bridges, and utility services across the Family Islands. This initiative demonstrates the PLP's commitment to ensuring all Bahamians have access to modern infrastructure regardless of their location.",
            "author": "Infrastructure Team",
            "category": "Infrastructure",
            "likes_count": 72,
            "comments_count": 19,
            "shares_count": 28
        },
        {
            "title": "Environmental Protection Measures",
            "summary": "New policies to preserve Bahamian natural resources",
            "content": "The PLP introduces comprehensive environmental protection measures including marine conservation zones, renewable energy incentives, and plastic reduction initiatives. These policies aim to preserve The Bahamas' natural beauty for future generations.",
            "author": "Environmental Team",
            "category": "Environment",
            "likes_count": 56,
            "comments_count": 16,
            "shares_count": 31
        },
        {
            "title": "Education Technology Initiative",
            "summary": "Digital learning tools for Bahamian students",
            "content": "The PLP launches a comprehensive education technology initiative providing tablets, high-speed internet, and digital learning platforms to students across The Bahamas. This investment in educational technology will prepare students for the digital economy.",
            "author": "Education Team",
            "category": "Education",
            "likes_count": 94,
            "comments_count": 28,
            "shares_count": 37
        }
    ]
    
    for news_data in news_items:
        news = News(
            title=news_data["title"],
            summary=news_data["summary"],
            content=news_data["content"],
            author=news_data["author"],
            category=news_data["category"],
            likes_count=news_data["likes_count"],
            comments_count=news_data["comments_count"],
            shares_count=news_data["shares_count"],
            is_published=True,
            publication_date=datetime.utcnow() - timedelta(days=news_data.get("days_ago", 1))
        )
        db.session.add(news)
    
    # Add demo events
    events_data = [
        {
            "title": "Community Rally - Nassau",
            "description": "Join us for a community rally discussing healthcare, education, and economic opportunities for all Bahamians.",
            "date_time": datetime.utcnow() + timedelta(days=7),
            "location": "Clifford Park, Nassau",
            "event_type": "Rally",
            "is_live_streamed": True,
            "live_stream_url": "https://live.plp.bs/rally-nassau",
            "max_attendees": 1000,
            "rsvp_count": 234,
            "interested_count": 456
        },
        {
            "title": "Economic Forum - Freeport",
            "description": "Interactive discussion on infrastructure development and sustainable tourism.",
            "date_time": datetime.utcnow() + timedelta(days=14),
            "location": "Grand Bahama Convention Centre",
            "event_type": "Forum",
            "is_live_streamed": True,
            "live_stream_url": "https://live.plp.bs/forum-freeport",
            "max_attendees": 500,
            "rsvp_count": 156,
            "interested_count": 289
        },
        {
            "title": "Infrastructure Town Hall - Eleuthera",
            "description": "Community meeting focused on infrastructure improvements and local development projects.",
            "date_time": datetime.utcnow() + timedelta(days=21),
            "location": "Eleuthera Community Center",
            "event_type": "Town Hall",
            "is_live_streamed": False,
            "max_attendees": 200,
            "rsvp_count": 89,
            "interested_count": 134
        },
        {
            "title": "Youth Leadership Summit",
            "description": "Empowering young Bahamians through leadership training and networking opportunities.",
            "date_time": datetime.utcnow() + timedelta(days=28),
            "location": "University of The Bahamas",
            "event_type": "Summit",
            "is_live_streamed": True,
            "live_stream_url": "https://live.plp.bs/youth-summit",
            "max_attendees": 300,
            "rsvp_count": 178,
            "interested_count": 267
        },
        {
            "title": "Healthcare Policy Discussion",
            "description": "Open forum on healthcare reforms and community health initiatives.",
            "date_time": datetime.utcnow() + timedelta(days=35),
            "location": "Princess Margaret Hospital Conference Room",
            "event_type": "Discussion",
            "is_live_streamed": False,
            "max_attendees": 150,
            "rsvp_count": 67,
            "interested_count": 98
        }
    ]
    
    for event_data in events_data:
        event = Event(
            title=event_data["title"],
            description=event_data["description"],
            date_time=event_data["date_time"],
            location=event_data["location"],
            event_type=event_data["event_type"],
            is_live_streamed=event_data["is_live_streamed"],
            live_stream_url=event_data.get("live_stream_url"),
            max_attendees=event_data["max_attendees"],
            interested_count=event_data["interested_count"],
            attending_count=event_data["rsvp_count"],
            created_by="PLP Admin",
            is_active=True
        )
        db.session.add(event)
    
    db.session.commit()
    print("Database seeded successfully with test user (test@email.com / 12345678) and demo data!")

