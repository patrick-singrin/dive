# Figma to Stencil Component Generation Prompt

## 🎯 Purpose
This document provides a complete prompt for creating Stencil Web Components from Figma designs using the Figma MCP Server. Use this as context when asking an LLM to generate components.

## 📋 Required Input

**Figma Component URL**: [PASTE_FIGMA_URL_HERE]

*If no URL is provided, please ask for the Figma component URL before proceeding.*

---

# Complete Component Generation Prompt

## Context
You are an expert frontend developer with deep expertise in:
- **Stencil Framework**: Building performant, framework-agnostic custom elements with natural CSS variable inheritance
- **Design Systems Engineering**: Translating design tokens and component specifications into maintainable code
- **Figma MCP Server Integration**: Interpreting Figma component data retrieved via MCP server
- **TypeScript**: Creating type-safe, modern web components
- **Storybook Documentation**: Creating comprehensive component stories and documentation
- **CSS Custom Properties**: Implementing pixel-perfect styling with design system variables

## Task
Generate a complete Stencil Web Component implementation based on the provided Figma component specification retrieved via Figma MCP Server. The output must be a 1:1 visual match with the Figma design.

## Technical Architecture

### 🏗️ Stencil Framework Requirements
This project uses **Stencil** (not Lit), which provides:
- **Natural CSS Variable Inheritance**: No manual forwarding needed in shadow DOM
- **Scale Design System Compatibility**: Same framework as Scale Design System
- **Automatic Component Registration**: Components self-register
- **TypeScript Integration**: Built-in type definitions
- **Optimized Build Output**: Lightweight custom elements

### 📁 Project Structure
```
src/components/[ComponentName]/
├── [ComponentName].tsx              # Main Stencil component (.tsx file)
├── [ComponentName].css              # Component styles (direct CSS file)
├── [ComponentName].stories.ts       # Storybook stories
└── readme.md                        # Auto-generated component docs
```

### ⚙️ Build & Development Workflow
```bash
npm run build      # Build Stencil components (required before Storybook)
npm run storybook  # Test in Storybook (auto-builds first)
npm run start      # Stencil dev server with hot reload
```

### 🚨 Critical Build Requirements
**IMPORTANT**: New components must be built with Stencil before Storybook can load them:

1. **Build First**: Always run `npm run build` after creating a new component
2. **Storybook Import Error**: If you see `Failed to fetch dynamically imported module` errors in Storybook, the component hasn't been built yet
3. **Distribution Files**: Storybook stories import from `../../../dist/components/[component-name]` which only exists after build
4. **Development Cycle**: Component creation → Build → Storybook → Iterate

## Required Inputs
- **Figma URL**: [PASTE_FIGMA_URL_HERE] - This will be processed by the Figma MCP Server
- **Design System Variables**: Available in `src/tokens/css-vars/dive-theme/component.css`
- **Development Patterns**: Follow examples in `src/components/Badge/` (reference implementation)

## MCP Server Integration
The Figma MCP Server will automatically:
- Extract component properties and variants
- Retrieve design tokens and styling information  
- Parse component structure and layout details
- Provide comprehensive component metadata

**Important**: Reference the MCP server data directly - don't make assumptions about the component structure.

## Critical Requirements

### 🎯 Figma Fidelity (HIGHEST PRIORITY)
1. **Exact Visual Match**: The rendered component must be pixel-perfect to the Figma design
2. **Complete Property Replication**: Implement EVERY property, state, and variable defined in the Figma component
3. **Component Variants**: Implement ALL variants shown in Figma (states, sizes, types, etc.)
4. **Component Properties**: Replicate ALL component properties exactly as defined in Figma's component panel
5. **Component Variables**: Map ALL Figma component variables to corresponding prop types and values
6. **Interactive States**: Implement ALL interactive states (hover, pressed, focused, disabled, etc.)
7. **Boolean Properties**: Convert all boolean properties from Figma into component props
8. **Auto-layout Respect**: Honor Figma's auto-layout settings (flex direction, gaps, padding, alignment)
9. **Typography Matching**: Use exact font sizes, weights, line heights, and letter spacing from Figma
10. **Color Precision**: Map Figma color tokens to the corresponding CSS variables
11. **Spacing Accuracy**: Replicate exact padding, margins, and gaps from Figma measurements

### 📐 Stencil Technical Implementation

