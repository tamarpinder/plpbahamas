// PLP Admin Panel Brand Colors and Theme Configuration

export const PLPColors = {
  // Primary Brand Colors
  primary: {
    navy: '#003d7a',
    blue: '#0066CC', 
    gold: '#FFD700',
    navyDark: '#002952',
    navyLight: '#0066cc',
    goldDark: '#d4af00',
    goldLight: '#fff44f'
  },
  
  // Status Colors
  status: {
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0ea5e9'
  },
  
  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #003d7a 0%, #0066CC 100%)',
    gold: 'linear-gradient(135deg, #d4af00 0%, #FFD700 100%)',
    hero: 'linear-gradient(135deg, #003d7a 0%, #0066CC 50%, #FFD700 100%)',
    subtle: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
  },
  
  // Chart Colors (for data visualization)
  chart: {
    primary: '#0066CC',
    secondary: '#FFD700',
    tertiary: '#003d7a',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0ea5e9',
    purple: '#7c3aed',
    pink: '#db2777',
    indigo: '#4f46e5'
  },
  
  // Semantic Colors
  semantic: {
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#9ca3af',
      inverse: '#ffffff'
    }
  }
};

// Helper function to create color with opacity
export const getColorWithOpacity = (color, opacity) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Box Shadows
export const PLPShadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glass: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), inset 0 1px 0 0 rgb(255 255 255 / 0.1)'
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Animation durations
export const animations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
};

export default PLPColors;