from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    questions = db.Column(db.Text, nullable=False)  # JSON string
    is_active = db.Column(db.Boolean, default=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    target_responses = db.Column(db.Integer, default=100)
    
    # Relationships
    creator = db.relationship('User', backref=db.backref('created_surveys', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'questions': self.questions,
            'is_active': self.is_active,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'target_responses': self.target_responses,
            'response_count': len(self.responses) if hasattr(self, 'responses') else 0
        }

class SurveyResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    survey_id = db.Column(db.Integer, db.ForeignKey('survey.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    responses = db.Column(db.Text, nullable=False)  # JSON string
    submission_date = db.Column(db.DateTime, default=datetime.utcnow)
    ip_address = db.Column(db.String(45), nullable=True)
    
    # Relationships
    survey = db.relationship('Survey', backref=db.backref('responses', lazy=True))
    user = db.relationship('User', backref=db.backref('survey_responses', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'survey_id': self.survey_id,
            'user_id': self.user_id,
            'responses': self.responses,
            'submission_date': self.submission_date.isoformat() if self.submission_date else None,
            'ip_address': self.ip_address,
            'user_name': self.user.full_name if self.user else 'Anonymous'
        }