#### Component Structure
```tsx
import { Component, Prop, h } from '@stencil/core';

export type ComponentType = 'variant1' | 'variant2' | 'variant3';

@Component({
  tag: 'dive-component-name',
  styleUrl: 'ComponentName.css',
  shadow: true,
})
export class ComponentName {
  @Prop() type: ComponentType = 'variant1';
  @Prop() text: string = '';
  @Prop() disabled: boolean = false;

  render() {
    const classNames = ['component'];
    if (this.type !== 'variant1') {
      classNames.push(`component--type-${this.type}`);
    }
    if (this.disabled) {
      classNames.push('component--disabled');
    }

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      },
      role: 'component-role'
    }, this.text);
  }
}
```

#### CSS with Design System Variables
```css
:host {
  /* CSS variables with fallbacks for shadow DOM */
  --component-background: var(--Color-Base-Background-default, #fff);
  --component-color: var(--Color-Base-Foreground-default, #333);
  --component-padding: var(--Spacing-2, 8px) var(--Spacing-4, 12px);
  --component-border-radius: var(--border-border-radius-md, 8px);
  --component-border: var(--border-border-width-default, 1px) solid transparent;
  
  /* Explicit inheritance for shadow DOM (required for complex variables) */
  --Spacing-2: var(--Spacing-2, 8px);
  --Spacing-4: var(--Spacing-4, 12px);
  --border-border-radius-md: var(--border-border-radius-md, 8px);
}

.component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--component-padding);
  border-radius: var(--component-border-radius);
  border: var(--component-border);
  background-color: var(--component-background);
  color: var(--component-color);
  transition: all 0.2s ease;
}

/* Variant implementations */
.component--type-primary {
  --component-background: var(--Color-Primary-Primary-Background-default, #2563eb);
  --component-color: var(--Color-Primary-Primary-Foreground-default, #fff);
}

/* State implementations */
.component--disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

#### Storybook Integration
```ts
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { defineCustomElement } from '../../../dist/components/dive-component-name';

// Register the component (required for Stencil)
defineCustomElement();

const meta: Meta = {
  title: 'Components/ComponentName',
  component: 'dive-component-name',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['variant1', 'variant2', 'variant3'],
      description: 'The visual style variant',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
  },
  args: {
    type: 'variant1',
    text: 'Component Text',
    disabled: false,
  },
  render: (args) => html`<dive-component-name 
    type="${args.type}" 
    text="${args.text}" 
    ?disabled="${args.disabled}">
  </dive-component-name>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: 'variant1',
    text: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'Primary Component',
  },
};
```

### 🎨 Available Design System Variables

Use ONLY existing CSS variables from the design system:

#### Colors
```css
/* Base Colors */
--Color-Base-Background-default
--Color-Base-Foreground-default
--Color-Base-Subtle-Background-default
--Color-Base-Subtle-Foreground-default

/* Semantic Colors */
--Color-Primary-Primary-Background-default
--Color-Primary-Primary-Foreground-default
--Color-Success-Primary-Background-default
--Color-Warning-Primary-Background-default
--Color-Error-Primary-Background-default
--Color-Info-Primary-Background-default
```

#### Spacing
```css
--Spacing-0: 2px
--Spacing-1: 4px
--Spacing-2: 8px
--Spacing-3: 10px
--Spacing-4: 12px
--Spacing-5: 16px
```

#### Border Radius
```css
--border-border-radius-sm: 4px
--border-border-radius-md: 8px
--border-border-radius-lg: 16px
--border-border-radius-full: 999px
```

#### Border Width
```css
--border-border-width-default: 1px
--border-border-width-hover: 2px
```

### 🔧 Critical Stencil Patterns

1. **Shadow DOM CSS Variables**: Always include fallback values and explicit inheritance
2. **Class-based Styling**: Use BEM-like class names (`component--modifier-value`)
3. **Property Reflection**: Properties are automatically reflected as attributes
4. **TypeScript Types**: Export types for external use
5. **Natural Inheritance**: CSS variables work automatically (no manual forwarding)
6. **Component Registration**: Use `defineCustomElement()` in stories

## Analysis Process

### Step 1: MCP Server Data Analysis
First, process the Figma MCP Server response and document:
- **Component metadata**: Name, description, and component ID
- **Component Properties**: ALL properties with their types, options, and default values from MCP data
- **Component Variables**: ALL variables (text, boolean, instance swap, etc.) from MCP response
- **Variant combinations**: All possible variant states from MCP server
- **Design tokens**: Colors, typography, spacing, shadows, borders from MCP data
- **Layout properties**: Auto-layout settings, constraints, and positioning from MCP response
- **Interactive states**: Hover, focus, active, disabled states from component data
- **Asset references**: Icons, images, and other assets referenced in the component

