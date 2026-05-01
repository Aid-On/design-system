import type { Preview } from '@storybook/react';
import '../dist/styles/tokens.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', ['Colors', 'CSS Variables']],
      },
    },
  },
};

export default preview;
