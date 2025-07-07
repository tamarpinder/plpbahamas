import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LogIn, UserPlus } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'sonner';

const MobileLogin = ({ onLoginSuccess }) => {
  const { login, register, isLoading } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        toast.success('Account created successfully!');
        onLoginSuccess();
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Welcome back!');
        onLoginSuccess();
      } else {
        toast.error(result.error || 'Login failed');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FFC600] to-[#FFAA00] flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl font-bold text-[#FFC600]">PLP</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Join the Movement' : 'Welcome Back'}
        </h1>
        <p className="text-gray-800">
          {isSignUp ? 'Create your account to get started' : 'Sign in to continue'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full h-12"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-12"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full h-12"
              required
            />
          </div>
          
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full h-12"
                required
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-[#FFC600] hover:bg-[#FFB700] text-gray-900 font-semibold text-lg mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              'Please wait...'
            ) : (
              <>
                {isSignUp ? <UserPlus className="h-5 w-5 mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FFC600] font-medium"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
        
        {!isSignUp && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Demo: Use any email with password "demo123"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileLogin;