import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { toast } from 'sonner';
import { PLPColors, PLPShadows, PLPSpacing } from '@/constants/brandColors';

const PLPLoginNew = ({ onLoginSuccess }) => {
  const { login, register, loginAsGuest, isLoading } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Form validation
  const validateField = (field, value) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Full name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isSignUp && !value) {
          errors.email = 'Email is required';
        } else if (value && !emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (isSignUp && !value) {
          errors.password = 'Password is required';
        } else if (value && value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        break;
      case 'confirmPassword':
        if (isSignUp && value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (focusedField === field) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if both email and password are empty - sign in as guest
    if (!isSignUp && !formData.email.trim() && !formData.password.trim()) {
      const guestResult = loginAsGuest();
      if (guestResult.success) {
        toast.success('Welcome, Guest!');
        onLoginSuccess();
      }
      return;
    }
    
    // Validate all fields for normal login/signup
    let isValid = true;
    const fieldsToValidate = isSignUp 
      ? ['name', 'email', 'password', 'confirmPassword']
      : ['email', 'password'];
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast.error('Please fix the errors above');
      return;
    }
    
    if (isSignUp) {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        toast.success('Welcome to the PLP Movement!');
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{
      height: '100%',
      background: PLPColors.gradients.hero,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '200px',
        height: '200px',
        background: `${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)}`,
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '-15%',
        width: '300px',
        height: '300px',
        background: `${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          style={{
            padding: '2rem 1.5rem',
            textAlign: 'center',
            flex: '0 0 auto'
          }}
        >
          {/* Main PLP Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 1.5rem',
              background: PLPColors.neutral.white,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: PLPShadows.xl,
              border: `3px solid ${PLPColors.primary.gold}`
            }}
          >
            <img 
              src="/assets/logo/Main logo - PLP blue.png"
              alt="PLP Logo"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                // Fallback if logo doesn't load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: PLPColors.primary.navy
            }}>
              PLP
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: PLPColors.neutral.white,
              marginBottom: '0.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {isSignUp ? 'Join the Movement' : 'Welcome Back'}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {isSignUp ? 'Believe in The Bahamas' : 'Continue your journey with us'}
          </motion.p>
        </motion.div>

        {/* Form Section with Glassmorphism */}
        <motion.div
          variants={itemVariants}
          style={{
            flex: '1',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.2)}`,
            boxShadow: PLPShadows.glass,
            padding: '2rem 1.5rem',
            position: 'relative'
          }}
        >
          {/* Mode Toggle */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'flex',
              marginBottom: '2rem',
              background: PLPColors.neutral.gray100,
              borderRadius: '1rem',
              padding: '0.25rem',
              position: 'relative'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: '0.25rem',
                left: isSignUp ? '50%' : '0.25rem',
                width: 'calc(50% - 0.25rem)',
                height: 'calc(100% - 0.5rem)',
                background: PLPColors.primary.gold,
                borderRadius: '0.75rem',
                boxShadow: PLPShadows.sm
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              layout
            />
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                color: !isSignUp ? PLPColors.primary.navy : PLPColors.neutral.gray600,
                position: 'relative',
                zIndex: 1,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                color: isSignUp ? PLPColors.primary.navy : PLPColors.neutral.gray600,
                position: 'relative',
                zIndex: 1,
                cursor: 'pointer'
              }}
            >
              Sign Up
            </button>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ position: 'relative' }}>
                    <User 
                      size={20} 
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: focusedField === 'name' ? PLPColors.primary.gold : PLPColors.neutral.gray400,
                        zIndex: 1
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        height: '3.5rem',
                        paddingLeft: '3rem',
                        border: `2px solid ${validationErrors.name ? PLPColors.status.error : 
                          focusedField === 'name' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        background: PLPColors.neutral.white,
                        transition: 'all 0.2s ease'
                      }}
                      required={isSignUp}
                    />
                    {validationErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          color: PLPColors.status.error,
                          fontSize: '0.875rem',
                          marginTop: '0.5rem',
                          marginLeft: '1rem'
                        }}
                      >
                        {validationErrors.name}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <motion.div variants={itemVariants} style={{ position: 'relative' }}>
              <Mail 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: focusedField === 'email' ? PLPColors.primary.gold : PLPColors.neutral.gray400,
                  zIndex: 1
                }}
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{
                  width: '100%',
                  height: '3.5rem',
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  border: `2px solid ${validationErrors.email ? PLPColors.status.error : 
                    focusedField === 'email' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  background: PLPColors.neutral.white,
                  transition: 'all 0.2s ease'
                }}
              />
              {validationErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: PLPColors.status.error,
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginLeft: '1rem'
                  }}
                >
                  {validationErrors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: focusedField === 'password' ? PLPColors.primary.gold : PLPColors.neutral.gray400,
                  zIndex: 1
                }}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{
                  width: '100%',
                  height: '3.5rem',
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  border: `2px solid ${validationErrors.password ? PLPColors.status.error : 
                    focusedField === 'password' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  background: PLPColors.neutral.white,
                  transition: 'all 0.2s ease'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: PLPColors.neutral.gray400,
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {validationErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: PLPColors.status.error,
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginLeft: '1rem'
                  }}
                >
                  {validationErrors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative' }}
                >
                  <Lock 
                    size={20} 
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: focusedField === 'confirmPassword' ? PLPColors.primary.gold : PLPColors.neutral.gray400,
                      zIndex: 1
                    }}
                  />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      height: '3.5rem',
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      border: `2px solid ${validationErrors.confirmPassword ? PLPColors.status.error : 
                        focusedField === 'confirmPassword' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: PLPColors.neutral.white,
                      transition: 'all 0.2s ease'
                    }}
                    required={isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: PLPColors.neutral.gray400,
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {validationErrors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        color: PLPColors.status.error,
                        fontSize: '0.875rem',
                        marginTop: '0.5rem',
                        marginLeft: '1rem'
                      }}
                    >
                      {validationErrors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '1rem' }}>
              <Button 
                type="submit" 
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '3.5rem',
                  background: PLPColors.gradients.button,
                  border: 'none',
                  borderRadius: '1rem',
                  color: PLPColors.primary.navy,
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  boxShadow: PLPShadows.md,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = PLPShadows.lg;
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = PLPShadows.md;
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Please wait...
                  </>
                ) : (
                  <>
                    {isSignUp ? <UserPlus size={20} style={{ marginRight: '0.5rem' }} /> : <LogIn size={20} style={{ marginRight: '0.5rem' }} />}
                    {isSignUp ? 'Join the Movement' : (!formData.email.trim() && !formData.password.trim() ? 'Continue as Guest' : 'Sign In')}
                  </>
                )}
              </Button>
            </motion.div>

            {/* Guest Access Info */}
            {!isSignUp && (
              <motion.div 
                variants={itemVariants}
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.05),
                  borderRadius: '0.75rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
                }}
              >
                <p style={{
                  fontSize: '0.875rem',
                  color: PLPColors.primary.navy,
                  textAlign: 'center',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  👋 Leave fields empty to explore as a guest
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PLPLoginNew;