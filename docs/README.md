# @aid-on/design-system

## 概要

`@aid-on/design-system`は、Aid-Onプラットフォーム用のデザインシステムライブラリです。Qwikアプリケーションで使用するデザイントークン、カラーシステム、ユーティリティ関数を提供し、一貫したUIデザインと開発効率の向上を実現します。

## 主な特徴

- **デザイントークン**: カラー、タイポグラフィ、スペーシングの統一規格
- **カラーシステム**: ライト/ダークテーマ対応の包括的カラーパレット
- **Qwik統合**: Qwik Signal APIと統合されたテーマ管理
- **CSS変数生成**: 自動的なCSS変数とクラス生成
- **型安全性**: TypeScriptによる完全な型サポート
- **アクセシビリティ**: WCAG準拠のカラーコントラスト設計
- **レスポンシブ**: モバイルファースト設計

## アーキテクチャ

### モジュール構成

```
@aid-on/design-system/
├── tokens/         - デザイントークン定義
│   ├── colors.ts   - カラーシステム
│   └── index.ts    - トークンエクスポート
├── utils/          - ユーティリティ関数
│   ├── index.ts    - 汎用ユーティリティ
│   └── qwik-colors.ts - Qwikテーマ管理
└── styles/         - 生成されるCSS
    └── tokens.css  - CSS変数定義
```

### カラーシステム設計

- **Surface**: 背景色とサーフェス要素
- **Content**: テキストと前景色
- **Accent**: アクセント色とフォーカス色
- **Semantic**: 汎用的なセマンティックカラー
- **Status Colors**: エラー、警告、成功、情報色

## APIリファレンス

### カラートークン

```typescript
import { colors, getAllColorTokens } from '@aid-on/design-system/colors';

// カラーシステム全体にアクセス
console.log(colors.surface.light);

// 特定テーマの全カラートークンを取得
const lightTokens = getAllColorTokens('light');
const darkTokens = getAllColorTokens('dark');
```

### Qwikテーマ管理

```typescript
import { useTheme, initializeTheme } from '@aid-on/design-system';

// コンポーネント内でテーマを使用
export function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>現在のテーマ: {resolvedTheme.value}</p>
      <button onClick$={() => toggleTheme()}>
        テーマ切り替え
      </button>
      <button onClick$={() => setTheme('dark')}>
        ダークテーマ
      </button>
      <button onClick$={() => setTheme('light')}>
        ライトテーマ
      </button>
      <button onClick$={() => setTheme('system')}>
        システム設定
      </button>
    </div>
  );
}
```

### CSS変数とスタイル

```typescript
import { 
  getCSSVariable, 
  colorClass, 
  colorStyle 
} from '@aid-on/design-system';

// CSS変数の値を取得
const primaryColor = getCSSVariable('--surface');

// クラス名生成
const buttonClass = colorClass('btn', 'primary', 'hover');
// 結果: 'btn btn--primary btn--hover'

// インラインスタイル生成
const buttonStyle = colorStyle(
  '--content',      // 文字色
  '--surface',      // 背景色
  '--accent'        // ボーダー色
);
// 結果: { 
//   color: 'var(--content)', 
//   backgroundColor: 'var(--surface)', 
//   borderColor: 'var(--accent)' 
// }
```

### カラーシステムプロパティ

```typescript
import type { ColorToken, ColorCategory, ColorSystem } from '@aid-on/design-system';

// カラートークン構造
interface ColorToken {
  name: string;      // CSS変数名 (例: '--surface')
  value: string;     // 色の値 (例: '#6C4FEA')
  description: string; // 説明 (例: 'Blue')
}

// カテゴリ構造 (ライト/ダーク対応)
interface ColorCategory {
  light: ColorToken[];
  dark: ColorToken[];
}
```

## 使用例

### 基本的なテーマ統合

