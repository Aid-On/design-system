# @aid-on/design-system

<div align="center">

[![npm version](https://img.shields.io/npm/v/@aid-on/design-system.svg?style=flat-square&color=00DC82)](https://www.npmjs.com/package/@aid-on/design-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<br />

<h3><b>design-system</b> - Design Tokens and Theming for Qwik Applications</h3>
<p align="center"><b>Consistent design, zero guesswork.</b><br/>A type-safe color token system with light/dark theme support built for @builder.io/qwik.</p>

<br/>

[**日本語**](./README.ja.md) | **English**

<br/>

</div>

## Features

- **Color Token System** - Structured color categories (surface, content, accent, semantic, status indicators) with light/dark variants
- **Qwik Hooks** - `useTheme()` and `useColorPreference()` for reactive theme management
- **CSS Variable Utilities** - `getCSSVariable()`, `colorClass()`, `colorStyle()` for flexible styling
- **System Preference Detection** - Automatic `prefers-color-scheme` detection with live updates
- **Generated CSS** - Pre-built CSS file with all token variables for direct import
- **Sub-path Exports** - Import only what you need: `./tokens`, `./colors`, `./utils`, `./css`

## Installation

```bash
npm install @aid-on/design-system
```

**Peer dependency:**

```bash
npm install @builder.io/qwik@^1.11.0
```

## Quick Start

### 1. Initialize Theme

```typescript
import { useTheme } from "@aid-on/design-system";

export const App = component$(() => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {resolvedTheme.value}</p>
      <button onClick$={() => toggleTheme()}>Toggle Theme</button>
      <button onClick$={() => setTheme("light")}>Light</button>
      <button onClick$={() => setTheme("dark")}>Dark</button>
      <button onClick$={() => setTheme("system")}>System</button>
    </div>
  );
});
```

### 2. Import CSS Tokens

```typescript
// Import generated CSS with all color variables
import "@aid-on/design-system/css";
```

### 3. Use Color Tokens in Styles

```css
.card {
  background-color: var(--surface);
  color: var(--content);
  border-color: var(--accent-ghost);
}

.card:hover {
  background-color: var(--surface-hover);
}

.error-message {
  color: var(--red-4);
  background-color: var(--red-7);
}
```

## Color Categories

The token system is organized into semantic categories, each with light and dark theme variants:

| Category | Tokens | Description |
|----------|--------|-------------|
| **Surface** | `--surface`, `--surface-elevated`, `--surface-hover`, `--surface-active`, `--surface-disabled` | Background colors for containers and layouts |
| **Content** | `--content` through `--content-ghost` | Text and icon colors with 7 levels of emphasis |
| **Accent** | `--accent` through `--accent-background` | Interactive element colors with 8 variants |
| **Semantic** | `--white-1` through `--white-7` | Neutral white scale for overlays and borders |
| **Caution Red** | `--red-1` through `--red-7` | Error and destructive action indicators |
| **Alert Orange** | `--orange-1` through `--orange-7` | Warning and caution indicators |
| **Success Green** | `--green-1` through `--green-7` | Success and confirmation indicators |
| **Link Blue** | `--blue-1` through `--blue-7` | Links and informational indicators |

## API Reference

### Hooks

#### `useTheme()`

Qwik hook for theme management with reactive state.

```typescript
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

| Return | Type | Description |
|--------|------|-------------|
| `theme` | `Signal<Theme>` | Current theme setting (`'light'`, `'dark'`, or `'system'`) |
| `resolvedTheme` | `Signal<'light' \| 'dark'>` | Resolved theme after applying system preference |
| `setTheme` | `(theme: Theme) => void` | Set theme and persist to localStorage |
| `toggleTheme` | `() => void` | Toggle between light and dark |

#### `useColorPreference()`

Hook to track system color scheme preference changes.

```typescript
const preference = useColorPreference();
// preference.value is 'light' or 'dark'
```

### Functions

#### `initializeTheme()`

Initialize theme from localStorage on app startup. Call this early in your app lifecycle.

```typescript
import { initializeTheme } from "@aid-on/design-system";

const theme = initializeTheme(); // Returns current theme
```

#### `getCSSVariable(varName)`

Get the computed value of a CSS variable at runtime.

```typescript
import { getCSSVariable } from "@aid-on/design-system";

const surfaceColor = getCSSVariable("--surface");
```

#### `colorClass(base, variant?, state?)`

Generate BEM-style class names for components.

```typescript
import { colorClass } from "@aid-on/design-system";

colorClass("btn");                          // "btn"
colorClass("btn", "primary");               // "btn btn--primary"
colorClass("btn", "primary", "hover");      // "btn btn--primary btn--hover"
colorClass("btn", undefined, "disabled");   // "btn btn--disabled"
```

**Variants:** `'primary'`, `'secondary'`, `'accent'`, `'ghost'`, `'error'`, `'warning'`, `'success'`, `'info'`

**States:** `'hover'`, `'active'`, `'disabled'`

#### `colorStyle(fg?, bg?, border?)`

Generate inline style objects with CSS variable support.

```typescript
import { colorStyle } from "@aid-on/design-system";

// CSS variable names are automatically wrapped in var()
colorStyle("--content", "--surface");
// { color: "var(--content)", backgroundColor: "var(--surface)" }

// Raw color values pass through unchanged
colorStyle("#333", "#fff", "#ccc");
// { color: "#333", backgroundColor: "#fff", borderColor: "#ccc" }
```

### Token Functions

#### `getAllColorTokens(theme?)`

Get all color tokens as a flat array for a given theme.

```typescript
import { getAllColorTokens } from "@aid-on/design-system/tokens";

const lightTokens = getAllColorTokens("light");
const darkTokens = getAllColorTokens("dark");
```

#### `getColorByVariable(varName, theme?)`

Look up a color value by its CSS variable name.

```typescript
import { getColorByVariable } from "@aid-on/design-system/tokens";

const color = getColorByVariable("--surface", "light"); // "#6C4FEA"
```

#### `generateColorCSSVariables(theme?)`

Generate CSS custom properties string for a theme.

```typescript
import { generateColorCSSVariables } from "@aid-on/design-system/tokens";

const css = generateColorCSSVariables("dark");
// :root[data-theme="dark"] { --surface: #6C4FEA; ... }
```

## Sub-path Exports

```typescript
// Everything
import { colors, useTheme, colorStyle } from "@aid-on/design-system";

// Tokens only (no Qwik dependency)
import { colors, getAllColorTokens, getColorByVariable } from "@aid-on/design-system/tokens";

// Colors directly
import { colors, ColorSystem } from "@aid-on/design-system/colors";

// Utilities (requires Qwik)
import { useTheme, getCSSVariable, colorClass } from "@aid-on/design-system/utils";

// CSS file
import "@aid-on/design-system/css";
```

## Types

```typescript
import type {
  ColorToken,      // { name: string; value: string; description: string }
  ColorCategory,   // { light: ColorToken[]; dark: ColorToken[] }
  ColorSystem,     // Full color system with all categories
  Theme,           // 'light' | 'dark' | 'system'
} from "@aid-on/design-system";
```

## How Theming Works

1. `useTheme()` sets `data-theme` attribute on `<html>` and applies CSS variables inline
2. Theme preference is persisted to `localStorage` under the key `aid-on-theme`
3. When set to `'system'`, the hook listens to `prefers-color-scheme` media query changes
4. CSS variables are applied directly to `document.documentElement.style`, so they override any stylesheet defaults

## License

MIT
