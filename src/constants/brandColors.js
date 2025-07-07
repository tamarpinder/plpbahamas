// PLP Brand Color System
// Based on official PLP logos and brand guidelines

export const PLPColors = {
  // Primary Brand Colors
  primary: {
    navy: '#003366',      // Main PLP Navy Blue
    gold: '#FFD700',      // PLP Gold/Yellow
    blue: '#0066CC',      // Secondary PLP Blue
    lightBlue: '#4A90E2', // Light accent blue
    darkNavy: '#001122',  // Darker navy for emphasis
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #003366 0%, #0066CC 50%, #FFD700 100%)',
    hero: 'linear-gradient(180deg, #003366 0%, #0066CC 70%, #FFD700 100%)',
    card: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%)',
    button: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
    overlay: 'linear-gradient(180deg, rgba(0, 51, 102, 0.8) 0%, rgba(0, 102, 204, 0.6) 100%)',
  },

  // Status Colors
  status: {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },

  // Semantic Colors
  semantic: {
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    text: {
      primary: '#003366',
      secondary: '#4B5563',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    interactive: {
      primary: '#FFD700',
      primaryHover: '#FFC700',
      secondary: '#003366',
      secondaryHover: '#0066CC',
      disabled: '#D1D5DB',
    }
  },

  // Component-specific colors
  components: {
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(0, 51, 102, 0.1)',
      shadow: 'rgba(0, 51, 102, 0.15)',
    },
    input: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: 'rgba(0, 51, 102, 0.2)',
      borderFocus: '#FFD700',
      placeholder: '#9CA3AF',
    },
    navigation: {
      background: 'rgba(255, 255, 255, 0.95)',
      active: '#FFD700',
      inactive: '#6B7280',
    }
  }
};

// Utility functions for color manipulation
PLPColors.getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getColorWithOpacity = PLPColors.getColorWithOpacity;

export const PLPShadows = {
  sm: '0 1px 2px 0 rgba(0, 51, 102, 0.05)',
  md: '0 4px 6px -1px rgba(0, 51, 102, 0.1), 0 2px 4px -1px rgba(0, 51, 102, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 51, 102, 0.1), 0 4px 6px -2px rgba(0, 51, 102, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 51, 102, 0.1), 0 10px 10px -5px rgba(0, 51, 102, 0.04)',
  glass: '0 8px 32px 0 rgba(0, 51, 102, 0.37)',
};

export const PLPSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

export const PLPBorderRadius = {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  full: '9999px',
};

export default PLPColors;