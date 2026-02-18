# @aid-on/design-system

<div align="center">

[![npm version](https://img.shields.io/npm/v/@aid-on/design-system.svg?style=flat-square&color=00DC82)](https://www.npmjs.com/package/@aid-on/design-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<br />

<h3><b>design-system</b> - Qwikアプリケーション向けデザイントークンとテーマ管理</h3>
<p align="center"><b>一貫したデザイン、迷いゼロ。</b><br/>ライト/ダークテーマ対応の型安全なカラートークンシステム。@builder.io/qwik向けに構築。</p>

<br/>

**日本語** | [**English**](./README.md)

<br/>

</div>

## 特徴

- **カラートークンシステム** - 構造化されたカラーカテゴリ（surface, content, accent, semantic, ステータスインジケーター）をライト/ダークバリアント付きで提供
- **Qwikフック** - `useTheme()` と `useColorPreference()` によるリアクティブなテーマ管理
- **CSS変数ユーティリティ** - `getCSSVariable()`, `colorClass()`, `colorStyle()` による柔軟なスタイリング
- **システム設定検出** - `prefers-color-scheme` の自動検出とリアルタイム更新
- **生成済みCSS** - 全トークン変数を含む事前ビルドCSSファイルを直接インポート可能
- **サブパスエクスポート** - 必要なものだけインポート: `./tokens`, `./colors`, `./utils`, `./css`

## インストール

```bash
npm install @aid-on/design-system
```

**ピア依存:**

```bash
npm install @builder.io/qwik@^1.11.0
```

## クイックスタート

### 1. テーマの初期化

```typescript
import { useTheme } from "@aid-on/design-system";

export const App = component$(() => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>現在のテーマ: {resolvedTheme.value}</p>
      <button onClick$={() => toggleTheme()}>テーマ切替</button>
      <button onClick$={() => setTheme("light")}>ライト</button>
      <button onClick$={() => setTheme("dark")}>ダーク</button>
      <button onClick$={() => setTheme("system")}>システム</button>
    </div>
  );
});
```

### 2. CSSトークンのインポート

```typescript
// 全カラー変数を含む生成済みCSSをインポート
import "@aid-on/design-system/css";
```

### 3. スタイルでカラートークンを使用

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

## カラーカテゴリ

トークンシステムはセマンティックなカテゴリで構成され、各カテゴリにライト/ダークテーマバリアントがあります:

| カテゴリ | トークン | 説明 |
|---------|---------|------|
| **Surface** | `--surface`, `--surface-elevated`, `--surface-hover`, `--surface-active`, `--surface-disabled` | コンテナやレイアウトの背景色 |
| **Content** | `--content` 〜 `--content-ghost` | テキストやアイコンの色（7段階の強調レベル） |
| **Accent** | `--accent` 〜 `--accent-background` | インタラクティブ要素の色（8バリアント） |
| **Semantic** | `--white-1` 〜 `--white-7` | オーバーレイやボーダー用のニュートラルホワイトスケール |
| **Caution Red** | `--red-1` 〜 `--red-7` | エラーや破壊的アクションのインジケーター |
| **Alert Orange** | `--orange-1` 〜 `--orange-7` | 警告・注意のインジケーター |
| **Success Green** | `--green-1` 〜 `--green-7` | 成功・確認のインジケーター |
| **Link Blue** | `--blue-1` 〜 `--blue-7` | リンクや情報のインジケーター |

## APIリファレンス

### フック

#### `useTheme()`

リアクティブな状態を持つテーマ管理用Qwikフック。

```typescript
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

| 戻り値 | 型 | 説明 |
|--------|-----|------|
| `theme` | `Signal<Theme>` | 現在のテーマ設定（`'light'`, `'dark'`, `'system'`） |
| `resolvedTheme` | `Signal<'light' \| 'dark'>` | システム設定適用後の解決済みテーマ |
| `setTheme` | `(theme: Theme) => void` | テーマを設定しlocalStorageに永続化 |
| `toggleTheme` | `() => void` | ライトとダークを切り替え |

#### `useColorPreference()`

システムカラースキーム設定の変更を追跡するフック。

```typescript
const preference = useColorPreference();
// preference.value は 'light' または 'dark'
```

### 関数

#### `initializeTheme()`

アプリ起動時にlocalStorageからテーマを初期化。アプリライフサイクルの早い段階で呼び出してください。

```typescript
import { initializeTheme } from "@aid-on/design-system";

const theme = initializeTheme(); // 現在のテーマを返す
```

#### `getCSSVariable(varName)`

実行時にCSS変数の計算済み値を取得。

```typescript
import { getCSSVariable } from "@aid-on/design-system";

const surfaceColor = getCSSVariable("--surface");
```

#### `colorClass(base, variant?, state?)`

コンポーネント用のBEMスタイルクラス名を生成。

```typescript
import { colorClass } from "@aid-on/design-system";

colorClass("btn");                          // "btn"
colorClass("btn", "primary");               // "btn btn--primary"
colorClass("btn", "primary", "hover");      // "btn btn--primary btn--hover"
colorClass("btn", undefined, "disabled");   // "btn btn--disabled"
```

**バリアント:** `'primary'`, `'secondary'`, `'accent'`, `'ghost'`, `'error'`, `'warning'`, `'success'`, `'info'`

**ステート:** `'hover'`, `'active'`, `'disabled'`

#### `colorStyle(fg?, bg?, border?)`

CSS変数対応のインラインスタイルオブジェクトを生成。

```typescript
import { colorStyle } from "@aid-on/design-system";

// CSS変数名は自動的にvar()でラップされる
colorStyle("--content", "--surface");
// { color: "var(--content)", backgroundColor: "var(--surface)" }

// 直接の色値はそのまま通過
colorStyle("#333", "#fff", "#ccc");
// { color: "#333", backgroundColor: "#fff", borderColor: "#ccc" }
```

### トークン関数

#### `getAllColorTokens(theme?)`

指定テーマの全カラートークンをフラット配列で取得。

```typescript
import { getAllColorTokens } from "@aid-on/design-system/tokens";

const lightTokens = getAllColorTokens("light");
const darkTokens = getAllColorTokens("dark");
```

#### `getColorByVariable(varName, theme?)`

CSS変数名でカラー値を検索。

```typescript
import { getColorByVariable } from "@aid-on/design-system/tokens";

const color = getColorByVariable("--surface", "light"); // "#6C4FEA"
```

#### `generateColorCSSVariables(theme?)`

テーマ用のCSSカスタムプロパティ文字列を生成。

```typescript
import { generateColorCSSVariables } from "@aid-on/design-system/tokens";

const css = generateColorCSSVariables("dark");
// :root[data-theme="dark"] { --surface: #6C4FEA; ... }
```

## サブパスエクスポート

```typescript
// 全部
import { colors, useTheme, colorStyle } from "@aid-on/design-system";

// トークンのみ（Qwik依存なし）
import { colors, getAllColorTokens, getColorByVariable } from "@aid-on/design-system/tokens";

// カラー直接
import { colors, ColorSystem } from "@aid-on/design-system/colors";

// ユーティリティ（Qwik必要）
import { useTheme, getCSSVariable, colorClass } from "@aid-on/design-system/utils";

// CSSファイル
import "@aid-on/design-system/css";
```

## 型定義

```typescript
import type {
  ColorToken,      // { name: string; value: string; description: string }
  ColorCategory,   // { light: ColorToken[]; dark: ColorToken[] }
  ColorSystem,     // 全カテゴリを含む完全なカラーシステム
  Theme,           // 'light' | 'dark' | 'system'
} from "@aid-on/design-system";
```

## テーマの仕組み

1. `useTheme()` が `<html>` に `data-theme` 属性を設定し、CSS変数をインラインで適用
2. テーマ設定は `localStorage` の `aid-on-theme` キーに永続化
3. `'system'` 設定時は `prefers-color-scheme` メディアクエリの変更をリッスン
4. CSS変数は `document.documentElement.style` に直接適用されるため、スタイルシートのデフォルトをオーバーライド

## ライセンス

MIT
