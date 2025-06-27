import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const meta: Meta = {
  title: 'Templates/Blueprint',
  component: 'dive-blueprint',  // Use string instead of imported class
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Blueprint Component

A comprehensive template component that demonstrates all patterns and conventions for creating Stencil Web Components in this project.

## Features

- **Variants**: Primary, Secondary, Success, Warning, Error, Info
- **Sizes**: Small, Medium, Large  
- **Content Types**: Text, Icon, Text + Icon, Avatar
- **States**: Default, Hover, Active, Focused, Disabled
- **Accessibility**: Full ARIA support, keyboard navigation
- **Design System**: Complete CSS custom property integration
- **Events**: Custom events for all interactions

## Usage

This component serves as a reference template for creating new components. Copy and modify the patterns demonstrated here.

## Key Patterns Demonstrated

1. **Property Management**: How to define and use @Prop() decorators
2. **State Management**: Internal state with @State() decorators  
3. **Event Handling**: Custom events with @Event() decorators
4. **CSS Classes**: BEM-like class generation and conditional styling
5. **Accessibility**: ARIA attributes and keyboard support
6. **Design Tokens**: CSS custom property usage with fallbacks
7. **Shadow DOM**: Proper CSS variable inheritance
8. **Lifecycle**: Component lifecycle methods
9. **TypeScript**: Proper type definitions and interfaces
10. **Render Logic**: Complex render logic with helper methods
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the component'
    },
    text: {
      control: { type: 'text' },
      description: 'The main text content'
    },
    description: {
      control: { type: 'text' },
      description: 'Secondary text or description'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled'
    },
    hasIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show an icon'
    },
    hasAvatar: {
      control: { type: 'boolean' },
      description: 'Whether to show an avatar'
    },
    content: {
      control: { type: 'select' },
      options: ['text', 'icon', 'text-icon', 'avatar'],
      description: 'The content type/layout'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the component is required'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for accessibility'
    }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Blueprint Component',
    description: '',
    disabled: false,
    hasIcon: false,
    hasAvatar: false,
    content: 'text',
    required: false,
    ariaLabel: ''
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    text: 'Default Blueprint',
  }
};

export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <dive-blueprint variant="primary" text="Primary"></dive-blueprint>
      <dive-blueprint variant="secondary" text="Secondary"></dive-blueprint>
      <dive-blueprint variant="success" text="Success"></dive-blueprint>
      <dive-blueprint variant="warning" text="Warning"></dive-blueprint>
      <dive-blueprint variant="error" text="Error"></dive-blueprint>
      <dive-blueprint variant="info" text="Info"></dive-blueprint>
    </div>
  `
};

export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px;">
      <dive-blueprint size="small" text="Small"></dive-blueprint>
      <dive-blueprint size="medium" text="Medium"></dive-blueprint>
      <dive-blueprint size="large" text="Large"></dive-blueprint>
    </div>
  `
};

export const AccessibilityCompliant: Story = {
  args: {
    text: 'Accessible Component',
    ariaLabel: 'This is an accessible blueprint component',
    variant: 'primary'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          }
        ],
      },
    },
  },
};