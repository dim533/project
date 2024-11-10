export const COLORS = {
  brand: {
    primary: '#10B981', // Emerald - main brand color
    secondary: '#0EA5E9', // Sky blue - secondary accent
    accent: '#8B5CF6', // Purple - special highlights
  },
  ui: {
    background: {
      dark: '#111827', // slate-900
      DEFAULT: '#1F2937', // slate-800
      light: '#374151', // slate-700
    },
    surface: {
      dark: 'rgba(255, 255, 255, 0.05)',
      DEFAULT: 'rgba(255, 255, 255, 0.1)',
      light: 'rgba(255, 255, 255, 0.15)',
    },
    border: {
      dark: 'rgba(255, 255, 255, 0.1)',
      DEFAULT: 'rgba(255, 255, 255, 0.15)',
      light: 'rgba(255, 255, 255, 0.2)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.5)',
    }
  },
  state: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  }
} as const;

export const SHADOWS = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 12px rgba(0, 0, 0, 0.5)',
  glow: {
    primary: '0 0 20px rgba(16, 185, 129, 0.3)',
    secondary: '0 0 20px rgba(14, 165, 233, 0.3)',
    accent: '0 0 20px rgba(139, 92, 246, 0.3)',
  }
} as const;

export const ANIMATIONS = {
  easing: [0.6, -0.05, 0.01, 0.99],
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6
  }
} as const; 