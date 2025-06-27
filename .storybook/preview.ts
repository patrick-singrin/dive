import type { Preview } from '@storybook/html'
import '../src/index.css' // Adjust if your global CSS is elsewhere
import { withThemeProvider } from './theme-provider';
import { defineCustomElements } from '../loader/index.js';

// Register all Stencil components
defineCustomElements();

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: { expanded: true },
    designToken: true, // Enable design token inspection panel
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dive-theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'dive-theme', title: 'Dive Theme' },
        ],
      },
    },
    mode: {
      name: 'Mode',
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'hc-light', title: 'High Contrast Light' },
          { value: 'hc-dark', title: 'High Contrast Dark' },
        ],
      },
    },
  },
};

// (Reverted) No longer injecting Docs tab background style here

export default preview;