```typescript
// src/root.tsx
import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { initializeTheme } from '@aid-on/design-system';

import './global.css';

export default component$(() => {
  // アプリ起動時にテーマを初期化
  useVisibleTask$(() => {
    initializeTheme();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
```

### テーマ切り替え付きヘッダー

```typescript
// src/components/header/header.tsx
import { component$ } from '@builder.io/qwik';
import { useTheme } from '@aid-on/design-system';

export const Header = component$(() => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header style={{
      backgroundColor: 'var(--surface)',
      color: 'var(--content)',
      padding: '1rem',
      borderBottom: '1px solid var(--accent-ghost)'
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Aid-On Platform</h1>
        <button
          onClick$={() => toggleTheme()}
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--surface)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {resolvedTheme.value === 'light' ? '🌙' : '☀️'}
          {resolvedTheme.value === 'light' ? 'ダーク' : 'ライト'}
        </button>
      </nav>
    </header>
  );
});
```

### カラーパレット表示コンポーネント

```typescript
// src/components/color-palette/color-palette.tsx
import { component$ } from '@builder.io/qwik';
import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { colors, getAllColorTokens } from '@aid-on/design-system/colors';
import { useTheme } from '@aid-on/design-system';

export const ColorPalette = component$(() => {
  const { resolvedTheme } = useTheme();
  const colorTokens = useSignal<any[]>([]);

  useVisibleTask$(({ track }) => {
    track(() => resolvedTheme.value);
    colorTokens.value = getAllColorTokens(resolvedTheme.value);
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>カラーパレット ({resolvedTheme.value}テーマ)</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {colorTokens.value.map((token) => (
          <div 
            key={token.name}
            style={{
              border: '1px solid var(--accent-ghost)',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'var(--surface)'
            }}
          >
            <div 
              style={{ 
                height: '60px', 
                backgroundColor: token.value,
                width: '100%'
              }}
            ></div>
            <div style={{ padding: '0.75rem' }}>
              <div style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.875rem',
                color: 'var(--content)',
                marginBottom: '0.25rem'
              }}>
                {token.name}
              </div>
              <div style={{ 
                fontSize: '0.75rem',
                color: 'var(--content-secondary)'
              }}>
                {token.value}
              </div>
              <div style={{ 
                fontSize: '0.75rem',
                color: 'var(--content-tertiary)',
                marginTop: '0.25rem'
              }}>
                {token.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
```

### レスポンシブカードコンポーネント

```typescript
// src/components/card/card.tsx
import { component$, Slot } from '@builder.io/qwik';
import { colorStyle, colorClass } from '@aid-on/design-system';

interface CardProps {
  variant?: 'primary' | 'secondary' | 'accent';
  elevated?: boolean;
  interactive?: boolean;
}

export const Card = component$<CardProps>((props) => {
  const baseClass = 'card';
  const cardClass = colorClass(
    baseClass,
    props.variant,
    props.interactive ? 'hover' : undefined
  );

  const cardStyle = {
    ...colorStyle(
      '--content',
      props.variant === 'accent' ? '--accent-background' : '--surface',
      '--accent-ghost'
    ),
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--accent-ghost)',
    boxShadow: props.elevated 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none',
    transition: 'all 0.2s ease',
    cursor: props.interactive ? 'pointer' : 'default'
  };

  return (
    <div class={cardClass} style={cardStyle}>
      <Slot />
    </div>
  );
});
```

### グローバルCSS統合

