# PLP Mobile Application - Deployment Instructions

**Progressive Liberal Party Mobile Application**  
**Deployment and Setup Instructions**  
**Version 1.0 - June 2025**

---

## Overview

This document provides step-by-step instructions for deploying the PLP Mobile Application to production environments. The application consists of a React frontend and Flask backend that can be deployed separately or together depending on infrastructure requirements.

## System Requirements

### Minimum Server Specifications
- **CPU**: 2 cores, 2.4 GHz
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 20 GB available disk space
- **Network**: Stable internet connection with public IP
- **Operating System**: Ubuntu 20.04 LTS or newer

### Software Dependencies
- **Node.js**: Version 20.18.0 or higher
- **Python**: Version 3.11 or higher
- **Database**: PostgreSQL 13+ (recommended) or MySQL 8.0+
- **Web Server**: Nginx 1.18+ (recommended)
- **SSL Certificate**: Let's Encrypt or commercial certificate

## Pre-Deployment Preparation

### 1. Domain and DNS Setup
- Register a domain name for the application (e.g., app.plp.bs)
- Configure DNS A records to point to your server IP address
- Set up subdomain for API if using separate servers (e.g., api.plp.bs)

### 2. Server Security Configuration
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Create application user
sudo adduser plpapp
sudo usermod -aG sudo plpapp
```

### 3. Install Required Software
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and pip
sudo apt install python3.11 python3.11-venv python3-pip -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y
```

## Database Setup

### PostgreSQL Configuration
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE plp_mobile_app;
CREATE USER plpapp WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE plp_mobile_app TO plpapp;
\q
```

### Database Migration
```bash
# Export data from development SQLite
sqlite3 plp_backend/instance/plp_app.db .dump > plp_data.sql

# Import to PostgreSQL (after adapting SQL syntax)
psql -h localhost -U plpapp -d plp_mobile_app -f plp_data_postgres.sql
```

## Backend Deployment

### 1. Application Setup
```bash
# Switch to application user
sudo su - plpapp

# Clone or upload application files
git clone https://github.com/your-org/plp-mobile-app.git
cd plp-mobile-app/plp-backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
```

### 2. Environment Configuration
```bash
# Create environment file
cat > .env << EOF
DATABASE_URL=postgresql://plpapp:your_secure_password@localhost/plp_mobile_app
SECRET_KEY=your_very_secure_secret_key_here
FLASK_ENV=production
CORS_ORIGINS=https://app.plp.bs
EOF
```

### 3. Application Configuration
Update `src/main.py` for production:
```python
import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure CORS for production
CORS(app, origins=os.environ.get('CORS_ORIGINS', '').split(','))
```

### 4. Systemd Service Setup
```bash
# Create service file
sudo tee /etc/systemd/system/plp-backend.service > /dev/null << EOF
[Unit]
Description=PLP Mobile App Backend
After=network.target

[Service]
User=plpapp
Group=plpapp
WorkingDirectory=/home/plpapp/plp-mobile-app/plp-backend
Environment=PATH=/home/plpapp/plp-mobile-app/plp-backend/venv/bin
EnvironmentFile=/home/plpapp/plp-mobile-app/plp-backend/.env
ExecStart=/home/plpapp/plp-mobile-app/plp-backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 src.main:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable plp-backend
sudo systemctl start plp-backend
```

## Frontend Deployment

### 1. Build Application
```bash
# Navigate to frontend directory
cd /home/plpapp/plp-mobile-app/plp-mobile-app

# Install dependencies
npm install

# Update API endpoint for production
# Edit src/App.jsx and change API_BASE_URL to production URL
sed -i 's|http://localhost:5000|https://api.plp.bs|g' src/App.jsx

# Build for production
npm run build
```

### 2. Nginx Configuration
```bash
# Create Nginx site configuration
sudo tee /etc/nginx/sites-available/plp-app << EOF
server {
    listen 80;
    server_name app.plp.bs;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name app.plp.bs;

    ssl_certificate /etc/letsencrypt/live/app.plp.bs/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.plp.bs/privkey.pem;

    root /home/plpapp/plp-mobile-app/plp-mobile-app/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/plp-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate Setup

### Using Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d app.plp.bs

# Test automatic renewal
sudo certbot renew --dry-run
```

## Monitoring and Maintenance

### 1. Log Configuration
```bash
# Backend logs
sudo journalctl -u plp-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 2. Backup Setup
```bash
# Create backup script
cat > /home/plpapp/backup.sh << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U plpapp plp_mobile_app > /home/plpapp/backups/plp_db_\$DATE.sql
tar -czf /home/plpapp/backups/plp_app_\$DATE.tar.gz /home/plpapp/plp-mobile-app
find /home/plpapp/backups -name "*.sql" -mtime +7 -delete
find /home/plpapp/backups -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x /home/plpapp/backup.sh
mkdir -p /home/plpapp/backups

# Add to crontab for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /home/plpapp/backup.sh") | crontab -
```

### 3. Update Procedures
```bash
# Backend updates
cd /home/plpapp/plp-mobile-app/plp-backend
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart plp-backend

# Frontend updates
cd /home/plpapp/plp-mobile-app/plp-mobile-app
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

## Security Considerations

### 1. Database Security
- Use strong passwords for database users
- Configure PostgreSQL to only accept local connections
- Regularly update database software
- Implement regular backup and recovery procedures

### 2. Application Security
- Keep all software dependencies updated
- Use environment variables for sensitive configuration
- Implement rate limiting for API endpoints
- Monitor application logs for suspicious activity

### 3. Server Security
- Configure automatic security updates
- Use SSH key authentication instead of passwords
- Implement fail2ban for intrusion prevention
- Regular security audits and vulnerability assessments

## Troubleshooting

### Common Issues

**Backend Service Won't Start**
```bash
# Check service status
sudo systemctl status plp-backend

# Check logs
sudo journalctl -u plp-backend -n 50

# Common fixes
- Verify database connection
- Check environment variables
- Ensure virtual environment is activated
```

**Frontend Not Loading**
```bash
# Check Nginx configuration
sudo nginx -t

# Verify file permissions
ls -la /home/plpapp/plp-mobile-app/plp-mobile-app/dist/

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

**Database Connection Issues**
```bash
# Test database connection
psql -h localhost -U plpapp -d plp_mobile_app

# Check PostgreSQL status
sudo systemctl status postgresql

# Verify user permissions
sudo -u postgres psql -c "\du"
```

## Performance Optimization

### 1. Database Optimization
```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_news_publication_date ON news(publication_date);
CREATE INDEX idx_events_date_time ON events(date_time);
CREATE INDEX idx_users_voting_district ON users(voting_district);
```

### 2. Nginx Optimization
```nginx
# Add to server block for better performance
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Application Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop -y

# Monitor system resources
htop
iotop

# Monitor application performance
curl -w "@curl-format.txt" -o /dev/null -s "https://app.plp.bs"
```

---

**For technical support during deployment, contact the development team or refer to the technical documentation.**

**Progressive Liberal Party - Believe in The Bahamas**

