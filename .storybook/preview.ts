import type { Preview } from '@stencil/storybook-plugin';
import '../src/index.css';
import { withThemeProvider } from './theme-provider';
import { defineCustomElements } from '../loader/index.js';

// Register all Stencil components globally
defineCustomElements();

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    // Enable better controls
    controls: { 
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      }
    },
    // Enable actions for event handlers
    actions: { 
      argTypesRegex: '^on.*',  // Auto-detect onXxx props as actions
      handles: ['click', 'change', 'input', 'focus', 'blur'] // Handle common events
    },
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    // Global accessibility configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
          {
            id: 'landmark-one-main',
            enabled: false, // Often not relevant for individual components
          },
          {
            id: 'region',
            enabled: false, // Often not relevant for individual components
          }
        ],
      },
      element: '#storybook-root',
      manual: false,
    },
    // Enable background variations for testing
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'warm',
          value: '#f8f5f0',
        },
      ],
    },
    // Enable viewport testing
    viewport: {
      viewports: {
        small: {
          name: 'Small',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        medium: {
          name: 'Medium',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        large: {
          name: 'Large',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
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

export default preview;