```css
/* src/global.css */
@import '@aid-on/design-system/css';

/* カスタムコンポーネントスタイル */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn--primary {
  background-color: var(--surface);
  color: var(--content);
}

.btn--primary:hover {
  background-color: var(--surface-hover);
}

.btn--secondary {
  background-color: var(--accent-background);
  color: var(--accent);
  border: 1px solid var(--accent-ghost);
}

.btn--accent {
  background-color: var(--accent);
  color: var(--surface);
}

.btn--ghost {
  background-color: transparent;
  color: var(--content);
  border: 1px solid var(--accent-ghost);
}

.btn--ghost:hover {
  background-color: var(--accent-ghost);
}

.btn--disabled {
  background-color: var(--surface-disabled);
  color: var(--content-disabled);
  cursor: not-allowed;
}

/* フォーム要素 */
.input {
  padding: 0.75rem;
  border: 1px solid var(--accent-ghost);
  border-radius: 6px;
  background-color: var(--surface);
  color: var(--content);
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--surface);
  box-shadow: 0 0 0 3px var(--surface-hover);
}

/* レイアウト */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

.flex {
  display: flex;
  gap: 1rem;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 設定オプション

### テーマ設定

```typescript
// テーマの種類
type Theme = 'light' | 'dark' | 'system';

// テーマ管理オプション
const themeConfig = {
  // 初期テーマ設定
  defaultTheme: 'system' as Theme,
  
  // ローカルストレージキー
  storageKey: 'aid-on-theme',
  
  // システム設定追従
  followSystemPreference: true,
  
  // CSS属性名
  themeAttribute: 'data-theme'
};
```

### カラーカスタマイズ

```typescript
// カスタムカラーの追加
const customColors: ColorCategory = {
  light: [
    { name: '--custom-primary', value: '#FF6B6B', description: 'Custom Red' },
    { name: '--custom-secondary', value: '#4ECDC4', description: 'Custom Teal' }
  ],
  dark: [
    { name: '--custom-primary', value: '#FF8E8E', description: 'Custom Light Red' },
    { name: '--custom-secondary', value: '#70E6DD', description: 'Custom Light Teal' }
  ]
};
```

### CSS変数生成オプション

```typescript
// CSS生成設定
const cssConfig = {
  // CSS変数プレフィックス
  prefix: '--aid-on-',
  
  // ルートセレクタ
  rootSelector: ':root',
  
  // テーマ属性セレクタ
  themeSelector: '[data-theme="{{theme}}"]',
  
  // 重複除去
  removeDuplicates: true
};
```

## パフォーマンス考慮事項

### テーマ切り替えの最適化

- **CSS変数**: ランタイムでの効率的なスタイル更新
- **メモ化**: カラートークンの計算結果キャッシュ
- **遅延読み込み**: 使用されるテーマのみ読み込み

```typescript
// 効率的なテーマ適用
function applyTheme(theme: 'light' | 'dark') {
  // バッチ処理でスタイル更新
  const updates: [string, string][] = [];
  const tokens = getAllColorTokens(theme);
  
  tokens.forEach(token => {
    updates.push([token.name, token.value]);
  });
  
  // 一括でCSS変数を更新
  requestAnimationFrame(() => {
    updates.forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
  });
}
```

### CSS生成の最適化

- **重複除去**: 同名変数の重複回避
- **Tree Shaking**: 未使用カラートークンの除外
- **圧縮**: CSS出力の最小化

### バンドルサイズの最適化

```typescript
// 必要な部分のみインポート
import { useTheme } from '@aid-on/design-system/utils';
import { colors } from '@aid-on/design-system/colors';

// 全体インポートは避ける
// import * as designSystem from '@aid-on/design-system';
```

### メモリ使用量の最適化

- **弱参照**: イベントリスナーの適切な削除
- **効率的な更新**: 必要な場合のみDOM操作実行
- **GC対応**: 不要なオブジェクトの早期解放

### レンダリング最適化

```typescript
// Qwik Signalを活用した効率的な再レンダリング
export const ThemeProvider = component$(() => {
  const { resolvedTheme } = useTheme();
  
  // テーマ変更時のみ再レンダリング
  useVisibleTask$(({ track }) => {
    track(() => resolvedTheme.value);
    // テーマ依存の処理のみここに配置
  });
  
  return <Slot />;
});
```

### 開発時の最適化

- **ホットリロード**: デザイントークン変更の即座反映
- **型チェック**: TypeScriptによる開発時エラー検出
- **プレビュー**: カラーパレットの視覚的確認