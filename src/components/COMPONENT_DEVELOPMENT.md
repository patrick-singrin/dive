# Component Development Guide

## 🎯 **Overview**

This guide documents the component development process for the Dive Design System, which has been successfully migrated from Lit to **Stencil** for improved CSS variable handling and Scale Design System compatibility.

## 🏗️ **Architecture**

### **Framework: Stencil**
- **Why Stencil**: Natural CSS variable inheritance in shadow DOM, Scale compatibility, no manual CSS variable forwarding needed
- **Build Output**: Custom elements with TypeScript definitions
- **Integration**: Works seamlessly with Storybook

### **Migration Success: Lit → Stencil**
- **Before**: 98 lines of complex CSS variable forwarding code
- **After**: 25 lines of clean component code
- **Solved**: CSS variable timing issues, property change styling loss, theme switching problems

## 🔧 **Technical Setup**

### **Required Dependencies**
```json
{
  "@stencil/core": "^4.0.0",
  "@types/jest": "*",
  "jest": "*",
  "puppeteer": "*"
}
```

### **Build Configuration**
```typescript
// stencil.config.ts
export const config: Config = {
  namespace: 'dive-components',
  globalStyle: 'src/index.css',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      externalRuntime: false,
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
  ]
};
```

### **Package.json Scripts**
```json
{
  "build": "stencil build",
  "start": "stencil build --dev --watch --serve",
  "storybook": "npm run build && storybook dev -p 6006"
}
```

## 📝 **Component Development Pattern**

### **1. Component Structure (Badge Example)**

```typescript
// Badge.tsx
import { Component, Prop, h } from '@stencil/core';

export type BadgeType = 'base' | 'primary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  tag: 'dive-badge',
  styleUrl: 'Badge.css',
  shadow: true,
})
export class Badge {
  @Prop() type: BadgeType = 'base';
  @Prop() text: string = '';

  render() {
    const classNames = ['badge'];
    if (this.type !== 'base') {
      classNames.push(`badge--type-${this.type}`);
    }

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      },
      role: 'badge'
    }, this.text);
  }
}
```

### **2. CSS Variable Pattern with Fallbacks**

```css
/* Badge.css */
:host {
  /* CSS variables with fallbacks for shadow DOM */
  --badge-background: var(--Color-Base-Subtle-Background-default, #f5f5f5);
  --badge-color: var(--Color-Base-Subtle-Foreground-default, #333);
  --badge-padding: var(--Spacing-1, 4px) var(--Spacing-4, 12px);
  --badge-border-radius: var(--border-border-radius-full, 999px);
  --badge-border: var(--border-border-width-default, 1px) solid transparent;
  
  /* Explicit inheritance for shadow DOM */
  --Spacing-1: var(--Spacing-1, 4px);
  --Spacing-4: var(--Spacing-4, 12px);
  --border-border-radius-full: var(--border-border-radius-full, 999px);
  --border-border-width-default: var(--border-border-width-default, 1px);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--badge-padding);
  border-radius: var(--badge-border-radius);
  border: var(--badge-border);
  background-color: var(--badge-background);
  color: var(--badge-color);
}

/* Type variants with fallbacks */
.badge--type-primary {
  --badge-background: var(--Color-Primary-Primary-Background-default, #2563eb);
  --badge-color: var(--Color-Primary-Primary-Foreground-default, #fff);
}
```

### **3. Storybook Integration**

```typescript
// Badge.stories.ts
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { defineCustomElement } from '../../../dist/components/dive-badge';

// Register the component
defineCustomElement();

const meta: Meta = {
  title: 'Components/Badge',
  component: 'dive-badge',
  render: ({ type, text }) => html`<dive-badge type="${type}" text="${text}"></dive-badge>`,
};

export default meta;
```

## 🎨 **CSS Variable System**

### **Available Design Tokens**
```css
/* Spacing */
--Spacing-0: 2px;
--Spacing-1: 4px;
--Spacing-2: 8px;
--Spacing-3: 10px;
--Spacing-4: 12px;
--Spacing-5: 16px;

/* Border Radius */
--border-border-radius-sm: 4px;
--border-border-radius-md: 8px;
--border-border-radius-lg: 16px;
--border-border-radius-full: 999px;

/* Border Width */
--border-border-width-default: 1px;
--border-border-width-hover: 2px;
```

### **Critical Pattern: Shadow DOM CSS Variables**

**❌ Problem**: Shadow DOM doesn't inherit CSS variables from document root
**✅ Solution**: Explicit inheritance with fallbacks

