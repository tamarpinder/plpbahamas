from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db

# Gamification Models
class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon_url = db.Column(db.String(255), nullable=True)
    badge_type = db.Column(db.String(50), nullable=False)  # engagement, donation, volunteer, event
    requirements = db.Column(db.Text, nullable=True)  # JSON string
    points_required = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    animation_type = db.Column(db.String(50), nullable=True)  # sparkle, fire, lightning, etc.
    created_date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon_url': self.icon_url,
            'badge_type': self.badge_type,
            'requirements': self.requirements,
            'points_required': self.points_required,
            'is_active': self.is_active,
            'animation_type': self.animation_type
        }

class UserBadge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey('badge.id'), nullable=False)
    earned_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('user_badges', lazy=True))
    badge = db.relationship('Badge', backref=db.backref('user_badges', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'badge_id': self.badge_id,
            'earned_date': self.earned_date.isoformat() if self.earned_date else None,
            'badge': self.badge.to_dict() if self.badge else None
        }

class Squad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    max_members = db.Column(db.Integer, default=10)
    total_points = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('created_squads', lazy=True), foreign_keys=[created_by])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'max_members': self.max_members,
            'total_points': self.total_points,
            'is_active': self.is_active
        }

class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)  # login, news_read, event_rsvp, donation, etc.
    activity_data = db.Column(db.Text, nullable=True)  # JSON string for additional data
    points_earned = db.Column(db.Integer, default=0)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('activities', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'activity_type': self.activity_type,
            'activity_data': self.activity_data,
            'points_earned': self.points_earned,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    board_type = db.Column(db.String(50), nullable=False)  # national, constituency, friends, squad
    board_identifier = db.Column(db.String(100), nullable=True)  # constituency name, squad_id, etc.
    points = db.Column(db.Integer, default=0)
    rank = db.Column(db.Integer, default=0)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('leaderboard_entries', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_type': self.board_type,
            'board_identifier': self.board_identifier,
            'points': self.points,
            'rank': self.rank,
            'last_updated': self.last_updated.isoformat() if self.last_updated else None,
            'user_name': self.user.full_name if self.user else None,
            'user_level': self.user.level_name if self.user else None
        }

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    challenge_type = db.Column(db.String(50), nullable=False)  # daily, weekly, monthly, special
    requirements = db.Column(db.Text, nullable=False)  # JSON string
    reward_points = db.Column(db.Integer, default=0)
    reward_badge_id = db.Column(db.Integer, db.ForeignKey('badge.id'), nullable=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('created_challenges', lazy=True))
    reward_badge = db.relationship('Badge', backref=db.backref('challenge_rewards', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'challenge_type': self.challenge_type,
            'requirements': self.requirements,
            'reward_points': self.reward_points,
            'reward_badge_id': self.reward_badge_id,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_active': self.is_active,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None
        }

class UserChallenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'), nullable=False)
    status = db.Column(db.String(20), default='in_progress')  # in_progress, completed, failed
    progress = db.Column(db.Text, nullable=True)  # JSON string
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    completion_date = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('user_challenges', lazy=True))
    challenge = db.relationship('Challenge', backref=db.backref('user_challenges', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'challenge_id': self.challenge_id,
            'status': self.status,
            'progress': self.progress,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None,
            'challenge': self.challenge.to_dict() if self.challenge else None
        }