# 🏗️ Project Context

*Understanding the Dive Design System Architecture*

## Purpose
This document provides essential context about the Dive Design System, its technical stack, and architectural decisions. Understanding this foundation is crucial for creating components that integrate seamlessly with the existing system.

---

## 🎯 Design System Overview

### Mission
Create a comprehensive, accessible, and maintainable design system that enables teams to build consistent user interfaces efficiently.

### Core Principles
- **Framework Agnostic**: Components work with any frontend framework
- **Accessibility First**: WCAG 2.1 AA compliance by default
- **Design Token Driven**: All styling through CSS custom properties
- **Developer Experience**: Simple, predictable development workflow
- **Scalable Architecture**: Patterns that work from 1 component to 100+

---

## 🏛️ Technical Architecture

### Framework Choice: Stencil
**Decision**: We use [Stencil](https://stenciljs.com/) for all component development.

**Why Stencil?**
- **Natural CSS Variable Inheritance**: Shadow DOM automatically inherits CSS custom properties
- **Scale Design System Alignment**: Same framework used by Telekom's Scale Design System
- **TypeScript Integration**: Built-in TypeScript support with automatic type generation
- **Framework Agnostic Output**: Components work everywhere (React, Vue, Angular, vanilla)
- **Optimized Build**: Lightweight, tree-shakeable output

### Build & Development Workflow
```bash
# Component development cycle
npm run build      # Build Stencil components (REQUIRED before Storybook)
npm run storybook  # Test in Storybook (auto-builds first)
npm run start      # Stencil dev server with hot reload
```

**Critical Build Requirement**: New components must be built with Stencil before Storybook can load them. This generates the distribution files that Storybook imports.

---

## 📁 Project Structure

### Component Organization
```
src/components/[ComponentName]/
├── [ComponentName].tsx              # Main Stencil component (.tsx file)
├── [ComponentName].css              # Component styles (direct CSS file)
├── [ComponentName].stories.ts       # Storybook stories
└── readme.md                        # Auto-generated component docs
```

### Design Token System
```
src/tokens/
├── css-vars/                        # CSS custom properties output
│   ├── dive-theme/                  # Theme-specific variables
│   │   ├── component.css            # Component-level tokens
│   │   └── index.css                # Global theme tokens
│   └── index.css                    # Master CSS variables file
├── data/                            # Source design tokens
│   ├── brand-theme/                 # Brand-specific tokens
│   ├── color-modes/                 # Light/dark/high-contrast modes
│   └── components/                  # Component-specific tokens
└── processor.ts                     # Token processing logic
```

### Icon System
```
public/icons/
├── outline/                         # Outline style icons (default)
│   ├── home.svg
│   ├── user.svg
│   └── settings.svg
└── filled/                          # Filled style icons
    ├── heart.svg
    ├── star.svg
    └── bookmark.svg
```

**Icon Library**: We use [Tabler Icons](https://tabler-icons.io/) (5,800+ icons). Copy icons from `node_modules/@tabler/icons/icons/` to `public/icons/` as needed.

---

## 🎨 Design Token System

### CSS Custom Property Strategy
The design system uses CSS custom properties (CSS variables) for all theming and styling values.

#### Available Token Categories
```css
/* Colors */
--Color-Base-Background-default: #ffffff;
--Color-Base-Foreground-default: #333333;
--Color-Primary-Primary-Background-default: #2563eb;
--Color-Primary-Primary-Foreground-default: #ffffff;

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

#### Shadow DOM Inheritance Pattern
```css
:host {
  /* Explicit inheritance for shadow DOM */
  --Spacing-2: var(--Spacing-2, 8px);
  --Color-Primary-Primary-Background-default: var(--Color-Primary-Primary-Background-default, #2563eb);
  
  /* Component-specific variables */
  --component-padding: var(--Spacing-2) var(--Spacing-4);
  --component-background: var(--Color-Primary-Primary-Background-default);
}
```

### Theme Support
The system supports multiple color modes:
- **Light Mode**: Default bright theme
- **Dark Mode**: Dark background variant
- **High Contrast Light**: Enhanced contrast for accessibility
- **High Contrast Dark**: Dark with enhanced contrast

Themes switch automatically through CSS custom property updates.

---

## 🔧 Development Environment

### Required Tools
- **Node.js**: 18+ recommended
- **npm**: Package management and scripts
- **TypeScript**: Built-in Stencil support
- **Storybook**: Component development environment

### Key Dependencies
```json
{
  "@stencil/core": "^4.x",
  "@storybook/html": "^7.x",
  "@tabler/icons": "^2.x"
}
```

### Development Scripts
```bash
# Component development
npm run build          # Build all Stencil components
npm run start           # Stencil dev server with hot reload
npm run test            # Run component tests

# Documentation
npm run storybook       # Start Storybook dev server
npm run build-storybook # Build Storybook for deployment

# Design tokens
npm run tokens:build    # Process design tokens
npm run tokens:watch    # Watch for token changes
```

---

## 🧩 Component Integration

### Component Registration
Stencil components are automatically registered when imported:

```tsx
// In stories or applications
import { defineCustomElement } from '../../../dist/components/dive-component-name';

// Register component for use
defineCustomElement();

// Now available as HTML element
<dive-component-name variant="primary" text="Hello"></dive-component-name>
```

### Framework Integration Examples

#### React
```tsx
import { defineCustomElement } from '@dive/components/dive-button';

defineCustomElement();

function App() {
  return <dive-button variant="primary" text="Click me" />;
}
```

#### Vue
```vue
<template>
  <dive-button variant="primary" text="Click me" />
</template>

<script>
import { defineCustomElement } from '@dive/components/dive-button';
defineCustomElement();
</script>
```

#### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElement } from '@dive/components/dive-button';

defineCustomElement();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

---

## 📊 Quality Standards

### Performance Requirements
- **Bundle Size**: Individual components <10KB gzipped
- **Load Time**: First paint <100ms for simple components
- **Memory Usage**: No memory leaks in long-running applications

### Accessibility Requirements
- **WCAG 2.1 AA**: Minimum compliance level
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Legacy Support**: IE 11 support via polyfills (if required)
- **Mobile Support**: iOS Safari 14+, Android Chrome 90+

---

## 🔄 Migration History

### From Lit to Stencil (2024)
**Previous**: The project initially explored Lit framework for web components.
**Current**: Migrated to Stencil for better CSS variable inheritance and Scale Design System alignment.

**Impact**:
- Simplified component development workflow
- Automatic CSS variable inheritance without manual forwarding
- Better TypeScript integration and type generation
- Alignment with industry-standard design system practices

*See [Decision Log](./08-decision-log.md) for complete migration rationale.*

---

## 🎯 Success Metrics

### Component Quality
- **95%+ First-Time Build Success**: Components build correctly on first attempt
- **Pixel-Perfect Figma Matching**: Visual designs match exactly
- **Sub-30 Minute Creation**: From Figma to working component
- **Zero Accessibility Violations**: All components pass automated accessibility tests

### Developer Experience
- **Consistent Patterns**: All components follow same architectural patterns
- **Clear Documentation**: Every component has comprehensive documentation
- **Fast Iteration**: Hot reload and build pipeline support rapid development
- **Low Learning Curve**: New developers productive within 1 day

### System Scalability
- **Maintainable Codebase**: Easy to add new components without breaking existing ones
- **Performance at Scale**: System performs well with 50+ components
- **Cross-Team Usage**: Teams outside design system can successfully use and extend

---

## 📚 Reference Implementation

### Primary Example: Blueprint Component
Location: `src/components/_Blueprint/`

The Blueprint component serves as the comprehensive reference implementation showing:
- Complete Stencil component patterns
- TypeScript type definitions
- CSS custom property usage
- Accessibility implementation
- Event handling
- Storybook integration

### Additional Examples
- **Badge Component**: `src/components/Badge/` - Simple component with variants
- **Icon Component**: `src/components/Icon/` - SVG icon integration with Tabler Icons
- **Chip Component**: `src/components/Chip/` - Interactive component with events

---

**Next**: Read [Figma Requirements](./02-figma-requirements.md) to understand what information we need from Figma designs. 