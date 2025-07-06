from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    application_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected, active, inactive
    skills = db.Column(db.Text, nullable=True)  # JSON string
    availability = db.Column(db.Text, nullable=True)  # JSON string
    interests = db.Column(db.Text, nullable=True)  # JSON string
    emergency_contact = db.Column(db.String(100), nullable=True)
    emergency_phone = db.Column(db.String(20), nullable=True)
    background_check = db.Column(db.Boolean, default=False)
    orientation_completed = db.Column(db.Boolean, default=False)
    total_hours = db.Column(db.Float, default=0.0)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('volunteer_profile', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'application_date': self.application_date.isoformat() if self.application_date else None,
            'status': self.status,
            'skills': self.skills,
            'availability': self.availability,
            'interests': self.interests,
            'emergency_contact': self.emergency_contact,
            'emergency_phone': self.emergency_phone,
            'background_check': self.background_check,
            'orientation_completed': self.orientation_completed,
            'total_hours': self.total_hours,
            'user_name': self.user.full_name if self.user else None
        }

class VolunteerOpportunity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    duration_hours = db.Column(db.Float, nullable=False)
    max_volunteers = db.Column(db.Integer, nullable=False)
    skills_required = db.Column(db.Text, nullable=True)  # JSON string
    contact_person = db.Column(db.String(100), nullable=True)
    contact_phone = db.Column(db.String(20), nullable=True)
    contact_email = db.Column(db.String(120), nullable=True)
    status = db.Column(db.String(20), default='open')  # open, closed, cancelled, completed
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('created_opportunities', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'date_time': self.date_time.isoformat() if self.date_time else None,
            'duration_hours': self.duration_hours,
            'max_volunteers': self.max_volunteers,
            'skills_required': self.skills_required,
            'contact_person': self.contact_person,
            'contact_phone': self.contact_phone,
            'contact_email': self.contact_email,
            'status': self.status,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'volunteers_signed_up': len(self.volunteer_signups) if hasattr(self, 'volunteer_signups') else 0
        }

class VolunteerSignup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteer.id'), nullable=False)
    opportunity_id = db.Column(db.Integer, db.ForeignKey('volunteer_opportunity.id'), nullable=False)
    signup_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='signed_up')  # signed_up, confirmed, completed, no_show
    hours_completed = db.Column(db.Float, default=0.0)
    feedback = db.Column(db.Text, nullable=True)
    
    # Relationships
    volunteer = db.relationship('Volunteer', backref=db.backref('signups', lazy=True))
    opportunity = db.relationship('VolunteerOpportunity', backref=db.backref('volunteer_signups', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'volunteer_id': self.volunteer_id,
            'opportunity_id': self.opportunity_id,
            'signup_date': self.signup_date.isoformat() if self.signup_date else None,
            'status': self.status,
            'hours_completed': self.hours_completed,
            'feedback': self.feedback,
            'volunteer_name': self.volunteer.user.full_name if self.volunteer and self.volunteer.user else None
        }