### Step 2: CSS Variable Mapping
Cross-reference Figma design tokens with available CSS variables:
- Map colors: `--Color-Primary-Primary-Background-default` ↔ Primary background
- Map typography: Font sizes and weights from design system
- Map spacing: `--Spacing-4` ↔ 12px spacing values
- Map borders: `--border-border-radius-md` ↔ Medium border radius

### Step 3: Stencil Component Architecture Planning
Plan comprehensive Stencil component architecture:
- **Map ALL MCP Properties**: Create corresponding `@Prop()` declarations for every Figma component property
- **Preserve Property Names**: Use camelCase for properties (Stencil handles kebab-case attributes automatically)
- **Match Property Types**: Boolean → `boolean`, Text → `string`, Variants → union types
- **Replicate Property Logic**: Implement the same conditional logic as Figma's property system
- **Default Values**: Set the same default values as defined in MCP server data
- **Variant System**: Build variant system using CSS classes and conditional class names
- **State Management**: Handle all interactive and non-interactive states
- **Event Dispatching**: Use Stencil's `@Event()` decorator for custom events
- **Slot Architecture**: Use `<slot>` elements for customizable content areas

## Quality Checklist

### Visual & Property Accuracy ✅
- [ ] Component matches Figma design exactly
- [ ] ALL MCP server component properties are implemented as Stencil `@Prop()` declarations
- [ ] ALL Figma component variables from MCP data are replicated
- [ ] All variants render correctly with proper property combinations
- [ ] Boolean properties work exactly as in Figma (show/hide functionality)
- [ ] Text properties are customizable as designed
- [ ] Slot-based content areas function properly
- [ ] All interactive states work as designed
- [ ] Property dependencies and conditional logic match MCP server data
- [ ] Default values match Figma's defaults from MCP response
- [ ] Spacing and typography are pixel-perfect
- [ ] Colors match design tokens precisely

### Stencil Framework Implementation ✅
- [ ] Component uses `@Component()` decorator with proper tag name
- [ ] All properties use `@Prop()` decorator with correct types
- [ ] CSS file is linked via `styleUrl` property
- [ ] Shadow DOM is enabled (`shadow: true`)
- [ ] Component renders using `h()` function or JSX
- [ ] TypeScript interfaces are exported for external use
- [ ] CSS custom properties include fallback values
- [ ] Explicit CSS variable inheritance for complex variables
- [ ] Component follows existing project patterns (see Badge component)
- [ ] No hardcoded values or magic numbers

### Storybook Documentation ✅
- [ ] All variants have corresponding stories
- [ ] `defineCustomElement()` is called to register component
- [ ] Interactive controls work properly for all properties
- [ ] Stories use proper `render` function with HTML template
- [ ] Component documentation is complete
- [ ] Examples show real-world usage patterns

### Build Integration ✅
- [ ] Component builds successfully with `npm run build` (REQUIRED FIRST STEP)
- [ ] No "Failed to fetch dynamically imported module" errors in Storybook
- [ ] Distribution files exist in `dist/components/[component-name]/` after build
- [ ] Component appears in Storybook without errors
- [ ] All properties are controllable in Storybook
- [ ] Theme switching works automatically
- [ ] Component responds to design system mode changes

## Example Complete Implementation

```tsx
// ComponentName.tsx
import { Component, Prop, h } from '@stencil/core';

export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ComponentSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'dive-component-name',
  styleUrl: 'ComponentName.css',
  shadow: true,
})
export class ComponentName {
  @Prop() variant: ComponentVariant = 'primary';
  @Prop() size: ComponentSize = 'medium';
  @Prop() text: string = '';
  @Prop() disabled: boolean = false;
  @Prop() hasIcon: boolean = false;

  render() {
    const classNames = ['component'];
    
    if (this.variant !== 'primary') {
      classNames.push(`component--variant-${this.variant}`);
    }
    
    if (this.size !== 'medium') {
      classNames.push(`component--size-${this.size}`);
    }
    
    if (this.disabled) {
      classNames.push('component--disabled');
    }
    
    if (this.hasIcon) {
      classNames.push('component--has-icon');
    }

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      },
      role: 'component'
    }, [
      this.hasIcon && h('span', { class: 'component__icon' }, '🎯'),
      h('span', { class: 'component__text' }, this.text)
    ]);
  }
}
```

