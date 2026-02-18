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
export declare const colors: ColorSystem;
/**
 * Get all color tokens as a flat array
 */
export declare function getAllColorTokens(theme?: 'light' | 'dark'): ColorToken[];
/**
 * Get color value by CSS variable name
 */
export declare function getColorByVariable(varName: string, theme?: 'light' | 'dark'): string | undefined;
/**
 * Generate CSS custom properties for colors
 */
export declare function generateColorCSSVariables(theme?: 'light' | 'dark'): string;
//# sourceMappingURL=colors.d.ts.map