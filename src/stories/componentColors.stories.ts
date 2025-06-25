import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

// Define the color categories and their structure
const colorCategories = [
  {
    name: 'Base',
    subcategories: [
      { name: 'Background', prefix: '--Color-Base-Background' },
      { name: 'Foreground', prefix: '--Color-Base-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Base-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Base-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Base-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Base-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Base-Border' }
    ]
  },
  {
    name: 'Primary',
    subcategories: [
      { name: 'Background', prefix: '--Color-Primary-Background' },
      { name: 'Foreground', prefix: '--Color-Primary-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Primary-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Primary-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Primary-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Primary-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Primary-Border' }
    ]
  },
  {
    name: 'Success',
    subcategories: [
      { name: 'Background', prefix: '--Color-Success-Background' },
      { name: 'Foreground', prefix: '--Color-Success-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Success-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Success-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Success-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Success-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Success-Border' }
    ]
  },
  {
    name: 'Warning',
    subcategories: [
      { name: 'Background', prefix: '--Color-Warning-Background' },
      { name: 'Foreground', prefix: '--Color-Warning-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Warning-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Warning-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Warning-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Warning-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Warning-Border' }
    ]
  },
  {
    name: 'Error',
    subcategories: [
      { name: 'Background', prefix: '--Color-Error-Background' },
      { name: 'Foreground', prefix: '--Color-Error-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Error-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Error-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Error-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Error-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Error-Border' }
    ]
  },
  {
    name: 'Info',
    subcategories: [
      { name: 'Background', prefix: '--Color-Info-Background' },
      { name: 'Foreground', prefix: '--Color-Info-Foreground' },
      { name: 'Subtle Background', prefix: '--Color-Info-Subtle-Background' },
      { name: 'Subtle Foreground', prefix: '--Color-Info-Subtle-Foreground' },
      { name: 'Primary Background', prefix: '--Color-Info-Primary-Background' },
      { name: 'Primary Foreground', prefix: '--Color-Info-Primary-Foreground' },
      { name: 'Border', prefix: '--Color-Info-Border' }
    ]
  }
];

const states = ['default', 'hover', 'active', 'disabled'];

// Helper function to create color swatches
const createColorSwatch = (variableName: string, label: string, isText: boolean = false) => {
  // Get the color value from the computed style (fallback to variable name if not available)
  let colorValue = '';
  if (typeof window !== 'undefined') {
    colorValue = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }
  // Fallback for SSR or if color not found
  if (!colorValue) colorValue = variableName;

  return html`
    <div class="modern-color-card">
      <div class="modern-color-swatch" style="background:${isText ? 'var(--Color-Base-Background-default)' : `var(${variableName})`}; color:${isText ? `var(${variableName})` : 'inherit'};">
        <!-- Empty, just for color -->
      </div>
      <div class="modern-color-footer">
        <div class="modern-color-label">${label}</div>
        <div class="modern-color-value">${colorValue}</div>
        <div class="modern-color-var">${variableName}</div>
      </div>
    </div>
  `;
};

// Template for the color showcase
const ColorShowcaseTemplate = () => {
  return html`
    <style>
      :host, .sb-show-main, #storybook-root, .docs-story {
        max-width: 100vw !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box;
      }
      .color-showcase {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        padding: 32px 16px;
        background: var(--Color-Base-Background-default);
        color: var(--Color-Base-Foreground-default);
        min-height: 100vh;
        max-width: 100vw;
        width: 100vw;
        margin: 0 auto;
        box-sizing: border-box;
      }
      .category {
        margin-bottom: 48px;
      }
      .category-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 24px;
        color: var(--Color-Base-Foreground-default);
        border-bottom: 2px solid var(--Color-Primary-Primary-Background-default);
        padding-bottom: 8px;
      }
      .subcategory {
        margin-bottom: 32px;
      }
      .subcategory-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--Color-Base-Subtle-Foreground-default);
      }
      .modern-color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 24px;
        margin-bottom: 8px;
      }
      .modern-color-card {
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08), 0 1.5px 4px 0 rgba(0,0,0,0.04);
        overflow: hidden;
        background: #fff;
        min-width: 0;
        transition: box-shadow 0.2s;
      }
      .modern-color-card:hover {
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12), 0 2px 8px 0 rgba(0,0,0,0.06);
      }
      .modern-color-swatch {
        height: 90px;
        width: 100%;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        transition: background 0.2s;
      }
      .modern-color-footer {
        background: #fff;
        padding: 12px 16px 10px 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
      }
      .modern-color-label {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
      }
      .modern-color-value {
        font-family: monospace;
        font-size: 0.95rem;
        color: #888;
      }
      .modern-color-var {
        font-family: monospace;
        font-size: 0.8rem;
        color: #bbb;
        word-break: break-all;
      }
      @media (max-width: 768px) {
        .modern-color-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="color-showcase">
      <h1>Design System Color Variables</h1>
      ${colorCategories.map(category => html`
        <div class="category">
          <h2 class="category-title">${category.name}</h2>
          ${category.subcategories.map(subcategory => html`
            <div class="subcategory">
              <h3 class="subcategory-title">${subcategory.name}</h3>
              <div class="modern-color-grid">
                ${states.map(state => {
                  const variableName = `${subcategory.prefix}-${state}`;
                  const isText = subcategory.name.toLowerCase().includes('foreground');
                  return createColorSwatch(variableName, state, isText);
                })}
              </div>
            </div>
          `)}
        </div>
      `)}
      <!-- Focus Color -->
      <div class="category">
        <h2 class="category-title">Focus</h2>
        <div class="subcategory">
          <div class="modern-color-grid">
            ${createColorSwatch('--Color-Focus-focus', 'focus')}
          </div>
        </div>
      </div>
    </div>
  `;
};

const meta: Meta = {
  title: 'Design System/Color Variables',
  render: ColorShowcaseTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'This story showcases all CSS color variables organized by category and state. Use the mode selector to switch between different color modes.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {
  name: 'All Color Variables'
};