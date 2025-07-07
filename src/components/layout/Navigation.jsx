import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Newspaper, Calendar, Heart, User, LogIn, LogOut, Users, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import useAuthStore from '@/stores/useAuthStore';
import useAppStore from '@/stores/useAppStore';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { dashboardStats } = useAppStore();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/donate', label: 'Donate', icon: Heart },
    { path: '/volunteer', label: 'Volunteer', icon: Users },
  ];

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/plp-torch-logo.png" 
              alt="PLP Logo" 
              className="h-10 w-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xl font-bold text-gray-900">PLP Movement</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/20 text-gray-900 font-semibold'
                      : 'text-gray-800 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Auth Section */}
            <div className="flex items-center space-x-2 ml-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-gray-800">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name || 'Profile'}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="border-gray-800 text-gray-800 hover:bg-white/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-gray-800 text-gray-800 hover:bg-white/20">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {/* User Info */}
                {isAuthenticated && (
                  <div className="pb-4 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                )}

                {/* Navigation Items */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-[#FFC600] text-gray-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Auth Actions */}
                <div className="pt-4 border-t">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>

                {/* Stats */}
                {dashboardStats && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 px-4">
                      Active Members: {dashboardStats.activeMembers.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;