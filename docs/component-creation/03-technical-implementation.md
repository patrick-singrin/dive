# 🔧 Technical Implementation

*Translating Figma Requirements into Stencil Components*

## Purpose
This document provides comprehensive technical guidance for implementing Stencil components based on Figma designs. It includes code examples, patterns, and conventions for consistent, maintainable components.

---

## 🏗️ Stencil Component Architecture

### Basic Component Structure
```tsx
import { Component, Prop, h } from '@stencil/core';

export type ComponentVariant = 'primary' | 'secondary' | 'ghost';
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

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      }
    }, this.text);
  }
}
```

### TypeScript Type Exports
Always export types for external use:

```tsx
// Export all types used by the component
export type ComponentVariant = 'primary' | 'secondary' | 'ghost';
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentState = 'default' | 'hover' | 'pressed' | 'disabled';

// Export the component class for external type checking
export { ComponentName };
```

---

## 🎨 CSS Implementation Patterns

### Shadow DOM CSS Variables (CRITICAL)
```css
:host {
  /* Explicit inheritance for shadow DOM (REQUIRED) */
  --Spacing-2: var(--Spacing-2, 8px);
  --Spacing-4: var(--Spacing-4, 12px);
  --Color-Primary-Primary-Background-default: var(--Color-Primary-Primary-Background-default, #2563eb);
  
  /* Component-specific variables */
  --component-padding: var(--Spacing-2) var(--Spacing-4);
  --component-background: var(--Color-Primary-Primary-Background-default);
  
  display: inline-block;
}

.component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--component-padding);
  background-color: var(--component-background);
  border-radius: var(--border-border-radius-md, 8px);
  transition: all 0.2s ease;
}
```

