# Component Development - Quick Start

**⚠️ IMPORTANT**: This design system uses **Stencil** framework (not Lit). 

For the **complete component development guide**, see [COMPONENT_DEVELOPMENT.md](COMPONENT_DEVELOPMENT.md).

## 🚀 Quick Start

### 1. Create New Component

```bash
mkdir src/components/MyComponent
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/MyComponent.css  
touch src/components/MyComponent/MyComponent.stories.ts
```

### 2. Basic Component Structure

```tsx
// MyComponent.tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dive-my-component',
  styleUrl: 'MyComponent.css',
  shadow: true,
})
export class MyComponent {
  @Prop() variant: string = 'default';
  
  render() {
    return h('div', { 
      class: `component component--${this.variant}` 
    }, 'My Component');
  }
}
```

### 3. CSS with Design Tokens

```css
/* MyComponent.css */
:host {
  --component-bg: var(--Color-Base-Background-default, #fff);
  --component-text: var(--Color-Base-Foreground-default, #333);
  /* Explicit inheritance for shadow DOM */
  --Color-Base-Background-default: var(--Color-Base-Background-default, #fff);
}

.component {
  background: var(--component-bg);
  color: var(--component-text);
  padding: var(--Spacing-2, 8px);
  border-radius: var(--border-border-radius-md, 8px);
}
```

### 4. Storybook Integration

```ts
// MyComponent.stories.ts
import type { Meta, StoryObj } from '@storybook/html';
import { defineCustomElement } from '../../../dist/components/dive-my-component';

defineCustomElement();

const meta: Meta = {
  title: 'Components/MyComponent',
  component: 'dive-my-component',
  render: ({ variant }) => `<dive-my-component variant="${variant}"></dive-my-component>`,
};

export default meta;
```

### 5. Build & Test

```bash
npm run build      # Build Stencil components
npm run storybook  # Test in Storybook
```

## ✅ Key Benefits of Stencil

- **Natural CSS Variable Inheritance**: No manual forwarding needed
- **Scale Compatibility**: Same framework as Scale Design System  
- **Simplified Development**: 75% less code than previous Lit approach
- **Automatic Registration**: Components self-register
- **TypeScript Integration**: Built-in type definitions
- **No Lit Dependencies**: Pure Stencil + HTML framework for Storybook

## 📚 Complete Documentation

- **[COMPONENT_DEVELOPMENT.md](COMPONENT_DEVELOPMENT.md)**: Full development guide with patterns, troubleshooting, and best practices
- **[STENCIL_MIGRATION_SUCCESS.md](../STENCIL_MIGRATION_SUCCESS.md)**: Migration details and benefits

---

*This quick start covers the basics. See the complete documentation for advanced patterns, CSS variable handling, and troubleshooting.* 