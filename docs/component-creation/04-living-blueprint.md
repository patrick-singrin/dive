# 🧬 Living Blueprint

*Comprehensive Reference Implementation Patterns*

## Purpose
This document serves as the **single source of truth** for all Stencil component implementation patterns. Instead of referencing specific production components that change over time, this living blueprint showcases every pattern needed in component development.

---

## 🎯 Blueprint Philosophy

### Why a Living Blueprint?
- **Decoupled from Production**: Patterns evolve independently of production components
- **Comprehensive Coverage**: Shows all patterns in one place  
- **Version Stability**: Reference point that doesn't break when other components change
- **Learning Resource**: Complete patterns for new developers

### How to Use This Blueprint
1. **First-Time Developers**: Read through all sections to understand available patterns
2. **Experienced Developers**: Jump to specific sections as reference
3. **Pattern Updates**: Update this blueprint when new patterns are discovered
4. **Code Reviews**: Reference this document for consistency checks

---

## 🏗️ Complete Component Structure

### TypeScript Implementation
```tsx
import { Component, Prop, State, Event, EventEmitter, Element, Watch, h } from '@stencil/core';

// Type definitions
export type BlueprintVariant = 'primary' | 'secondary' | 'ghost';
export type BlueprintSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'dive-blueprint',
  styleUrl: 'Blueprint.css',
  shadow: true,
})
export class Blueprint {
  @Element() el: HTMLElement;

  // Props (External API)
  @Prop() variant: BlueprintVariant = 'primary';
  @Prop() size: BlueprintSize = 'medium';
  @Prop() text: string = '';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() icon?: string;
  @Prop() iconPosition: 'left' | 'right' = 'left';
  @Prop() iconOnly: boolean = false;

  // State (Internal)
  @State() private focused: boolean = false;

  // Events
  @Event() blueprintClick: EventEmitter<MouseEvent>;
  @Event() valueChange: EventEmitter<string>;

  // Watchers
  @Watch('disabled')
  handleDisabledChange(newValue: boolean) {
    if (newValue && this.focused) {
      this.focused = false;
    }
  }

  // Event Handlers
  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) return;
    this.blueprintClick.emit(event);
  };

  private handleFocus = () => {
    this.focused = true;
  };

  private handleBlur = () => {
    this.focused = false;
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event as any);
    }
  };

  // Render Helpers
  private renderIcon() {
    if (!this.icon) return null;
    
    return h('dive-icon', {
      name: this.loading ? 'loader' : this.icon,
      size: 'small',
      class: {
        'blueprint__icon': true,
        'blueprint__icon--loading': this.loading
      }
    });
  }

  private renderContent() {
    if (this.iconOnly) {
      return this.renderIcon();
    }

    return [
      this.iconPosition === 'left' && this.renderIcon(),
      h('span', { class: 'blueprint__text' }, this.text),
      this.iconPosition === 'right' && this.renderIcon()
    ];
  }

  private getClassNames() {
    return {
      'blueprint': true,
      [`blueprint--variant-${this.variant}`]: this.variant !== 'primary',
      [`blueprint--size-${this.size}`]: this.size !== 'medium',
      'blueprint--disabled': this.disabled,
      'blueprint--loading': this.loading,
      'blueprint--icon-only': this.iconOnly,
      'blueprint--focused': this.focused
    };
  }

  // Main Render
  render() {
    return h('button', {
      class: this.getClassNames(),
      disabled: this.disabled || this.loading,
      'aria-label': this.iconOnly ? this.text : undefined,
      'aria-busy': this.loading ? 'true' : 'false',
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeydown
    }, this.renderContent());
  }
}
```

---

## 🎨 Complete CSS Patterns

