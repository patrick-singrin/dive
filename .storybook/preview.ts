import type { Preview } from '@storybook/web-components'
import '../src/index.css' // Adjust if your global CSS is elsewhere
import { injectAllTokenCssVars } from '../src/tokens/inject-css-vars';

// Theme/mode switching decorator
const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme || 'dive-theme'
  const mode = context.globals.mode || 'light'
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.setAttribute('data-theme-name', theme)

  // Inject all design tokens as CSS variables for the selected mode
  injectAllTokenCssVars(mode);

  // Inject canvas/card and full background style using the design token
  const canvasStyleId = 'storybook-canvas-token-bg-style';
  let canvasStyle = document.getElementById(canvasStyleId) as HTMLStyleElement | null;
  if (!canvasStyle) {
    canvasStyle = document.createElement('style');
    canvasStyle.id = canvasStyleId;
    document.head.appendChild(canvasStyle);
  }
  canvasStyle.textContent = `
    body {
      background: #fff !important;
    }
    .css-1cvjpgl {
      background: var(--Color-Components-Base-Background-Default, #fff) !important;
      transition: background 0.2s;
    }
  `;

  return Story()
}

export const decorators = [withThemeProvider]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dive-theme',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'dive-theme', title: 'Dive Theme' },
        // Add more themes as needed
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
}

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    designToken: true, // Enable design token inspection panel
  },
};

// (Reverted) No longer injecting Docs tab background style here

export default preview;