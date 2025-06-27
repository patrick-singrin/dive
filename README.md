# Dive Design System

A comprehensive design system built with Stencil web components, featuring automated design token processing, systematic component creation workflows, and comprehensive documentation for consistent, maintainable user interfaces.

## Why Dive Design System

**Framework Agnostic**: Built with Stencil web components that work in React, Vue, Angular, or vanilla JavaScript without framework dependencies or lock-in.

**Design Token Automation**: Automated pipeline processes Figma-exported JSON into CSS custom properties with support for multiple themes and color modes.

**Systematic Component Creation**: 8-phase documented workflow from Figma analysis to production-ready components with comprehensive quality assurance.

**Developer Experience Focus**: Hot reload development, TypeScript integration, comprehensive Storybook documentation, and systematic patterns that reduce learning curve.

**Living Documentation**: Modular documentation system with problem database, decision log, and living blueprints that capture institutional knowledge and prevent repeated mistakes.

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation & Setup
```bash
# Clone and install dependencies
npm install

# Build Stencil components (required before Storybook)
npm run build

# Start development environment
npm run storybook
```

### Generate Design Tokens
```bash
# Process design tokens from Figma exports
npx ts-node scripts/generate-css-variables.ts
```

### Create Your First Component
```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dive-button',
  styleUrl: 'Button.css',
  shadow: true,
})
export class Button {
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() text: string = '';

  render() {
    return h('button', {
      class: `button button--${this.variant}`
    }, this.text);
  }
}
```

### Use Components Anywhere
```html
<!-- Works in any framework or vanilla HTML -->
<dive-button variant="primary" text="Click me"></dive-button>
```

---

## Core Features

### 🎨 **Design Token System**
- **Automated Processing**: Direct Figma JSON to CSS variables pipeline
- **Multi-Theme Support**: Light, dark, and high-contrast color modes
- **Component-Level Tokens**: Granular control with component-specific overrides
- **CSS Custom Properties**: Shadow DOM compatible variable inheritance

### ⚡ **Component Development**
- **Stencil Framework**: TypeScript-first with automatic type generation
- **Shadow DOM**: Encapsulated styling with systematic CSS variable patterns
- **Event System**: Typed custom events with proper emission patterns
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive validation

### 🛠️ **Developer Tools**
- **Storybook Integration**: Comprehensive component documentation and testing
- **Hot Reload**: Instant feedback during development
- **TypeScript Support**: Full type safety with IDE integration
- **Build Optimization**: Tree-shakeable components under 10KB gzipped

### 📚 **Documentation System**
- **Modular Approach**: 8-phase component creation documentation
- **Living Problem Database**: Captures known issues and proven solutions
- **Quality Assurance**: Systematic validation checklists and testing requirements
- **Decision Log**: Architectural decisions and rationale tracking

---

## Architecture

### Project Structure
```
src/
├── components/           # Stencil web components
│   └── [ComponentName]/
│       ├── ComponentName.tsx    # Component implementation
│       ├── ComponentName.css    # Component styles
│       └── ComponentName.stories.ts  # Storybook stories
├── tokens/
│   ├── data/            # Source design tokens (Figma exports)
│   │   ├── brand-theme/     # Brand-specific tokens
│   │   ├── color-modes/     # Light/dark/high-contrast
│   │   └── components/      # Component-specific tokens
│   └── css-vars/        # Generated CSS custom properties
├── scripts/             # Design token processing
└── public/icons/        # Tabler Icons integration (5,800+ icons)
```

### Design Token Pipeline
```
Figma Variables Export (JSON) 
    ↓
TypeScript Token Processor
    ↓
CSS Custom Properties
    ↓
Multi-Theme CSS Files
    ↓
Stencil Component Integration
```

