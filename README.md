# PLP Mobile Application

A modern mobile application for the Progressive Liberal Party (PLP) of the Bahamas, built with React + Vite frontend and Flask backend.

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── assets/            # Frontend-specific assets
├── backend/               # Flask backend API
│   ├── src/              # Backend source code
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── database/     # Database files
│   ├── requirements.txt   # Python dependencies
│   └── *.py              # Backend scripts
├── assets/               # Consolidated project assets
│   └── images/          # Organized image assets
│       ├── logos/       # Logo files
│       ├── flags/       # Flag images
│       ├── wireframes/  # Design wireframes
│       └── ui-components/ # UI component screenshots
├── docs/                # Project documentation
│   ├── technical/       # Technical documentation
│   ├── design/         # Design documentation
│   ├── deployment/     # Deployment guides
│   ├── user-guides/    # User documentation
│   └── project-management/ # Project management files
├── public/             # Static public assets
├── package.json        # Frontend dependencies
└── vite.config.js     # Vite configuration
```

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Framer Motion** - Animation library

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **Flask-CORS** - Cross-origin resource sharing

## Getting Started

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

## Documentation

- **Technical**: `/docs/technical/` - Technical analysis and documentation
- **Design**: `/docs/design/` - Design concepts and guidelines
- **Deployment**: `/docs/deployment/` - Deployment guides and procedures
- **User Guides**: `/docs/user-guides/` - End-user documentation
- **Project Management**: `/docs/project-management/` - Project planning and todos

## Assets

All project assets are organized in the `/assets/` directory:
- **Logos**: PLP logos and app icons
- **Flags**: Bahamian and PLP flag images
- **Wireframes**: Application design wireframes
- **UI Components**: Component screenshots and mockups

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```