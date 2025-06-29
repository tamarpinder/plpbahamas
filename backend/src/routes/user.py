from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.user import User, News, Event, RSVP, NewsInteraction, Comment, db
from datetime import datetime
import json

user_bp = Blueprint('user', __name__)

# User Management Routes
@user_bp.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/users', methods=['POST'])
@cross_origin()
def create_user():
    data = request.json
    
    # Check if email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        full_name=data['full_name'],
        email=data['email'],
        phone=data.get('phone'),
        voting_district=data.get('voting_district'),
        age=data.get('age'),
        gender=data.get('gender'),
        interests=json.dumps(data.get('interests', [])),
        notification_preferences=json.dumps(data.get('notification_preferences', {}))
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@user_bp.route('/users/register', methods=['POST'])
@cross_origin()
def register_user():
    data = request.json
    
    # Validate required fields
    if not data.get('fullName') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        full_name=data['fullName'],
        email=data['email'],
        password=data['password'],  # In production, this should be hashed
        phone=data.get('phone'),
        voting_district=data.get('votingDistrict'),
        age=data.get('age'),
        gender=data.get('gender'),
        interests=json.dumps(data.get('interests', [])),
        notification_preferences=json.dumps({})
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@user_bp.route('/users/login', methods=['POST'])
@cross_origin()
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:  # In production, use proper password hashing
        user.last_active = datetime.utcnow()
        db.session.commit()
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@user_bp.route('/users/<int:user_id>', methods=['GET'])
@cross_origin()
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@cross_origin()
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.full_name = data.get('full_name', user.full_name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.voting_district = data.get('voting_district', user.voting_district)
    user.age = data.get('age', user.age)
    user.gender = data.get('gender', user.gender)
    if 'interests' in data:
        user.interests = json.dumps(data['interests'])
    if 'notification_preferences' in data:
        user.notification_preferences = json.dumps(data['notification_preferences'])
    user.last_active = datetime.utcnow()
    db.session.commit()
    return jsonify(user.to_dict())

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

# News Management Routes
@user_bp.route('/news', methods=['GET'])
@cross_origin()
def get_news():
    news_items = News.query.filter_by(is_published=True).order_by(News.publication_date.desc()).all()
    return jsonify([news.to_dict() for news in news_items])

@user_bp.route('/news/<int:news_id>', methods=['GET'])
@cross_origin()
def get_news_item(news_id):
    news = News.query.get_or_404(news_id)
    return jsonify(news.to_dict())

@user_bp.route('/news/<int:news_id>/comments', methods=['GET'])
@cross_origin()
def get_news_comments(news_id):
    comments = Comment.query.filter_by(news_id=news_id, is_active=True).order_by(Comment.comment_date.desc()).all()
    return jsonify([comment.to_dict() for comment in comments])

@user_bp.route('/news/<int:news_id>/comments', methods=['POST'])
@cross_origin()
def add_news_comment(news_id):
    data = request.json
    user_id = data.get('user_id')
    comment_text = data.get('comment_text')
    
    if not user_id or not comment_text:
        return jsonify({'error': 'User ID and comment text required'}), 400
    
    comment = Comment(
        user_id=user_id,
        news_id=news_id,
        comment_text=comment_text
    )
    db.session.add(comment)
    
    # Update comment count
    news = News.query.get(news_id)
    news.comments_count += 1
    
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@user_bp.route('/news/<int:news_id>/like', methods=['POST'])
@cross_origin()
def like_news(news_id):
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400
    
    # Check if already liked
    existing_like = NewsInteraction.query.filter_by(
        user_id=user_id, 
        news_id=news_id, 
        interaction_type='like'
    ).first()
    
    if existing_like:
        # Unlike
        db.session.delete(existing_like)
        news = News.query.get(news_id)
        news.likes_count = max(0, news.likes_count - 1)
        db.session.commit()
        return jsonify({'liked': False, 'likes_count': news.likes_count}), 200
    else:
        # Like
        interaction = NewsInteraction(
            user_id=user_id,
            news_id=news_id,
            interaction_type='like'
        )
        db.session.add(interaction)
        
        news = News.query.get(news_id)
        news.likes_count += 1
        
        db.session.commit()
        return jsonify({'liked': True, 'likes_count': news.likes_count}), 200

@user_bp.route('/news/<int:news_id>/share', methods=['POST'])
@cross_origin()
def share_news(news_id):
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400
    
    interaction = NewsInteraction(
        user_id=user_id,
        news_id=news_id,
        interaction_type='share'
    )
    db.session.add(interaction)
    
    news = News.query.get(news_id)
    news.shares_count += 1
    
    db.session.commit()
    return jsonify({'shared': True, 'shares_count': news.shares_count}), 200

@user_bp.route('/users/<int:user_id>/news/<int:news_id>/liked', methods=['GET'])
@cross_origin()
def check_news_liked(user_id, news_id):
    liked = NewsInteraction.query.filter_by(
        user_id=user_id, 
        news_id=news_id, 
        interaction_type='like'
    ).first() is not None
    return jsonify({'liked': liked})

# Event Management Routes
@user_bp.route('/events', methods=['GET'])
@cross_origin()
def get_events():
    events = Event.query.filter_by(is_active=True).order_by(Event.date_time.asc()).all()
    return jsonify([event.to_dict() for event in events])

@user_bp.route('/events/<int:event_id>', methods=['GET'])
@cross_origin()
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@user_bp.route('/events/<int:event_id>/rsvp', methods=['POST'])
@cross_origin()
def rsvp_event(event_id):
    data = request.json
    user_id = data.get('user_id')
    status = data.get('status')  # attending, interested
    
    if not user_id or not status:
        return jsonify({'error': 'User ID and status required'}), 400
    
    # Get current RSVP if exists
    existing_rsvp = RSVP.query.filter_by(user_id=user_id, event_id=event_id).first()
    event = Event.query.get(event_id)
    
    if existing_rsvp:
        # Update counters based on old status
        if existing_rsvp.status == 'attending':
            event.attending_count = max(0, event.attending_count - 1)
            event.interested_count = max(0, event.interested_count - 1)
        elif existing_rsvp.status == 'interested':
            event.interested_count = max(0, event.interested_count - 1)
        
        # Update to new status
        existing_rsvp.status = status
        existing_rsvp.rsvp_date = datetime.utcnow()
    else:
        # Create new RSVP
        rsvp = RSVP(
            user_id=user_id,
            event_id=event_id,
            status=status
        )
        db.session.add(rsvp)
    
    # Update counters based on new status
    if status == 'attending':
        event.attending_count += 1
        event.interested_count += 1  # Attending also counts as interested
    elif status == 'interested':
        event.interested_count += 1
    
    db.session.commit()
    return jsonify({
        'message': f'RSVP updated to {status}',
        'attending_count': event.attending_count,
        'interested_count': event.interested_count
    }), 200

@user_bp.route('/users/<int:user_id>/events/<int:event_id>/rsvp', methods=['GET'])
@cross_origin()
def get_user_event_rsvp(user_id, event_id):
    rsvp = RSVP.query.filter_by(user_id=user_id, event_id=event_id).first()
    if rsvp:
        return jsonify({'status': rsvp.status})
    else:
        return jsonify({'status': None})

@user_bp.route('/events/<int:event_id>/rsvps', methods=['GET'])
@cross_origin()
def get_event_rsvps(event_id):
    rsvps = RSVP.query.filter_by(event_id=event_id).all()
    return jsonify([rsvp.to_dict() for rsvp in rsvps])

@user_bp.route('/users/<int:user_id>/rsvps', methods=['GET'])
@cross_origin()
def get_user_rsvps(user_id):
    rsvps = RSVP.query.filter_by(user_id=user_id).all()
    return jsonify([rsvp.to_dict() for rsvp in rsvps])

# Dashboard Statistics
@user_bp.route('/dashboard/stats', methods=['GET'])
@cross_origin()
def get_dashboard_stats():
    active_members = User.query.filter_by(is_active=True).count()
    upcoming_events = Event.query.filter(Event.date_time > datetime.utcnow(), Event.is_active == True).count()
    total_news = News.query.filter_by(is_published=True).count()
    
    return jsonify({
        'active_members': active_members,
        'upcoming_events': upcoming_events,
        'total_news': total_news
    })

# Live Stream Routes
@user_bp.route('/live-streams', methods=['GET'])
@cross_origin()
def get_live_streams():
    live_events = Event.query.filter_by(is_live_streamed=True, is_active=True).order_by(Event.date_time.asc()).all()
    return jsonify([event.to_dict() for event in live_events])

@user_bp.route('/live-streams/active', methods=['GET'])
@cross_origin()
def get_active_live_streams():
    # For demo purposes, return events happening today
    today = datetime.utcnow().date()
    active_streams = Event.query.filter(
        Event.is_live_streamed == True,
        Event.is_active == True,
        Event.date_time >= today
    ).order_by(Event.date_time.asc()).all()
    return jsonify([event.to_dict() for event in active_streams])