## Final Validation
After implementation, verify:
1. **Screenshot comparison**: Does the rendered Stencil component match the Figma design?
2. **MCP Data Completeness**: Are ALL component properties from MCP server implemented as `@Prop()` declarations?
3. **Variant completeness**: Are all variants from MCP server implemented with correct CSS classes?
4. **Boolean functionality**: Do all boolean properties show/hide elements as in Figma?
5. **Design system integration**: Are only existing CSS custom properties used with fallbacks?
6. **Stencil patterns**: Does the component follow the established Stencil patterns from Badge component?
7. **Build success**: Does `npm run build` complete without errors?
8. **Storybook integration**: Do all stories render correctly with `defineCustomElement()` registration?
9. **Theme compatibility**: Does the component work with light/dark/high-contrast modes?
10. **Property reflection**: Are all `@Prop()` declarations properly reflected as HTML attributes?

## Reference Implementation

### 🎯 **Primary Reference: Blueprint Component**
See `src/components/_Blueprint/` for the **comprehensive reference template** that demonstrates ALL patterns, conventions, and best practices. This blueprint includes:

- **Complete implementation examples** for every Stencil pattern
- **Comprehensive TypeScript type definitions**
- **Full accessibility implementation**
- **Event handling strategies**
- **CSS custom property patterns**
- **Storybook documentation examples**
- **Step-by-step usage guide** in the README

**IMPORTANT**: Always reference the Blueprint component first when creating new components. It serves as the definitive guide for all implementation patterns.

### 📚 **Additional Working Examples**
- **Badge Component**: `src/components/Badge/` - Simple component with variants
- **Checkbox Component**: `src/components/Checkbox/` - Complex form component with state management

### 🚀 **Quick Start with Blueprint**
```bash
# Copy the blueprint template
cp -r src/components/_Blueprint src/components/YourComponent

# Rename files and replace references
# See the Blueprint README for detailed instructions
```

## 🔄 Continuous Improvement Instructions

### **CRITICAL**: Improve This Prompt Based on Experience

After creating components using this prompt, **ALWAYS update this document** with new findings:

#### **When to Update This Prompt**
1. **Build Errors**: Document any build failures and their solutions
2. **Storybook Issues**: Record "Failed to fetch dynamically imported module" errors and fixes  
3. **CSS Variable Problems**: Note shadow DOM inheritance issues and solutions
4. **TypeScript Errors**: Document type definition problems and resolutions
5. **Accessibility Violations**: Record accessibility issues found during testing
6. **New Patterns**: Document any new Stencil patterns or best practices discovered
7. **Design System Changes**: Note any updates to available CSS variables or tokens

#### **How to Update This Prompt**
1. **Add Error Cases**: Include specific error messages and step-by-step solutions
2. **Update Examples**: Modify code examples based on what actually works
3. **Improve Instructions**: Clarify any confusing or incomplete instructions
4. **Add Validation Steps**: Include new verification steps based on common failures
5. **Update Blueprint**: Improve the `src/components/_Blueprint/` template with new patterns

#### **Common Error Patterns to Document**

**Build Errors:**
```
Error: [Specific build error message]
Solution: [Step-by-step fix]
Prevention: [How to avoid this in the future]
```

**Storybook Integration Errors:**
```
Error: "Failed to fetch dynamically imported module"
Cause: Component not built before Storybook attempts to import
Solution: Always run `npm run build` before `npm run storybook`
```

**CSS Variable Inheritance Issues:**
```
Error: CSS variables not available in shadow DOM
Solution: Add explicit inheritance in :host selector
Example: --Spacing-2: var(--Spacing-2, 8px);
```

#### **Blueprint Component Updates**

When you discover new patterns or solutions:

1. **Update Blueprint Component**: Modify `src/components/_Blueprint/` files
2. **Update Blueprint README**: Document new patterns in the README
3. **Test with Real Component**: Verify improvements work with actual component creation
4. **Update This Prompt**: Add new guidance to this main prompt file

### **Success Metrics & Validation**

Track these metrics to improve the prompt:
- [ ] Build success rate on first attempt
- [ ] Storybook integration success rate  
- [ ] Figma design fidelity accuracy
- [ ] Accessibility compliance rate
- [ ] Time to complete component creation
- [ ] Number of iterations needed for pixel-perfect match

---

**Remember: The goal is a perfect 1:1 translation of the Figma design (via MCP server data) into a maintainable, Stencil-based Web Component that integrates seamlessly with the existing design system and automatically inherits CSS variables without manual forwarding.**

**This prompt is a living document - keep improving it with every component creation experience!** 