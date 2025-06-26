import { LitElement, html } from 'lit';
import { componentColorsStyles } from './ComponentColors.styles';

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

function createColorSwatch(variableName: string, label: string, isText: boolean = false) {
  let colorValue = '';
  if (typeof window !== 'undefined') {
    colorValue = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }
  if (!colorValue) colorValue = variableName;

  return html`
    <div class="modern-color-card">
      <div class="modern-color-swatch" style="background:${isText ? 'var(--Color-Base-Background-default)' : `var(${variableName})`}; color:${isText ? `var(${variableName})` : 'inherit'};"></div>
      <div class="modern-color-footer">
        <div class="modern-color-label">${label}</div>
        <div class="modern-color-value">${colorValue}</div>
        <div class="modern-color-var">${variableName}</div>
      </div>
    </div>
  `;
}

// Utility to extract all CSS variable names from the Lit styles string
function extractCssVariablesFromStyles(styles: string): string[] {
  const regex = /var\((--[\w-]+)[^)]*\)/g;
  const variables = new Set<string>();
  let match;
  while ((match = regex.exec(styles))) {
    variables.add(match[1]);
  }
  return Array.from(variables);
}

export class ComponentColors extends LitElement {
  static styles = [componentColorsStyles];

  connectedCallback() {
    super.connectedCallback();
    // Extract all CSS variable names from the styles
    const styleString = (componentColorsStyles as any).cssText || componentColorsStyles.toString();
    const variables = extractCssVariablesFromStyles(styleString);
    variables.forEach(variable => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
      if (value) {
        this.style.setProperty(variable, value);
      }
    });
  }

  render() {
    return html`
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
  }
}

customElements.define('component-colors', ComponentColors); 