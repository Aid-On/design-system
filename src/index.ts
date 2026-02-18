/**
 * @aid-on/design-system
 * 
 * Aid-On Design System - Design tokens and utilities for Qwik applications
 */

// Export all tokens
export * from './tokens';

// Export utilities
export * from './utils';

// Export main color system for quick access
export { colors } from './tokens/colors';

// Export main hooks for quick access
export { useTheme, initializeTheme } from './utils/qwik-colors';