```css
:host {
  /* ALWAYS include fallbacks for shadow DOM */
  --my-variable: var(--Design-Token-Name, fallback-value);
  
  /* Explicit inheritance for complex variables */
  --Design-Token-Name: var(--Design-Token-Name, fallback-value);
}
```

## 🔄 **Development Workflow**

### **1. Create Component**
```bash
# Create component files
mkdir src/components/MyComponent
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/MyComponent.css
touch src/components/MyComponent/MyComponent.stories.ts
```

### **2. Build & Test**
```bash
npm run build          # Build Stencil components
npm run storybook      # Test in Storybook
```

### **3. Development Server**
```bash
npm run start          # Stencil dev server with hot reload
```

## ✅ **Success Indicators**

### **Component Works When:**
- ✅ Renders immediately with proper styling
- ✅ Property changes work smoothly (no style flickering)
- ✅ Theme switching works automatically
- ✅ CSS variables inherit properly from design system
- ✅ Fallback values work when variables unavailable

### **Component Fails When:**
- ❌ Styling disappears after property changes
- ❌ CSS variables not found errors
- ❌ Component doesn't render at all
- ❌ Import/registration errors

## 🚨 **Troubleshooting**

### **Component Not Rendering**
1. Check `npm run build` completed successfully
2. Verify `defineCustomElement()` is called in stories
3. Check browser console for registration errors
4. Ensure component file is `.tsx` not `.ts`

### **CSS Variables Not Working**
1. Add fallback values: `var(--token, fallback)`
2. Add explicit inheritance in `:host`
3. Check variable names match design system tokens
4. Verify CSS file linked correctly in `@Component`

### **Storybook Integration Issues**
1. Ensure build runs before Storybook: `"storybook": "npm run build && storybook dev"`
2. Import from `dist/components/component-name`
3. Call `defineCustomElement()` in stories

## 📊 **Migration Summary**

### **Before (Lit Framework)**
- 98+ lines of CSS variable forwarding code
- Manual `connectedCallback()`, `updated()`, `MutationObserver`
- Timing issues with Storybook theme provider
- Styling disappeared on property changes
- Complex lifecycle management

### **After (Stencil Framework)**
- 25 lines of clean component code
- Natural CSS variable inheritance
- No manual forwarding needed
- Automatic property change handling
- Theme switching works automatically
- Scale Design System compatibility

### **Performance Impact**
- **Bundle Size**: Reduced (no Lit framework overhead)
- **Runtime**: Faster (no manual variable forwarding loops)
- **Maintenance**: Simplified (75% less code)
- **Developer Experience**: Improved (no CSS variable timing issues)

## 🎨 **Storybook Theme Integration**

### **Design System Background Integration**

Storybook is configured to use the design system's background variables, so the entire interface changes with theme modes:

```typescript
// .storybook/theme-provider.ts
:root {
  --sb-bg-primary: var(--Color-Base-Background-default, ${lightBg});
  --sb-bg-subtle: var(--Color-Base-Subtle-Background-default, ${subtleBg});
  --sb-text-primary: var(--Color-Base-Foreground-default, ${textColor});
}

/* Storybook UI adapts to design system themes */
#storybook-root,
.css-1cvjpgl,
.sb-main-padded {
  background: var(--sb-bg-primary) !important;
  color: var(--sb-text-primary) !important;
  transition: background 0.2s, color 0.2s;
}
```

### **Theme Mode Behavior**
- **Light Mode**: White background (`#ffffff`) with dark text
- **Dark Mode**: Black background (`#000000`) with light text  
- **High Contrast**: Enhanced contrast versions
- **Story Canvas**: Uses subtle background for component context

## 🎯 **Next Steps**

1. **Scale Additional Components**: Apply Stencil pattern to other components
2. **Enhanced Integration**: Explore Scale Design System patterns
3. **Performance Optimization**: Leverage Stencil's lazy loading
4. **Type Safety**: Enhance TypeScript integration
5. **Testing**: Implement Stencil unit tests
6. **Storybook Theming**: Further customize Storybook UI to match design system

---

## 📋 **Documentation Updates**

All project documentation has been updated to reflect the Stencil migration:

- ✅ **README.md**: Updated quickstart and component workflows
- ✅ **src/components/README.md**: Complete rewrite for Stencil patterns  
- ✅ **scripts/README.md**: Removed outdated Lit CSS automation references
- ✅ **COMPONENT_DEVELOPMENT.md**: Comprehensive Stencil guide (this file)
- ✅ **STENCIL_MIGRATION_SUCCESS.md**: Migration summary and benefits

**No more outdated Lit-based documentation exists in the project.** All guides now accurately reflect the current Stencil-based architecture.

---

**The Stencil migration successfully resolved all CSS variable issues while providing a cleaner, more maintainable development experience!** 🚀 