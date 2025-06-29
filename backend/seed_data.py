from flask import Flask
from flask_cors import CORS
from src.models.user import db, User, News, Event, RSVP, NewsInteraction, Comment
from datetime import datetime, timedelta
import json

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///plp_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'plp-demo-secret-key'
    
    db.init_app(app)
    CORS(app)
    
    return app

def seed_database():
    # Create all tables
    db.create_all()
    
    # Clear existing data
    db.session.query(Comment).delete()
    db.session.query(NewsInteraction).delete()
    db.session.query(RSVP).delete()
    db.session.query(News).delete()
    db.session.query(Event).delete()
    db.session.query(User).delete()
    
    # Create demo users
    users = [
        User(
            full_name="Marcus Johnson",
            email="marcus.johnson@email.com",
            phone="+1-242-555-0101",
            voting_district="Nassau East",
            age=34,
            gender="Male",
            interests=json.dumps(["Healthcare", "Education", "Economy"]),
            notification_preferences=json.dumps({"news": True, "events": True})
        ),
        User(
            full_name="Sophia Williams",
            email="sophia.williams@email.com",
            phone="+1-242-555-0102",
            voting_district="Freeport West",
            age=28,
            gender="Female",
            interests=json.dumps(["Community", "Environment", "Youth Programs"]),
            notification_preferences=json.dumps({"news": True, "events": True})
        ),
        User(
            full_name="David Thompson",
            email="david.thompson@email.com",
            phone="+1-242-555-0103",
            voting_district="Eleuthera Central",
            age=45,
            gender="Male",
            interests=json.dumps(["Infrastructure", "Tourism", "Employment"]),
            notification_preferences=json.dumps({"news": True, "events": False})
        ),
        User(
            full_name="Maria Rodriguez",
            email="maria.rodriguez@email.com",
            phone="+1-242-555-0104",
            voting_district="Nassau West",
            age=31,
            gender="Female",
            interests=json.dumps(["Healthcare", "Women's Rights", "Education"]),
            notification_preferences=json.dumps({"news": True, "events": True})
        ),
        User(
            full_name="James Brown",
            email="james.brown@email.com",
            phone="+1-242-555-0105",
            voting_district="Abaco North",
            age=52,
            gender="Male",
            interests=json.dumps(["Economy", "Infrastructure", "Hurricane Recovery"]),
            notification_preferences=json.dumps({"news": True, "events": True})
        ),
        User(
            full_name="Lisa Davis",
            email="lisa.davis@email.com",
            phone="+1-242-555-0106",
            voting_district="Grand Bahama East",
            age=29,
            gender="Female",
            interests=json.dumps(["Youth Programs", "Technology", "Environment"]),
            notification_preferences=json.dumps({"news": True, "events": True})
        )
    ]
    
    for user in users:
        db.session.add(user)
    
    db.session.commit()
    
    # Create demo news articles
    news_articles = [
        News(
            title="PLP Announces New Healthcare Initiative",
            summary="Comprehensive healthcare reform to benefit all Bahamians with improved access and quality care.",
            content="The Progressive Liberal Party today announced a groundbreaking healthcare initiative that will transform medical services across The Bahamas. The comprehensive plan includes new medical facilities, expanded insurance coverage, and partnerships with international healthcare providers to ensure world-class treatment for all Bahamians.",
            author="Hon. Philip Davis",
            publication_date=datetime.utcnow() - timedelta(days=1),
            category="Healthcare",
            tags=json.dumps(["healthcare", "reform", "insurance", "medical"]),
            likes_count=45,
            comments_count=12,
            shares_count=8,
            is_featured=True
        ),
        News(
            title="Town Hall Meeting Success in Nassau",
            summary="Over 500 residents attended the community forum discussing education and economic development.",
            content="Last night's town hall meeting in Nassau drew an impressive crowd of over 500 concerned citizens eager to discuss the future of education and economic development in their community. The event featured presentations from education officials, local business leaders, and community advocates.",
            author="PLP Communications Team",
            publication_date=datetime.utcnow() - timedelta(days=2),
            category="Community",
            tags=json.dumps(["town hall", "education", "economy", "nassau"]),
            likes_count=32,
            comments_count=18,
            shares_count=15,
            is_featured=False
        ),
        News(
            title="Youth Employment Program Launch",
            summary="New initiative to create 1,000 jobs for young Bahamians in technology and tourism sectors.",
            content="The PLP government is proud to announce the launch of an ambitious youth employment program designed to create 1,000 new job opportunities for young Bahamians. The program focuses on high-growth sectors including technology, digital marketing, hospitality, and sustainable tourism.",
            author="Minister of Youth Development",
            publication_date=datetime.utcnow() - timedelta(days=3),
            category="Employment",
            tags=json.dumps(["youth", "employment", "technology", "tourism"]),
            likes_count=67,
            comments_count=25,
            shares_count=22,
            is_featured=True
        ),
        News(
            title="Infrastructure Investment in Family Islands",
            summary="Major funding approved for road improvements and utility upgrades across the Family Islands.",
            content="The government has approved significant infrastructure investment for the Family Islands, including road improvements, utility upgrades, and enhanced telecommunications infrastructure. This investment will improve quality of life and support economic development in these vital communities.",
            author="Minister of Public Works",
            publication_date=datetime.utcnow() - timedelta(days=4),
            category="Infrastructure",
            tags=json.dumps(["infrastructure", "family islands", "roads", "utilities"]),
            likes_count=28,
            comments_count=9,
            shares_count=12,
            is_featured=False
        ),
        News(
            title="Environmental Protection Initiative Launched",
            summary="New program to protect marine ecosystems and promote sustainable tourism practices.",
            content="The PLP government has launched a comprehensive environmental protection initiative focused on preserving The Bahamas' pristine marine ecosystems while promoting sustainable tourism practices. The program includes marine protected areas, coral reef restoration, and eco-tourism development.",
            author="Minister of Environment",
            publication_date=datetime.utcnow() - timedelta(days=5),
            category="Environment",
            tags=json.dumps(["environment", "marine", "tourism", "sustainability"]),
            likes_count=41,
            comments_count=14,
            shares_count=19,
            is_featured=False
        ),
        News(
            title="Education Technology Upgrade Program",
            summary="Schools across The Bahamas to receive new computers and high-speed internet access.",
            content="A major education technology upgrade program will bring new computers, tablets, and high-speed internet access to schools across The Bahamas. This initiative aims to prepare students for the digital economy and ensure equal access to educational technology.",
            author="Minister of Education",
            publication_date=datetime.utcnow() - timedelta(days=6),
            category="Education",
            tags=json.dumps(["education", "technology", "schools", "digital"]),
            likes_count=53,
            comments_count=21,
            shares_count=16,
            is_featured=True
        )
    ]
    
    for news in news_articles:
        db.session.add(news)
    
    db.session.commit()
    
    # Create demo events
    events = [
        Event(
            title="Community Rally - Freeport",
            description="Join us for an evening of unity and progress as we discuss our vision for Grand Bahama.",
            date_time=datetime.utcnow() + timedelta(days=7),
            location="Freeport Civic Center",
            event_type="rally",
            live_stream_url="https://live.plp.bs/freeport-rally",
            max_attendees=500,
            created_by="PLP Freeport Office",
            is_live_streamed=True,
            interested_count=45,
            attending_count=23
        ),
        Event(
            title="Youth Forum - Nassau",
            description="Engaging with young Bahamians about education, employment, and entrepreneurship opportunities.",
            date_time=datetime.utcnow() + timedelta(days=10),
            location="University of The Bahamas",
            event_type="forum",
            live_stream_url="https://live.plp.bs/youth-forum",
            max_attendees=300,
            created_by="PLP Youth Division",
            is_live_streamed=True,
            interested_count=67,
            attending_count=34
        ),
        Event(
            title="Town Hall - Eleuthera",
            description="Interactive discussion on infrastructure development and sustainable tourism.",
            date_time=datetime.utcnow() + timedelta(days=14),
            location="Governor's Harbour Community Center",
            event_type="town_hall",
            live_stream_url="https://live.plp.bs/eleuthera-townhall",
            max_attendees=200,
            created_by="PLP Eleuthera Office",
            is_live_streamed=True,
            interested_count=32,
            attending_count=18
        ),
        Event(
            title="Healthcare Forum - Nassau",
            description="Discussing the new healthcare initiative and how it will benefit all Bahamians.",
            date_time=datetime.utcnow() + timedelta(days=21),
            location="Nassau Convention Centre",
            event_type="forum",
            live_stream_url="https://live.plp.bs/healthcare-forum",
            max_attendees=400,
            created_by="Ministry of Health",
            is_live_streamed=True,
            interested_count=89,
            attending_count=56
        ),
        Event(
            title="Economic Development Summit",
            description="Bringing together business leaders and government officials to discuss economic growth strategies.",
            date_time=datetime.utcnow() + timedelta(days=28),
            location="Atlantis Paradise Island",
            event_type="summit",
            live_stream_url="https://live.plp.bs/economic-summit",
            max_attendees=150,
            created_by="Ministry of Economic Affairs",
            is_live_streamed=True,
            interested_count=78,
            attending_count=42
        )
    ]
    
    for event in events:
        db.session.add(event)
    
    db.session.commit()
    
    # Create demo comments for news articles
    comments_data = [
        # Comments for Healthcare Initiative (news_id=1)
        {"user_id": 1, "news_id": 1, "text": "This is exactly what The Bahamas needs! Finally, healthcare that works for everyone.", "days_ago": 1},
        {"user_id": 2, "news_id": 1, "text": "Great initiative! Hope to see it implemented quickly in Freeport.", "days_ago": 1},
        {"user_id": 4, "news_id": 1, "text": "As a healthcare worker, I'm excited about these improvements. Long overdue!", "days_ago": 0},
        {"user_id": 5, "news_id": 1, "text": "Will this include mental health services? That's really needed in our communities.", "days_ago": 0},
        
        # Comments for Town Hall Meeting (news_id=2)
        {"user_id": 1, "news_id": 2, "text": "Wish I could have attended! Great turnout shows people care about our future.", "days_ago": 2},
        {"user_id": 3, "news_id": 2, "text": "Education is key to our development. Glad to see it's a priority.", "days_ago": 1},
        {"user_id": 6, "news_id": 2, "text": "500 people! That's amazing community engagement. Keep it up!", "days_ago": 1},
        
        # Comments for Youth Employment (news_id=3)
        {"user_id": 2, "news_id": 3, "text": "This is perfect timing! My son just graduated and needs opportunities like this.", "days_ago": 3},
        {"user_id": 6, "news_id": 3, "text": "Technology jobs are the future. Smart move by the PLP!", "days_ago": 2},
        {"user_id": 1, "news_id": 3, "text": "1,000 jobs is a great start. Hope to see even more programs like this.", "days_ago": 2},
        {"user_id": 4, "news_id": 3, "text": "Tourism and tech - perfect combination for our economy!", "days_ago": 1},
        
        # Comments for Infrastructure Investment (news_id=4)
        {"user_id": 3, "news_id": 4, "text": "About time! The Family Islands deserve better infrastructure.", "days_ago": 4},
        {"user_id": 5, "news_id": 4, "text": "Road improvements will make such a difference for daily life.", "days_ago": 3},
        
        # Comments for Environmental Protection (news_id=5)
        {"user_id": 2, "news_id": 5, "text": "Protecting our reefs is crucial for tourism and fishing. Great initiative!", "days_ago": 5},
        {"user_id": 6, "news_id": 5, "text": "Sustainable tourism is the way forward. Proud of this leadership!", "days_ago": 4},
        {"user_id": 1, "news_id": 5, "text": "Our marine life is our treasure. Thank you for protecting it!", "days_ago": 3},
        
        # Comments for Education Technology (news_id=6)
        {"user_id": 4, "news_id": 6, "text": "My children will benefit so much from this! Technology in every classroom!", "days_ago": 6},
        {"user_id": 3, "news_id": 6, "text": "Digital skills are essential now. This will help our kids compete globally.", "days_ago": 5},
        {"user_id": 5, "news_id": 6, "text": "High-speed internet in schools will change everything. Excellent!", "days_ago": 4}
    ]
    
    for comment_data in comments_data:
        comment = Comment(
            user_id=comment_data["user_id"],
            news_id=comment_data["news_id"],
            comment_text=comment_data["text"],
            comment_date=datetime.utcnow() - timedelta(days=comment_data["days_ago"])
        )
        db.session.add(comment)
    
    # Create some news interactions (likes)
    likes_data = [
        {"user_id": 1, "news_id": 1}, {"user_id": 2, "news_id": 1}, {"user_id": 4, "news_id": 1},
        {"user_id": 1, "news_id": 2}, {"user_id": 3, "news_id": 2},
        {"user_id": 2, "news_id": 3}, {"user_id": 6, "news_id": 3}, {"user_id": 1, "news_id": 3},
        {"user_id": 3, "news_id": 4}, {"user_id": 5, "news_id": 4},
        {"user_id": 2, "news_id": 5}, {"user_id": 6, "news_id": 5},
        {"user_id": 4, "news_id": 6}, {"user_id": 3, "news_id": 6}
    ]
    
    for like_data in likes_data:
        interaction = NewsInteraction(
            user_id=like_data["user_id"],
            news_id=like_data["news_id"],
            interaction_type="like",
            interaction_date=datetime.utcnow() - timedelta(days=1)
        )
        db.session.add(interaction)
    
    # Create some RSVPs
    rsvps_data = [
        {"user_id": 1, "event_id": 1, "status": "attending"},
        {"user_id": 2, "event_id": 1, "status": "interested"},
        {"user_id": 3, "event_id": 1, "status": "attending"},
        {"user_id": 1, "event_id": 2, "status": "interested"},
        {"user_id": 6, "event_id": 2, "status": "attending"},
        {"user_id": 4, "event_id": 2, "status": "interested"},
        {"user_id": 3, "event_id": 3, "status": "attending"},
        {"user_id": 5, "event_id": 3, "status": "interested"}
    ]
    
    for rsvp_data in rsvps_data:
        rsvp = RSVP(
            user_id=rsvp_data["user_id"],
            event_id=rsvp_data["event_id"],
            status=rsvp_data["status"],
            rsvp_date=datetime.utcnow() - timedelta(days=2)
        )
        db.session.add(rsvp)
    
    db.session.commit()
    print("Database seeded successfully with enhanced demo data!")

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_database()

