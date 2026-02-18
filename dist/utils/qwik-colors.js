import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { getAllColorTokens } from '../tokens/colors';
/**
 * Qwik hook for theme management
 */
export function useTheme() {
    const theme = useSignal('system');
    const resolvedTheme = useSignal('light');
    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        if (theme.value === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            resolvedTheme.value = mediaQuery.matches ? 'dark' : 'light';
            const handleChange = (e) => {
                resolvedTheme.value = e.matches ? 'dark' : 'light';
                applyTheme(resolvedTheme.value);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }
        else {
            resolvedTheme.value = theme.value;
        }
        applyTheme(resolvedTheme.value);
    });
    return {
        theme,
        resolvedTheme,
        setTheme: (newTheme) => {
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
function applyTheme(theme) {
    if (typeof document === 'undefined')
        return;
    document.documentElement.setAttribute('data-theme', theme);
    // Apply color tokens as CSS variables
    const tokens = getAllColorTokens(theme);
    const uniqueTokens = new Map();
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
    if (typeof window === 'undefined')
        return 'system';
    const stored = localStorage.getItem('aid-on-theme');
    const theme = stored || 'system';
    if (theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
    }
    else {
        applyTheme(theme);
    }
    return theme;
}
/**
 * Get CSS variable value for a color token
 */
export function getCSSVariable(varName) {
    if (typeof window === 'undefined')
        return '';
    return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
}
/**
 * Create color class names for components
 */
export function colorClass(base, variant, state) {
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
export function colorStyle(fg, bg, border) {
    const style = {};
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
    const preference = useSignal('light');
    useVisibleTask$(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        preference.value = mediaQuery.matches ? 'dark' : 'light';
        const handleChange = (e) => {
            preference.value = e.matches ? 'dark' : 'light';
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    });
    return preference;
}
