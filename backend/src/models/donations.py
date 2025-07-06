from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default='USD')
    payment_method = db.Column(db.String(50), nullable=True)
    transaction_id = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed, refunded
    donation_date = db.Column(db.DateTime, default=datetime.utcnow)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaign.id'), nullable=True)
    is_recurring = db.Column(db.Boolean, default=False)
    recurring_frequency = db.Column(db.String(20), nullable=True)  # monthly, quarterly, yearly
    anonymous = db.Column(db.Boolean, default=False)
    message = db.Column(db.Text, nullable=True)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('donations', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'amount': self.amount,
            'currency': self.currency,
            'payment_method': self.payment_method,
            'transaction_id': self.transaction_id,
            'status': self.status,
            'donation_date': self.donation_date.isoformat() if self.donation_date else None,
            'campaign_id': self.campaign_id,
            'is_recurring': self.is_recurring,
            'recurring_frequency': self.recurring_frequency,
            'anonymous': self.anonymous,
            'message': self.message,
            'user_name': self.user.full_name if self.user and not self.anonymous else 'Anonymous'
        }

class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(255), nullable=True)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('created_campaigns', lazy=True))
    donations = db.relationship('Donation', backref=db.backref('campaign', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'goal_amount': self.goal_amount,
            'current_amount': self.current_amount,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_active': self.is_active,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'image_url': self.image_url,
            'progress_percentage': (self.current_amount / self.goal_amount * 100) if self.goal_amount > 0 else 0,
            'donations_count': len(self.donations) if self.donations else 0
        }