from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    voting_district = db.Column(db.String(50), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    interests = db.Column(db.Text, nullable=True)  # JSON string
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    notification_preferences = db.Column(db.Text, nullable=True)  # JSON string
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<User {self.full_name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'voting_district': self.voting_district,
            'age': self.age,
            'gender': self.gender,
            'interests': self.interests,
            'registration_date': self.registration_date.isoformat() if self.registration_date else None,
            'last_active': self.last_active.isoformat() if self.last_active else None,
            'notification_preferences': self.notification_preferences,
            'is_active': self.is_active
        }

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=True)
    author = db.Column(db.String(100), nullable=True)
    publication_date = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String(50), nullable=True)
    tags = db.Column(db.Text, nullable=True)  # JSON string
    featured_image_url = db.Column(db.String(255), nullable=True)
    likes_count = db.Column(db.Integer, default=0)
    comments_count = db.Column(db.Integer, default=0)
    shares_count = db.Column(db.Integer, default=0)
    is_featured = db.Column(db.Boolean, default=False)
    is_published = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<News {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'summary': self.summary,
            'content': self.content,
            'author': self.author,
            'publication_date': self.publication_date.isoformat() if self.publication_date else None,
            'category': self.category,
            'tags': self.tags,
            'featured_image_url': self.featured_image_url,
            'likes_count': self.likes_count,
            'comments_count': self.comments_count,
            'shares_count': self.shares_count,
            'is_featured': self.is_featured,
            'is_published': self.is_published
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    event_type = db.Column(db.String(50), nullable=True)  # town_hall, rally, meeting, etc.
    live_stream_url = db.Column(db.String(255), nullable=True)
    max_attendees = db.Column(db.Integer, nullable=True)
    created_by = db.Column(db.String(100), nullable=True)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    is_live_streamed = db.Column(db.Boolean, default=False)
    interested_count = db.Column(db.Integer, default=0)
    attending_count = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Event {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date_time': self.date_time.isoformat() if self.date_time else None,
            'location': self.location,
            'event_type': self.event_type,
            'live_stream_url': self.live_stream_url,
            'max_attendees': self.max_attendees,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'is_active': self.is_active,
            'is_live_streamed': self.is_live_streamed,
            'interested_count': self.interested_count,
            'attending_count': self.attending_count
        }

class RSVP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)  # attending, not_attending, maybe, interested
    rsvp_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('rsvps', lazy=True))
    event = db.relationship('Event', backref=db.backref('rsvps', lazy=True))

    def __repr__(self):
        return f'<RSVP User:{self.user_id} Event:{self.event_id} Status:{self.status}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'status': self.status,
            'rsvp_date': self.rsvp_date.isoformat() if self.rsvp_date else None
        }

class NewsInteraction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    news_id = db.Column(db.Integer, db.ForeignKey('news.id'), nullable=False)
    interaction_type = db.Column(db.String(20), nullable=False)  # like, comment, share
    interaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    comment_text = db.Column(db.Text, nullable=True)  # Only for comment interactions
    
    # Relationships
    user = db.relationship('User', backref=db.backref('news_interactions', lazy=True))
    news = db.relationship('News', backref=db.backref('interactions', lazy=True))

    def __repr__(self):
        return f'<NewsInteraction User:{self.user_id} News:{self.news_id} Type:{self.interaction_type}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'news_id': self.news_id,
            'interaction_type': self.interaction_type,
            'interaction_date': self.interaction_date.isoformat() if self.interaction_date else None,
            'comment_text': self.comment_text,
            'user_name': self.user.full_name if self.user else None
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    news_id = db.Column(db.Integer, db.ForeignKey('news.id'), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    comment_date = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('comments', lazy=True))
    news = db.relationship('News', backref=db.backref('comments', lazy=True))

    def __repr__(self):
        return f'<Comment User:{self.user_id} News:{self.news_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'news_id': self.news_id,
            'comment_text': self.comment_text,
            'comment_date': self.comment_date.isoformat() if self.comment_date else None,
            'is_active': self.is_active,
            'user_name': self.user.full_name if self.user else None
        }


