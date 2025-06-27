import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const meta: Meta = {
  title: '🧪 Testing/Feature Showcase',
  component: 'dive-blueprint',  // Use string instead of imported class
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# 🧪 Feature Testing Showcase

This showcases all the new Storybook features we've implemented:

## ✅ What's Working:
1. **Official Stencil Plugin** - No more manual component registration
2. **Automatic Documentation** - Generated from TypeScript props  
3. **Interactive Controls** - All props are controllable in the UI
4. **Accessibility Testing** - Real-time WCAG compliance checking
5. **Actions Logging** - Event handlers are captured and logged
6. **Background Testing** - Component tested against different backgrounds
7. **Viewport Testing** - Responsive behavior validation
8. **Enhanced Theming** - Multi-theme support with design tokens

## 🎯 Test Instructions:
1. Use the **Controls panel** to modify component properties
2. Check the **Accessibility panel** for WCAG violations  
3. Try different **Backgrounds** from the toolbar
4. Test **Viewports** for responsive behavior
5. Watch the **Actions panel** for event logging
6. Switch between **Light/Dark themes** in the toolbar
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: '🎨 Test all visual variants'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '📏 Test component sizing'
    },
    text: {
      control: { type: 'text' },
      description: '📝 Test text content changes'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '🚫 Test disabled state'
    },
    // Action events for testing
    onBlueprintClick: { action: 'blueprint-clicked' },
    onBlueprintFocus: { action: 'blueprint-focused' },
    onBlueprintBlur: { action: 'blueprint-blurred' },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: '🧪 Test Component',
    disabled: false,
    ariaLabel: 'Feature testing component'
  }
};

export default meta;
type Story = StoryObj;

export const FullFeatureTest: Story = {
  args: {
    variant: 'primary',
    text: '🧪 Click me to test actions!',
    ariaLabel: 'Interactive test component'
  },
  parameters: {
    // Test with warm background
    backgrounds: { default: 'warm' },
    // Enable comprehensive a11y testing
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  render: (args) => `
    <div style="padding: 20px; text-align: center;">
      <h3>🧪 Feature Testing Area</h3>
      <p style="margin: 16px 0; color: #666;">
        Use the controls below to test all features!<br>
        Check Accessibility panel for real-time WCAG validation.
      </p>
      <dive-blueprint 
        variant="${args.variant}"
        size="${args.size}" 
        text="${args.text}"
        ${args.disabled ? 'disabled' : ''}
        aria-label="${args.ariaLabel}"
        onclick="window.parent.postMessage({type: 'STORYBOOK_ACTION', payload: {id: 'blueprint-clicked', data: {variant: '${args.variant}', text: '${args.text}'}}}, '*')"
        onfocus="window.parent.postMessage({type: 'STORYBOOK_ACTION', payload: {id: 'blueprint-focused', data: {}}}, '*')"
        onblur="window.parent.postMessage({type: 'STORYBOOK_ACTION', payload: {id: 'blueprint-blurred', data: {}}}, '*')"
      ></dive-blueprint>
      <div style="margin-top: 20px; font-size: 14px; color: #888;">
        💡 Try: Controls panel • A11y panel • Backgrounds • Viewports
      </div>
    </div>
  `
};

export const ResponsiveTest: Story = {
  args: {
    variant: 'info',
    text: '📱 Responsive Test',
  },
  parameters: {
    viewport: { defaultViewport: 'small' },
    backgrounds: { default: 'dark' }
  },
  render: (args) => `
    <div style="padding: 20px;">
      <dive-blueprint variant="${args.variant}" size="small" text="Small Viewport"></dive-blueprint>
      <dive-blueprint variant="${args.variant}" size="medium" text="Medium Component"></dive-blueprint>
      <dive-blueprint variant="${args.variant}" size="large" text="Large Component"></dive-blueprint>
    </div>
  `
};

export const AccessibilityCompliance: Story = {
  args: {
    variant: 'success',
    text: '♿ A11y Compliant',
    ariaLabel: 'Accessibility compliant component with proper ARIA labeling'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
        ],
      },
    },
  },
};