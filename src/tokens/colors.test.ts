/**
 * カラートークンの整合性テスト。
 * Qwik フック（useTheme）は DOM/Qwik ランタイム依存のため対象外とし、
 * トークン定義とその純粋ユーティリティの契約を守る。
 */
import { describe, it, expect } from 'vitest';
import {
  colors,
  getAllColorTokens,
  getColorByVariable,
  generateColorCSSVariables,
} from './colors';

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

describe('color tokens', () => {
  it('全トークンが CSS 変数名（--始まり）と有効な hex 値を持つ', () => {
    for (const [categoryName, category] of Object.entries(colors)) {
      for (const theme of ['light', 'dark'] as const) {
        for (const token of category[theme]) {
          expect(token.name, `${categoryName}.${theme}`).toMatch(/^--[a-z0-9-]+$/);
          expect(token.value, `${categoryName}.${theme} ${token.name}`).toMatch(HEX);
          expect(token.description.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('light と dark で同じ変数名集合を提供する（テーマ切替で変数が消えない）', () => {
    for (const [categoryName, category] of Object.entries(colors)) {
      const light = category.light.map((t: { name: string }) => t.name).sort();
      const dark = category.dark.map((t: { name: string }) => t.name).sort();
      expect(dark, categoryName).toEqual(light);
    }
  });
});

describe('getAllColorTokens / getColorByVariable', () => {
  it('全カテゴリのトークンを平坦化して返す', () => {
    const all = getAllColorTokens('light');
    const expected = Object.values(colors).reduce((n, c) => n + c.light.length, 0);
    expect(all.length).toBe(expected);
  });

  it('変数名で値を引ける・未知の変数は undefined', () => {
    expect(getColorByVariable('--surface')).toBe('#6C4FEA');
    expect(getColorByVariable('--no-such-token')).toBeUndefined();
  });
});

describe('generateColorCSSVariables', () => {
  it('テーマスコープ付きの :root ブロックを生成し、重複変数は最初の定義を採る', () => {
    const css = generateColorCSSVariables('dark');
    expect(css.startsWith(':root[data-theme="dark"] {')).toBe(true);
    expect(css.trimEnd().endsWith('}')).toBe(true);

    // 重複なし（同名変数が2行現れない）
    const names = [...css.matchAll(/^\s+(--[a-z0-9-]+):/gm)].map((m) => m[1]);
    expect(new Set(names).size).toBe(names.length);
    // 各行は "  --name: value;" 形式
    expect(css).toMatch(/^ {2}--surface: #6C4FEA;$/m);
  });
});