### Component Architecture Patterns
```tsx
// Systematic prop patterns
@Prop() variant: ComponentVariant = 'primary';
@Prop() size: ComponentSize = 'medium';
@Prop() disabled: boolean = false;

// CSS variable inheritance for Shadow DOM
:host {
  --Spacing-2: var(--Spacing-2, 8px);
  --Color-Primary-Background-default: var(--Color-Primary-Background-default, #2563eb);
}

// Event emission patterns
@Event() componentClick: EventEmitter<MouseEvent>;
```

---

## Framework Integration

### React
```tsx
import { defineCustomElement } from '@dive/components/dive-button';

defineCustomElement();

function App() {
  return <dive-button variant="primary" text="React Button" />;
}
```

### Vue 3
```vue
<template>
  <dive-button variant="primary" text="Vue Button" />
</template>

<script setup>
import { defineCustomElement } from '@dive/components/dive-button';
defineCustomElement();
</script>
```

### Angular
```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElement } from '@dive/components/dive-button';

defineCustomElement();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

### Vanilla JavaScript
```html
<script type="module">
  import { defineCustomElement } from './dist/components/dive-button.js';
  defineCustomElement();
</script>

<dive-button variant="primary" text="Vanilla Button"></dive-button>
```

---

## Development Workflow

### Component Creation Process
1. **[Project Context](./docs/component-creation/01-project-context.md)** - Understand system architecture
2. **[Figma Analysis](./docs/component-creation/02-figma-requirements.md)** - Extract design specifications
3. **[Implementation](./docs/component-creation/03-technical-implementation.md)** - Build with Stencil patterns
4. **[Reference Patterns](./docs/component-creation/04-living-blueprint.md)** - Follow proven implementations
5. **[Quality Assurance](./docs/component-creation/05-quality-assurance.md)** - Validate before release

### Available Commands
```bash
# Development
npm run build          # Build Stencil components
npm run start           # Stencil dev server with hot reload
npm run storybook       # Component development environment

# Design Tokens
npm run tokens:build    # Process design tokens
npm run tokens:watch    # Watch for token changes

# Testing
npm run test            # Run component tests
npm run test:watch      # Watch mode for testing

# Production
npm run build-storybook # Build Storybook for deployment
```

---

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Android Chrome 90+
- **Web Components**: Native support in all target browsers
- **CSS Custom Properties**: Full support for theming system

---

## Contributing

### Development Setup
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Build components: `npm run build`
4. Start development: `npm run storybook`

### Component Contribution
1. Follow the [8-phase creation process](./docs/component-creation/)
2. Use the [Living Blueprint](./docs/component-creation/04-living-blueprint.md) for patterns
3. Complete [Quality Assurance](./docs/component-creation/05-quality-assurance.md) validation
4. Submit pull request with documentation

### Documentation Updates
- **Problem Database**: Add solutions for new issues encountered
- **User Feedback**: Share insights and improvements
- **Decision Log**: Document architectural decisions

---

## Resources

### Documentation
- **[Component Creation Guide](./docs/component-creation/)** - Complete development workflow
- **[Technical Implementation](./docs/component-creation/03-technical-implementation.md)** - Code patterns and conventions
- **[Quality Assurance](./docs/component-creation/05-quality-assurance.md)** - Validation checklists

### Design Tokens
- **[Token Processing](./scripts/README.md)** - Design token pipeline documentation
- **[Multi-Theme Setup](./src/tokens/)** - Theme configuration and customization

### Examples
- **[Storybook](http://localhost:6006)** - Live component examples and documentation
- **[Living Blueprint](./docs/component-creation/04-living-blueprint.md)** - Reference implementation patterns

---

## License

[License information - specify your license here]

---

## Support

For questions, issues, or contributions:
- **Documentation**: Start with the [Component Creation Guide](./docs/component-creation/)
- **Issues**: Check the [Problem Database](./docs/component-creation/06-problem-database.md) for known solutions
- **Feature Requests**: Use the [User Feedback](./docs/component-creation/07-user-feedback.md) system

*Built with systematic quality assurance and comprehensive documentation to enable predictable, maintainable component development.*