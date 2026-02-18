import { type Signal } from '@builder.io/qwik';
/**
 * Theme type
 */
export type Theme = 'light' | 'dark' | 'system';
/**
 * Qwik hook for theme management
 */
export declare function useTheme(): {
    theme: Signal<Theme>;
    resolvedTheme: Signal<"light" | "dark">;
    setTheme: (newTheme: Theme) => void;
    toggleTheme: () => void;
};
/**
 * Initialize theme from localStorage on app startup
 */
export declare function initializeTheme(): Theme;
/**
 * Get CSS variable value for a color token
 */
export declare function getCSSVariable(varName: string): string;
/**
 * Create color class names for components
 */
export declare function colorClass(base: string, variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'error' | 'warning' | 'success' | 'info', state?: 'hover' | 'active' | 'disabled'): string;
/**
 * Generate inline style object with color variables
 */
export declare function colorStyle(fg?: string, bg?: string, border?: string): Record<string, string>;
/**
 * Hook to track color preference changes
 */
export declare function useColorPreference(): Signal<"light" | "dark">;
//# sourceMappingURL=qwik-colors.d.ts.map