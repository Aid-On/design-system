#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Import the compiled color tokens
const { colors } = await import('../dist/tokens/colors.js');

function generateCSS() {
  const cssContent = [];
  
  // Generate light theme
  cssContent.push('/* Aid-On Design System - Color Tokens */');
  cssContent.push('');
  cssContent.push('/* Light Theme (default) */');
  cssContent.push(':root,');
  cssContent.push(':root[data-theme="light"] {');
  
  const lightTokens = new Map();
  Object.values(colors).forEach(category => {
    category.light.forEach(token => {
      if (!lightTokens.has(token.name)) {
        lightTokens.set(token.name, token);
      }
    });
  });
  
  lightTokens.forEach(token => {
    cssContent.push(`  ${token.name}: ${token.value}; /* ${token.description} */`);
  });
  
  cssContent.push('}');
  cssContent.push('');
  
  // Generate dark theme
  cssContent.push('/* Dark Theme */');
  cssContent.push(':root[data-theme="dark"] {');
  
  const darkTokens = new Map();
  Object.values(colors).forEach(category => {
    category.dark.forEach(token => {
      if (!darkTokens.has(token.name)) {
        darkTokens.set(token.name, token);
      }
    });
  });
  
  darkTokens.forEach(token => {
    cssContent.push(`  ${token.name}: ${token.value}; /* ${token.description} */`);
  });
  
  cssContent.push('}');
  cssContent.push('');
  
  // Add utility classes
  cssContent.push('/* Utility Classes */');
  cssContent.push('.theme-light {');
  cssContent.push('  color-scheme: light;');
  cssContent.push('}');
  cssContent.push('');
  cssContent.push('.theme-dark {');
  cssContent.push('  color-scheme: dark;');
  cssContent.push('}');
  cssContent.push('');
  
  // System preference media query
  cssContent.push('/* System Preference */');
  cssContent.push('@media (prefers-color-scheme: dark) {');
  cssContent.push('  :root:not([data-theme="light"]) {');
  darkTokens.forEach(token => {
    cssContent.push(`    ${token.name}: ${token.value};`);
  });
  cssContent.push('  }');
  cssContent.push('}');
  
  // Write to file
  const outputPath = join(rootDir, 'dist', 'styles', 'tokens.css');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, cssContent.join('\n'), 'utf-8');
  
  console.log('✅ Generated CSS tokens at:', outputPath);
}

generateCSS();