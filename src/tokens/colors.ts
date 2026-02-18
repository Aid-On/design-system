/**
 * Color token definition
 */
export interface ColorToken {
  name: string;
  value: string;
  description: string;
}

/**
 * Color category with light and dark theme variants
 */
export interface ColorCategory {
  light: ColorToken[];
  dark: ColorToken[];
}

/**
 * Complete color system
 */
export interface ColorSystem {
  surface: ColorCategory;
  content: ColorCategory;
  accent: ColorCategory;
  semantic: ColorCategory;
  cautionRed: ColorCategory;
  alertOrange: ColorCategory;
  successGreen: ColorCategory;
  linkBlue: ColorCategory;
}

/**
 * Aid-On Design System Color Tokens
 */
export const colors: ColorSystem = {
  surface: {
    light: [
      { name: '--surface', value: '#6C4FEA', description: 'Blue' },
      { name: '--surface-elevated', value: '#005FB9', description: 'Dark Blue' },
      { name: '--surface-hover', value: '#1A1A1A', description: 'Black' },
      { name: '--surface-active', value: '#ffffff', description: 'White' },
      { name: '--surface-disabled', value: '#F6F6F6', description: 'Neutral Gray' },
    ],
    dark: [
      { name: '--surface', value: '#6C4FEA', description: 'Blue' },
      { name: '--surface-elevated', value: '#005FB9', description: 'Dark Blue' },
      { name: '--surface-hover', value: '#1A1A1A', description: 'Black' },
      { name: '--surface-active', value: '#ffffff', description: 'White' },
      { name: '--surface-disabled', value: '#F6F6F6', description: 'Neutral Gray' },
    ],
  },
  content: {
    light: [
      { name: '--content', value: '#1A1A1A', description: 'Gray 900' },
      { name: '--content-secondary', value: '#333333', description: 'Gray 800' },
      { name: '--content-tertiary', value: '#666666', description: 'Gray 700' },
      { name: '--content-quaternary', value: '#999999', description: 'Gray 500' },
      { name: '--content-disabled', value: '#E0E0E0', description: 'Gray 300' },
      { name: '--content-subtle', value: '#F5F5F5', description: 'Gray 200' },
      { name: '--content-ghost', value: '#F7F7F7', description: 'Gray 100' },
    ],
    dark: [
      { name: '--content', value: '#F7F7F7', description: 'Gray 100' },
      { name: '--content-secondary', value: '#F5F5F5', description: 'Gray 200' },
      { name: '--content-tertiary', value: '#E0E0E0', description: 'Gray 300' },
      { name: '--content-quaternary', value: '#999999', description: 'Gray 500' },
      { name: '--content-disabled', value: '#666666', description: 'Gray 700' },
      { name: '--content-subtle', value: '#333333', description: 'Gray 800' },
      { name: '--content-ghost', value: '#1A1A1A', description: 'Gray 900' },
    ],
  },
  accent: {
    light: [
      { name: '--accent', value: '#000000', description: 'Black 900' },
      { name: '--accent-hover', value: '#1A1A1A', description: 'Black 800' },
      { name: '--accent-active', value: '#2D2D2D', description: 'Black 750' },
      { name: '--accent-muted', value: '#333333', description: 'Black 700' },
      { name: '--accent-subtle', value: '#666666', description: 'Black 500' },
      { name: '--accent-ghost', value: '#B0B0B0', description: 'Black 300' },
      { name: '--accent-disabled', value: '#D9D9D9', description: 'Black 200' },
      { name: '--accent-background', value: '#F0F0F0', description: 'Black 100' },
    ],
    dark: [
      { name: '--accent', value: '#FFFFFF', description: 'White' },
      { name: '--accent-hover', value: '#F0F0F0', description: 'Black 100' },
      { name: '--accent-active', value: '#D9D9D9', description: 'Black 200' },
      { name: '--accent-muted', value: '#B0B0B0', description: 'Black 300' },
      { name: '--accent-subtle', value: '#666666', description: 'Black 500' },
      { name: '--accent-ghost', value: '#333333', description: 'Black 700' },
      { name: '--accent-disabled', value: '#2D2D2D', description: 'Black 750' },
      { name: '--accent-background', value: '#1A1A1A', description: 'Black 800' },
    ],
  },
  semantic: {
    light: [
      { name: '--white-1', value: '#CCCCCC', description: 'White 900' },
      { name: '--white-2', value: '#D5D5D5', description: 'White 800' },
      { name: '--white-3', value: '#E0E0E0', description: 'White 700' },
      { name: '--white-4', value: '#EEEEEE', description: 'White 500' },
      { name: '--white-5', value: '#F5F5F5', description: 'White 300' },
      { name: '--white-6', value: '#FAFAFA', description: 'White 200' },
      { name: '--white-7', value: '#FFFFFF', description: 'White 100' },
    ],
    dark: [
      { name: '--white-1', value: '#CCCCCC', description: 'White 900' },
      { name: '--white-2', value: '#D5D5D5', description: 'White 800' },
      { name: '--white-3', value: '#E0E0E0', description: 'White 700' },
      { name: '--white-4', value: '#EEEEEE', description: 'White 500' },
      { name: '--white-5', value: '#F5F5F5', description: 'White 300' },
      { name: '--white-6', value: '#FAFAFA', description: 'White 200' },
      { name: '--white-7', value: '#FFFFFF', description: 'White 100' },
    ],
  },
  cautionRed: {
    light: [
      { name: '--red-1', value: '#800000', description: 'Red 900' },
      { name: '--red-2', value: '#9C0000', description: 'Red 800' },
      { name: '--red-3', value: '#B70000', description: 'Red 700' },
      { name: '--red-4', value: '#ED0000', description: 'Red 500' },
      { name: '--red-5', value: '#FFB3B3', description: 'Red 300' },
      { name: '--red-6', value: '#FDD0D0', description: 'Red 200' },
      { name: '--red-7', value: '#FFEAEA', description: 'Red 100' },
    ],
    dark: [
      { name: '--red-1', value: '#800000', description: 'Red 900' },
      { name: '--red-2', value: '#9C0000', description: 'Red 800' },
      { name: '--red-3', value: '#B70000', description: 'Red 700' },
      { name: '--red-4', value: '#ED0000', description: 'Red 500' },
      { name: '--red-5', value: '#FFB3B3', description: 'Red 300' },
      { name: '--red-6', value: '#FDD0D0', description: 'Red 200' },
      { name: '--red-7', value: '#FFEAEA', description: 'Red 100' },
    ],
  },
  alertOrange: {
    light: [
      { name: '--orange-1', value: '#803300', description: 'Orange 900' },
      { name: '--orange-2', value: '#994000', description: 'Orange 800' },
      { name: '--orange-3', value: '#B34A00', description: 'Orange 700' },
      { name: '--orange-4', value: '#E66000', description: 'Orange 500' },
      { name: '--orange-5', value: '#FFC299', description: 'Orange 300' },
      { name: '--orange-6', value: '#FFDCC2', description: 'Orange 200' },
      { name: '--orange-7', value: '#FFF0E6', description: 'Orange 100' },
    ],
    dark: [
      { name: '--orange-1', value: '#803300', description: 'Orange 900' },
      { name: '--orange-2', value: '#994000', description: 'Orange 800' },
      { name: '--orange-3', value: '#B34A00', description: 'Orange 700' },
      { name: '--orange-4', value: '#E66000', description: 'Orange 500' },
      { name: '--orange-5', value: '#FFC299', description: 'Orange 300' },
      { name: '--orange-6', value: '#FFDCC2', description: 'Orange 200' },
      { name: '--orange-7', value: '#FFF0E6', description: 'Orange 100' },
    ],
  },
  successGreen: {
    light: [
      { name: '--green-1', value: '#003D00', description: 'Green 900' },
      { name: '--green-2', value: '#004B00', description: 'Green 800' },
      { name: '--green-3', value: '#005900', description: 'Green 700' },
      { name: '--green-4', value: '#007500', description: 'Green 500' },
      { name: '--green-5', value: '#99D499', description: 'Green 300' },
      { name: '--green-6', value: '#C2E2C2', description: 'Green 200' },
      { name: '--green-7', value: '#E6F3E6', description: 'Green 100' },
    ],
    dark: [
      { name: '--green-1', value: '#003D00', description: 'Green 900' },
      { name: '--green-2', value: '#004B00', description: 'Green 800' },
      { name: '--green-3', value: '#005900', description: 'Green 700' },
      { name: '--green-4', value: '#007500', description: 'Green 500' },
      { name: '--green-5', value: '#99D499', description: 'Green 300' },
      { name: '--green-6', value: '#C2E2C2', description: 'Green 200' },
      { name: '--green-7', value: '#E6F3E6', description: 'Green 100' },
    ],
  },
  linkBlue: {
    light: [
      { name: '--blue-1', value: '#001A4D', description: 'Blue 900' },
      { name: '--blue-2', value: '#00245E', description: 'Blue 800' },
      { name: '--blue-3', value: '#002E6F', description: 'Blue 700' },
      { name: '--blue-4', value: '#003D91', description: 'Blue 500' },
      { name: '--blue-5', value: '#99C2FF', description: 'Blue 300' },
      { name: '--blue-6', value: '#C2DCFF', description: 'Blue 200' },
      { name: '--blue-7', value: '#E6F0FF', description: 'Blue 100' },
    ],
    dark: [
      { name: '--blue-1', value: '#001A4D', description: 'Blue 900' },
      { name: '--blue-2', value: '#00245E', description: 'Blue 800' },
      { name: '--blue-3', value: '#002E6F', description: 'Blue 700' },
      { name: '--blue-4', value: '#003D91', description: 'Blue 500' },
      { name: '--blue-5', value: '#99C2FF', description: 'Blue 300' },
      { name: '--blue-6', value: '#C2DCFF', description: 'Blue 200' },
      { name: '--blue-7', value: '#E6F0FF', description: 'Blue 100' },
    ],
  },
};

/**
 * Get all color tokens as a flat array
 */
export function getAllColorTokens(theme: 'light' | 'dark' = 'light'): ColorToken[] {
  const tokens: ColorToken[] = [];
  
  Object.values(colors).forEach((category) => {
    tokens.push(...category[theme]);
  });
  
  return tokens;
}

/**
 * Get color value by CSS variable name
 */
export function getColorByVariable(varName: string, theme: 'light' | 'dark' = 'light'): string | undefined {
  const allTokens = getAllColorTokens(theme);
  const token = allTokens.find(t => t.name === varName);
  return token?.value;
}

/**
 * Generate CSS custom properties for colors
 */
export function generateColorCSSVariables(theme: 'light' | 'dark' = 'light'): string {
  const tokens = getAllColorTokens(theme);
  const uniqueTokens = new Map<string, ColorToken>();
  
  // Remove duplicates, keeping the first occurrence
  tokens.forEach(token => {
    if (!uniqueTokens.has(token.name)) {
      uniqueTokens.set(token.name, token);
    }
  });
  
  const cssVars = Array.from(uniqueTokens.values())
    .map(token => `  ${token.name}: ${token.value};`)
    .join('\n');
  
  return `:root[data-theme="${theme}"] {\n${cssVars}\n}`;
}