### Blueprint.css
```css
/* ========================================
   SHADOW DOM CSS VARIABLES (CRITICAL)
   ======================================== */

:host {
  /* Explicit inheritance for shadow DOM */
  --Spacing-2: var(--Spacing-2, 8px);
  --Spacing-4: var(--Spacing-4, 12px);
  --Color-Primary-Primary-Background-default: var(--Color-Primary-Primary-Background-default, #2563eb);
  --Color-Primary-Primary-Foreground-default: var(--Color-Primary-Primary-Foreground-default, #ffffff);
  --border-border-radius-md: var(--border-border-radius-md, 8px);
  
  /* Component variables */
  --blueprint-padding: var(--Spacing-2) var(--Spacing-4);
  --blueprint-background: var(--Color-Primary-Primary-Background-default);
  --blueprint-color: var(--Color-Primary-Primary-Foreground-default);
  
  display: inline-block;
}

/* ========================================
   BASE COMPONENT
   ======================================== */

.blueprint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--Spacing-2);
  padding: var(--blueprint-padding);
  border: none;
  border-radius: var(--border-border-radius-md);
  background: var(--blueprint-background);
  color: var(--blueprint-color);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  user-select: none;
}

/* ========================================
   SIZE VARIANTS
   ======================================== */

.blueprint--size-small {
  --blueprint-padding: var(--Spacing-1, 4px) var(--Spacing-3, 10px);
  font-size: 14px;
}

.blueprint--size-large {
  --blueprint-padding: var(--Spacing-3, 10px) var(--Spacing-5, 16px);
  font-size: 18px;
}

/* ========================================
   STYLE VARIANTS
   ======================================== */

.blueprint--variant-secondary {
  --blueprint-background: var(--Color-Base-Background-default, #ffffff);
  --blueprint-color: var(--Color-Base-Foreground-default, #333333);
  border: var(--border-border-width-default, 1px) solid var(--Color-Base-Border-default, #e5e7eb);
}

.blueprint--variant-ghost {
  --blueprint-background: transparent;
  --blueprint-color: var(--Color-Primary-Primary-Background-default);
}

/* ========================================
   INTERACTIVE STATES
   ======================================== */

.blueprint:hover:not(.blueprint--disabled):not(.blueprint--loading) {
  --blueprint-background: var(--Color-Primary-Primary-Background-hover, #1d4ed8);
  transform: translateY(-1px);
}

.blueprint:focus-visible {
  outline: 2px solid var(--Color-Primary-Primary-Border-focus, #3b82f6);
  outline-offset: 2px;
}

.blueprint:active:not(.blueprint--disabled):not(.blueprint--loading) {
  --blueprint-background: var(--Color-Primary-Primary-Background-pressed, #1e40af);
  transform: translateY(0);
}

.blueprint--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.blueprint--loading {
  cursor: wait;
  pointer-events: none;
}

/* ========================================
   ICON PATTERNS
   ======================================== */

.blueprint__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blueprint__icon--loading {
  animation: spin 1s linear infinite;
}

.blueprint--icon-only {
  --blueprint-padding: var(--Spacing-2);
  aspect-ratio: 1;
}

/* ========================================
   ANIMATIONS
   ======================================== */

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ========================================
   ACCESSIBILITY
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .blueprint {
    transition: none;
  }
  
  .blueprint:hover {
    transform: none;
  }
  
  .blueprint__icon--loading {
    animation: none;
  }
}

@media (prefers-contrast: high) {
  .blueprint {
    border: 2px solid;
  }
}
```

---

## 📦 Storybook Integration Pattern

### Blueprint.stories.ts
```ts
import type { Meta, StoryObj } from '@storybook/html';
import { defineCustomElement } from '../../../dist/components/dive-blueprint';

// Component registration (REQUIRED)
defineCustomElement();

const meta: Meta = {
  title: 'Blueprint/Reference',
  component: 'dive-blueprint',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    text: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'text' },
    },
    iconOnly: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Blueprint Component',
    disabled: false,
    loading: false,
  },
  render: (args) => `
    <dive-blueprint 
      variant="${args.variant}" 
      size="${args.size}"
      text="${args.text}" 
      ${args.disabled ? 'disabled' : ''}
      ${args.loading ? 'loading' : ''}
      ${args.icon ? `icon="${args.icon}"` : ''}
      ${args.iconOnly ? 'icon-only' : ''}>
    </dive-blueprint>
  `,
};

export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-blueprint variant="primary" text="Primary"></dive-blueprint>
      <dive-blueprint variant="secondary" text="Secondary"></dive-blueprint>
      <dive-blueprint variant="ghost" text="Ghost"></dive-blueprint>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-blueprint size="small" text="Small"></dive-blueprint>
      <dive-blueprint size="medium" text="Medium"></dive-blueprint>
      <dive-blueprint size="large" text="Large"></dive-blueprint>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-blueprint icon="star" text="With Icon"></dive-blueprint>
      <dive-blueprint icon="heart" icon-position="right" text="Icon Right"></dive-blueprint>
      <dive-blueprint icon="plus" icon-only text="Add"></dive-blueprint>
    </div>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-blueprint text="Default"></dive-blueprint>
      <dive-blueprint text="Disabled" disabled></dive-blueprint>
      <dive-blueprint text="Loading" loading></dive-blueprint>
    </div>
  `,
};
```

---

## 🔍 Pattern Summary

### Essential Patterns Covered
1. **Complete Prop System**: Variants, sizes, states, icons
2. **Shadow DOM CSS Variables**: Proper inheritance pattern
3. **Event Handling**: Click, focus, keyboard navigation
4. **State Management**: Internal state with watchers
5. **Accessibility**: ARIA attributes, keyboard support
6. **Icon Integration**: Position, loading states, icon-only mode
7. **Interactive States**: Hover, focus, active, disabled
8. **Storybook Integration**: Complete story examples

### Reference This Blueprint For
- TypeScript type definitions
- CSS variable inheritance
- Event emission patterns
- Accessibility implementation
- Icon integration
- State management
- Storybook story structure

---

**This Living Blueprint contains ALL patterns needed for Stencil component development. Use it as your primary reference during implementation.**

**Next**: Read [Quality Assurance](./05-quality-assurance.md) for comprehensive validation checklists. 