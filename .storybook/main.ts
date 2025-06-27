import type { StorybookConfig } from '@stencil/storybook-plugin';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",       // Documentation 
    "@storybook/addon-a11y"        // Accessibility testing
  ],
  framework: {
    name: "@stencil/storybook-plugin",
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen',  // Better performance
    check: false                  // Faster iteration
  },
  docs: {
    autodocs: 'tag'              // Generate docs from tagged stories
  },
  // Enable essential features (built into Storybook 9.0 core)
  features: {
    // These are enabled by default in 9.0, but we can configure them
    actions: true,      // Action logger for event handlers
    backgrounds: true,  // Background color switcher
    controls: true,     // Interactive controls panel
    viewport: true,     // Responsive design testing
    toolbars: true,     // Custom toolbar items
    measure: true,      // Measurement tool
    outline: true       // Element outline tool
  }
};

export default config;