import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Events } from './pages/Events';
import { Campaigns } from './pages/Campaigns';
import { Content } from './pages/Content';
import { Communications } from './pages/Communications';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Tasks } from './pages/Tasks';
import { Workflows } from './pages/Workflows';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Events />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/content" element={<Content />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/workflows" element={<Workflows />} />
          </Routes>
        </Layout>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;