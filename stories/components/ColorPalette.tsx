import React from 'react';
import type { ColorToken } from '../../src/tokens/colors';

type Props = {
  title: string;
  tokens: ColorToken[];
};

export const ColorPalette: React.FC<Props> = ({ title, tokens }) => (
  <section>
    <h3 className="aid-section-title">{title}</h3>
    <div className="aid-swatch-grid">
      {tokens.map((t) => (
        <div key={`${title}-${t.name}-${t.value}`} className="aid-swatch">
          <div className="aid-swatch__chip" style={{ background: t.value }} />
          <div className="aid-swatch__meta">
            <div className="aid-swatch__name">{t.name}</div>
            <div className="aid-swatch__value">{t.value}</div>
            <div className="aid-swatch__desc">{t.description}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