### Variant Implementation
```css
/* Size variants */
.component--size-small {
  --component-padding: var(--Spacing-1) var(--Spacing-3);
}

.component--size-large {
  --component-padding: var(--Spacing-3) var(--Spacing-5);
}

/* Style variants */
.component--variant-secondary {
  --component-background: var(--Color-Base-Background-default);
  --component-color: var(--Color-Base-Foreground-default);
}

/* Interactive states */
.component:hover:not(.component--disabled) {
  transform: translateY(-1px);
}

.component:focus-visible {
  outline: 2px solid var(--Color-Primary-Primary-Border-focus);
  outline-offset: 2px;
}

.component--disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

### Interactive States
```css
/* Hover states */
.component:hover:not(.component--disabled) {
  --component-background: var(--Color-Primary-Primary-Background-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Focus states (accessibility critical) */
.component:focus-visible {
  outline: var(--border-border-width-hover) solid var(--Color-Primary-Primary-Border-focus);
  outline-offset: 2px;
}

/* Active/pressed states */
.component:active:not(.component--disabled) {
  --component-background: var(--Color-Primary-Primary-Background-pressed);
  transform: translateY(0);
}

/* Disabled states */
.component--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

---

## 🔗 Icon Integration Patterns

### Basic Icon Support
```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dive-button',
  styleUrl: 'Button.css',
  shadow: true,
})
export class Button {
  @Prop() text: string = '';
  @Prop() icon?: string;                    // Icon name from Tabler Icons
  @Prop() iconPosition: 'left' | 'right' = 'left';
  @Prop() iconOnly: boolean = false;        // Icon-only button (no text)
  @Prop() disabled: boolean = false;

  private renderIcon() {
    if (!this.icon) return null;
    
    return h('dive-icon', {
      name: this.icon,
      size: 'small',
      class: {
        'button__icon': true,
        [`button__icon--${this.iconPosition}`]: !this.iconOnly,
        'button__icon--only': this.iconOnly
      }
    });
  }

  private renderContent() {
    if (this.iconOnly) {
      return this.renderIcon();
    }

    return [
      this.iconPosition === 'left' && this.renderIcon(),
      h('span', { class: 'button__text' }, this.text),
      this.iconPosition === 'right' && this.renderIcon()
    ];
  }

  render() {
    return h('button', {
      class: {
        'button': true,
        'button--icon-only': this.iconOnly,
        'button--disabled': this.disabled
      },
      disabled: this.disabled,
      'aria-label': this.iconOnly ? this.text : undefined
    }, this.renderContent());
  }
}
```

### Icon CSS Implementation
```css
.button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__icon--left {
  margin-right: var(--Spacing-2);
}

.button__icon--right {
  margin-left: var(--Spacing-2);
}

.button__icon--only {
  margin: 0;
}

.button--icon-only {
  --component-padding: var(--Spacing-2);
  aspect-ratio: 1;
  min-width: auto;
}
```

---

## 📝 Form Component Patterns

### Input Component with Icons
```tsx
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export type InputState = 'default' | 'error' | 'success';

@Component({
  tag: 'dive-input',
  styleUrl: 'Input.css',
  shadow: true,
})
export class Input {
  @Prop() value: string = '';
  @Prop() placeholder: string = '';
  @Prop() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Prop() leftIcon?: string;     // Leading icon
  @Prop() rightIcon?: string;    // Trailing icon (e.g., clear, search)
  @Prop() state: InputState = 'default';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() errorMessage?: string;
  @Prop() helperText?: string;
  
  @Event() valueChange: EventEmitter<string>;
  @Event() rightIconClick: EventEmitter<void>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() inputBlur: EventEmitter<FocusEvent>;

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  };

  private handleFocus = (event: FocusEvent) => {
    this.inputFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.inputBlur.emit(event);
  };

  private handleRightIconClick = () => {
    this.rightIconClick.emit();
  };

  render() {
    const hasLeftIcon = !!this.leftIcon;
    const hasRightIcon = !!this.rightIcon;
    const hasError = this.state === 'error';
    const hasSuccess = this.state === 'success';

    return h('div', {
      class: 'input-container'
    }, [
      h('div', {
        class: {
          'input-wrapper': true,
          [`input-wrapper--state-${this.state}`]: this.state !== 'default',
          'input-wrapper--has-left-icon': hasLeftIcon,
          'input-wrapper--has-right-icon': hasRightIcon,
          'input-wrapper--disabled': this.disabled
        }
      }, [
        hasLeftIcon && h('dive-icon', {
          name: this.leftIcon,
          size: 'small',
          class: 'input__icon input__icon--left'
        }),
        
        h('input', {
          class: 'input',
          type: this.type,
          value: this.value,
          placeholder: this.placeholder,
          disabled: this.disabled,
          required: this.required,
          'aria-invalid': hasError ? 'true' : 'false',
          'aria-describedby': this.errorMessage || this.helperText ? 'input-description' : undefined,
          onInput: this.handleInput,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        
        hasRightIcon && h('dive-icon', {
          name: this.rightIcon,
          size: 'small',
          class: 'input__icon input__icon--right input__icon--clickable',
          onClick: this.handleRightIconClick,
          tabindex: 0,
          role: 'button',
          'aria-label': `${this.rightIcon} action`
        })
      ]),
      
      (this.errorMessage || this.helperText) && h('div', {
        id: 'input-description',
        class: {
          'input__description': true,
          'input__description--error': hasError,
          'input__description--helper': !hasError
        }
      }, hasError ? this.errorMessage : this.helperText)
    ]);
  }
}
```

---

## 🎭 State Management Patterns

### Loading States
```tsx
@Component({
  tag: 'dive-async-button',
  styleUrl: 'AsyncButton.css',
  shadow: true,
})
export class AsyncButton {
  @Prop() loading: boolean = false;
  @Prop() text: string = '';
  @Prop() loadingText: string = 'Loading...';
  @Prop() icon?: string;
  @Prop() loadingIcon: string = 'loader';

  private renderIcon() {
    const iconName = this.loading ? this.loadingIcon : this.icon;
    if (!iconName) return null;
    
    return h('dive-icon', {
      name: iconName,
      size: 'small',
      class: {
        'button__icon': true,
        'button__icon--loading': this.loading
      }
    });
  }

  render() {
    const displayText = this.loading ? this.loadingText : this.text;
    
    return h('button', {
      class: {
        'button': true,
        'button--loading': this.loading
      },
      disabled: this.loading,
      'aria-busy': this.loading ? 'true' : 'false'
    }, [
      this.renderIcon(),
      h('span', { class: 'button__text' }, displayText)
    ]);
  }
}
```

### Error States
```tsx
@Component({
  tag: 'dive-error-component',
  styleUrl: 'ErrorComponent.css',
  shadow: true,
})
export class ErrorComponent {
  @Prop() hasError: boolean = false;
  @Prop() errorMessage: string = '';
  @Prop() retryable: boolean = false;

  @Event() retryClicked: EventEmitter<void>;

  private handleRetry = () => {
    this.retryClicked.emit();
  };

  render() {
    if (!this.hasError) {
      return h('slot');
    }

    return h('div', {
      class: 'error-state',
      role: 'alert',
      'aria-live': 'assertive'
    }, [
      h('dive-icon', {
        name: 'alert-circle',
        size: 'medium',
        class: 'error-state__icon'
      }),
      h('p', { class: 'error-state__message' }, this.errorMessage),
      this.retryable && h('dive-button', {
        variant: 'secondary',
        text: 'Retry',
        onClick: this.handleRetry
      })
    ]);
  }
}
```

---

## 🎯 Event Handling Patterns

### Custom Event Emission
```tsx
import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'dive-interactive-component',
  styleUrl: 'InteractiveComponent.css',
  shadow: true,
})
export class InteractiveComponent {
  // Standard event patterns
  @Event() componentClick: EventEmitter<MouseEvent>;
  @Event() valueChange: EventEmitter<{ value: string; metadata?: any }>;
  @Event() selectionChange: EventEmitter<string[]>;
  
  // Complex event with detailed payload
  @Event() statusChange: EventEmitter<{
    previousStatus: string;
    currentStatus: string;
    timestamp: number;
    context?: Record<string, any>;
  }>;

  private handleClick = (event: MouseEvent) => {
    // Emit with original event for maximum flexibility
    this.componentClick.emit(event);
  };

  private handleValueChange = (newValue: string, metadata?: any) => {
    // Emit structured data for complex interactions
    this.valueChange.emit({ value: newValue, metadata });
  };

  private handleStatusChange = (newStatus: string, context?: Record<string, any>) => {
    const previousStatus = this.currentStatus;
    
    // Emit detailed state change information
    this.statusChange.emit({
      previousStatus,
      currentStatus: newStatus,
      timestamp: Date.now(),
      context
    });
  };
}
```

### Event Listener Patterns
```tsx
@Component({
  tag: 'dive-keyboard-component',
  styleUrl: 'KeyboardComponent.css',
  shadow: true,
})
export class KeyboardComponent {
  @Element() el: HTMLElement;

  componentDidLoad() {
    // Add document-level listeners if needed
    document.addEventListener('keydown', this.handleGlobalKeydown);
  }

  disconnectedCallback() {
    // Clean up listeners
    document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  private handleGlobalKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.handleEscape();
    }
  };

  private handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleActivation();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
    }
  };

  render() {
    return h('div', {
      class: 'component',
      tabindex: 0,
      role: 'button',
      onKeyDown: this.handleKeydown,
      'aria-label': 'Interactive component'
    }, 'Component content');
  }
}
```

---

## ♿ Accessibility Implementation

### ARIA Patterns
```tsx
@Component({
  tag: 'dive-accessible-component',
  styleUrl: 'AccessibleComponent.css',
  shadow: true,
})
export class AccessibleComponent {
  @Prop() expanded: boolean = false;
  @Prop() selected: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() ariaLabel?: string;
  @Prop() ariaDescription?: string;

  private componentId = `component-${Math.random().toString(36).substr(2, 9)}`;

  render() {
    return h('div', {
      id: this.componentId,
      class: {
        'component': true,
        'component--expanded': this.expanded,
        'component--selected': this.selected,
        'component--disabled': this.disabled
      },
      role: 'button',
      tabindex: this.disabled ? -1 : 0,
      'aria-label': this.ariaLabel,
      'aria-expanded': this.expanded ? 'true' : 'false',
      'aria-selected': this.selected ? 'true' : 'false',
      'aria-disabled': this.disabled ? 'true' : 'false',
      'aria-describedby': this.ariaDescription ? `${this.componentId}-description` : undefined
    }, [
      h('slot'),
      this.ariaDescription && h('div', {
        id: `${this.componentId}-description`,
        class: 'sr-only'
      }, this.ariaDescription)
    ]);
  }
}
```

### Screen Reader Support
```css
/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus indicators (critical for accessibility) */
.component:focus-visible {
  outline: 2px solid var(--Color-Primary-Primary-Border-focus);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .component {
    border: 2px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
  }
  
  .component:hover {
    transform: none;
  }
}
```

---

## 📦 Storybook Integration

### Component Stories
```ts
import type { Meta, StoryObj } from '@storybook/html';
import { defineCustomElement } from '../../../dist/components/dive-component-name';

// Register the component (REQUIRED for Stencil)
defineCustomElement();

const meta: Meta = {
  title: 'Components/ComponentName',
  component: 'dive-component-name',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style variant of the component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content displayed in the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    icon: {
      control: { type: 'text' },
      description: 'Name of the icon to display (from Tabler Icons)',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Component Text',
    disabled: false,
  },
  render: (args) => `
    <dive-component-name 
      variant="${args.variant}" 
      size="${args.size}"
      text="${args.text}" 
      ${args.disabled ? 'disabled' : ''}
      ${args.icon ? `icon="${args.icon}"` : ''}>
    </dive-component-name>
  `,
};

export default meta;
type Story = StoryObj;

// Default story
export const Default: Story = {};

// Variant stories
export const Primary: Story = {
  args: { variant: 'primary', text: 'Primary Component' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', text: 'Secondary Component' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', text: 'Ghost Component' },
};

// Size stories
export const Small: Story = {
  args: { size: 'small', text: 'Small Component' },
};

export const Large: Story = {
  args: { size: 'large', text: 'Large Component' },
};

// State stories
export const Disabled: Story = {
  args: { disabled: true, text: 'Disabled Component' },
};

export const WithIcon: Story = {
  args: { icon: 'star', text: 'Component with Icon' },
};

// Interactive example
export const Interactive: Story = {
  render: (args) => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-component-name 
        variant="primary" 
        text="Click me"
        onclick="alert('Primary clicked!')">
      </dive-component-name>
      <dive-component-name 
        variant="secondary" 
        text="Or me"
        onclick="alert('Secondary clicked!')">
      </dive-component-name>
    </div>
  `,
};
```

### Advanced Story Patterns
```ts
// Form integration story
export const FormIntegration: Story = {
  render: () => `
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <dive-input 
        placeholder="Enter your name" 
        left-icon="user"
        required>
      </dive-input>
      <dive-input 
        type="email" 
        placeholder="Enter your email" 
        left-icon="mail"
        required>
      </dive-input>
      <dive-component-name 
        variant="primary" 
        text="Submit"
        type="submit">
      </dive-component-name>
    </form>
  `,
};

// Theme testing story
export const ThemeVariations: Story = {
  render: () => `
    <div style="display: grid; gap: 24px;">
      <div data-theme="light" style="padding: 16px; background: var(--Color-Base-Background-default);">
        <h3>Light Theme</h3>
        <dive-component-name variant="primary" text="Primary"></dive-component-name>
        <dive-component-name variant="secondary" text="Secondary"></dive-component-name>
      </div>
      <div data-theme="dark" style="padding: 16px; background: var(--Color-Base-Background-default);">
        <h3>Dark Theme</h3>
        <dive-component-name variant="primary" text="Primary"></dive-component-name>
        <dive-component-name variant="secondary" text="Secondary"></dive-component-name>
      </div>
    </div>
  `,
};
```

---

## 🔍 Testing Patterns

### Unit Testing with Jest
```tsx
import { newSpecPage } from '@stencil/core/testing';
import { ComponentName } from './component-name';

describe('dive-component-name', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ComponentName],
      html: `<dive-component-name></dive-component-name>`,
    });
    
    expect(page.root).toMatchSnapshot();
    expect(page.root.shadowRoot.querySelector('.component')).toBeTruthy();
  });

  it('applies variant classes correctly', async () => {
    const page = await newSpecPage({
      components: [ComponentName],
      html: `<dive-component-name variant="secondary"></dive-component-name>`,
    });
    
    const component = page.root.shadowRoot.querySelector('.component');
    expect(component).toHaveClass('component--variant-secondary');
  });

  it('emits events correctly', async () => {
    const page = await newSpecPage({
      components: [ComponentName],
      html: `<dive-component-name></dive-component-name>`,
    });
    
    const eventSpy = jest.fn();
    page.root.addEventListener('componentClick', eventSpy);
    
    const button = page.root.shadowRoot.querySelector('.component');
    button.click();
    
    expect(eventSpy).toHaveBeenCalled();
  });
});
```

### E2E Testing with Playwright
```tsx
import { test, expect } from '@playwright/test';

test.describe('ComponentName', () => {
  test('renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-componentname--default');
    
    const component = page.locator('dive-component-name');
    await expect(component).toBeVisible();
    
    // Visual regression testing
    await expect(page).toHaveScreenshot('component-default.png');
  });

  test('handles interactions', async ({ page }) => {
    await page.goto('/iframe.html?id=components-componentname--interactive');
    
    const component = page.locator('dive-component-name').first();
    await component.click();
    
    // Check if click handler was called
    const alertPromise = page.waitForEvent('dialog');
    await component.click();
    const alert = await alertPromise;
    expect(alert.message()).toContain('clicked');
    await alert.accept();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/iframe.html?id=components-componentname--default');
    
    const component = page.locator('dive-component-name');
    await component.focus();
    await expect(component).toBeFocused();
    
    await page.keyboard.press('Enter');
    // Verify component responds to keyboard activation
  });
});
```

---

**Next**: Read [Living Blueprint](./04-living-blueprint.md) to see comprehensive implementation examples and reference patterns. 