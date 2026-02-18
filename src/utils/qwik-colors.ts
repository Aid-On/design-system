import { useSignal, useVisibleTask$, type Signal } from '@builder.io/qwik';
import type { ColorToken } from '../tokens/colors';
import { getAllColorTokens, getColorByVariable } from '../tokens/colors';

/**
 * Theme type
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Qwik hook for theme management
 */
export function useTheme() {
  const theme = useSignal<Theme>('system');
  const resolvedTheme = useSignal<'light' | 'dark'>('light');

  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    
    if (theme.value === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      resolvedTheme.value = mediaQuery.matches ? 'dark' : 'light';
      
      const handleChange = (e: MediaQueryListEvent) => {
        resolvedTheme.value = e.matches ? 'dark' : 'light';
        applyTheme(resolvedTheme.value);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      resolvedTheme.value = theme.value as 'light' | 'dark';
    }
    
    applyTheme(resolvedTheme.value);
  });

  return {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      theme.value = newTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('aid-on-theme', newTheme);
      }
    },
    toggleTheme: () => {
      const newTheme = resolvedTheme.value === 'light' ? 'dark' : 'light';
      theme.value = newTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('aid-on-theme', newTheme);
      }
    }
  };
}

/**
 * Apply theme to the document
 */
function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
  
  // Apply color tokens as CSS variables
  const tokens = getAllColorTokens(theme);
  const uniqueTokens = new Map<string, ColorToken>();
  
  tokens.forEach(token => {
    if (!uniqueTokens.has(token.name)) {
      uniqueTokens.set(token.name, token);
    }
  });
  
  uniqueTokens.forEach(token => {
    document.documentElement.style.setProperty(token.name, token.value);
  });
}

/**
 * Initialize theme from localStorage on app startup
 */
export function initializeTheme() {
  if (typeof window === 'undefined') return 'system';
  
  const stored = localStorage.getItem('aid-on-theme') as Theme | null;
  const theme = stored || 'system';
  
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(mediaQuery.matches ? 'dark' : 'light');
  } else {
    applyTheme(theme as 'light' | 'dark');
  }
  
  return theme;
}

/**
 * Get CSS variable value for a color token
 */
export function getCSSVariable(varName: string): string {
  if (typeof window === 'undefined') return '';
  
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/**
 * Create color class names for components
 */
export function colorClass(
  base: string,
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'error' | 'warning' | 'success' | 'info',
  state?: 'hover' | 'active' | 'disabled'
): string {
  const classes = [base];
  
  if (variant) {
    classes.push(`${base}--${variant}`);
  }
  
  if (state) {
    classes.push(`${base}--${state}`);
  }
  
  return classes.join(' ');
}

/**
 * Generate inline style object with color variables
 */
export function colorStyle(
  fg?: string,
  bg?: string,
  border?: string
): Record<string, string> {
  const style: Record<string, string> = {};
  
  if (fg) {
    style.color = fg.startsWith('--') ? `var(${fg})` : fg;
  }
  
  if (bg) {
    style.backgroundColor = bg.startsWith('--') ? `var(${bg})` : bg;
  }
  
  if (border) {
    style.borderColor = border.startsWith('--') ? `var(${border})` : border;
  }
  
  return style;
}

/**
 * Hook to track color preference changes
 */
export function useColorPreference() {
  const preference = useSignal<'light' | 'dark'>('light');
  
  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    preference.value = mediaQuery.matches ? 'dark' : 'light';
    
    const handleChange = (e: MediaQueryListEvent) => {
      preference.value = e.matches ? 'dark' : 'light';
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  });
  
  return preference;
}