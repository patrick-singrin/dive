import type { Meta, StoryObj } from '@storybook/web-components';
import { defineCustomElement } from '../../../dist/components/dive-blueprint';

// Register the Blueprint component
defineCustomElement();

const meta: Meta = {
  title: 'Templates/Blueprint',
  component: 'dive-blueprint',
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
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The visual variant/type of the component',
      table: {
        type: { summary: 'BlueprintVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
      table: {
        type: { summary: 'BlueprintSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    content: {
      control: { type: 'select' },
      options: ['text', 'icon', 'text-icon', 'avatar'],
      description: 'The content type/layout',
      table: {
        type: { summary: 'BlueprintContent' },
        defaultValue: { summary: 'text' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'The main text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Secondary text or description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show an icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasAvatar: {
      control: { type: 'boolean' },
      description: 'Whether to show an avatar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required (shows asterisk)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Form field name',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Form field value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    content: 'text',
    text: 'Blueprint Component',
    description: '',
    disabled: false,
    hasIcon: false,
    hasAvatar: false,
    required: false,
    name: '',
    value: '',
    ariaLabel: '',
  },
  render: (args) => `
    <dive-blueprint 
      variant="${args.variant}"
      size="${args.size}"
      content="${args.content}"
      text="${args.text}"
      description="${args.description}"
      disabled
      has-icon
      has-avatar
      required
      name="${args.name}"
      value="${args.value}"
      aria-label="${args.ariaLabel}"
      @blueprint-click="${(e: CustomEvent) => console.log('Click:', e.detail)}"
      @blueprint-change="${(e: CustomEvent) => console.log('Change:', e.detail)}"
    >
    </dive-blueprint>
  `,
};

export default meta;
type Story = StoryObj;

// =====================
// BASIC STORIES
// =====================

export const Default: Story = {
  name: 'Default',
  args: {
    text: 'Default Blueprint',
  },
};

export const Playground: Story = {
  name: 'Interactive Playground',
  args: {
    text: 'Playground',
    description: 'Try different combinations',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different property combinations.',
      },
    },
  },
};

// =====================
// VARIANT STORIES
// =====================

export const Variants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <dive-blueprint variant="primary" text="Primary"></dive-blueprint>
      <dive-blueprint variant="secondary" text="Secondary"></dive-blueprint>
      <dive-blueprint variant="success" text="Success"></dive-blueprint>
      <dive-blueprint variant="warning" text="Warning"></dive-blueprint>
      <dive-blueprint variant="error" text="Error"></dive-blueprint>
      <dive-blueprint variant="info" text="Info"></dive-blueprint>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available visual variants of the component.',
      },
    },
  },
};

// =====================
// SIZE STORIES
// =====================

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-blueprint size="small" text="Small"></dive-blueprint>
      <dive-blueprint size="medium" text="Medium"></dive-blueprint>
      <dive-blueprint size="large" text="Large"></dive-blueprint>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the component.',
      },
    },
  },
};

// =====================
// CONTENT TYPE STORIES
// =====================

export const ContentTypes: Story = {
  name: 'Content Types',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <dive-blueprint content="text" text="Text Only"></dive-blueprint>
      <dive-blueprint content="icon" has-icon="true">
        <span slot="icon">🎯</span>
      </dive-blueprint>
      <dive-blueprint content="text-icon" text="With Icon" has-icon="true">
        <span slot="icon">✨</span>
      </dive-blueprint>
      <dive-blueprint content="avatar" text="With Avatar" has-avatar="true">
        <img slot="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=blueprint" style="width: 20px; height: 20px; border-radius: 50%;" alt="Avatar" />
      </dive-blueprint>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different content layout types with slots for icons and avatars.',
      },
    },
  },
};

// =====================
// STATE STORIES
// =====================

export const States: Story = {
  name: 'Interactive States',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <dive-blueprint text="Default"></dive-blueprint>
      <dive-blueprint text="Disabled" disabled="true"></dive-blueprint>
      <dive-blueprint text="Required" required="true"></dive-blueprint>
      <div style="padding: 8px; border: 1px dashed #ccc; border-radius: 4px;">
        <dive-blueprint text="Hover me"></dive-blueprint>
        <small style="display: block; margin-top: 4px; color: #666;">↑ Hover to see effect</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states. Hover over the components to see state changes.',
      },
    },
  },
};

// =====================
// COMPLEX EXAMPLES
// =====================

export const WithDescription: Story = {
  name: 'With Description Text',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start;">
      <dive-blueprint 
        text="Action Button" 
        description="Click to perform action"
        size="large">
      </dive-blueprint>
      <dive-blueprint 
        variant="secondary"
        text="Cancel" 
        description="Discard changes"
        size="large">
      </dive-blueprint>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Components with both primary text and description text.',
      },
    },
  },
};

export const FormExample: Story = {
  name: 'Form Integration',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <dive-blueprint 
        variant="primary"
        text="Submit" 
        name="submit"
        value="submit-action"
        required="true">
      </dive-blueprint>
      <dive-blueprint 
        variant="secondary"
        text="Cancel" 
        name="cancel"
        value="cancel-action">
      </dive-blueprint>
      <dive-blueprint 
        variant="error"
        text="Delete" 
        name="delete"
        value="delete-action"
        aria-label="Delete item permanently">
      </dive-blueprint>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Components configured for form usage with names, values, and ARIA labels.',
      },
    },
  },
};

// =====================
// ACCESSIBILITY STORIES
// =====================

export const Accessibility: Story = {
  name: 'Accessibility Features',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">Keyboard Navigation</h3>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
          Use Tab to navigate, Enter/Space to activate
        </p>
        <div style="display: flex; gap: 8px;">
          <dive-blueprint text="Tab 1" tabindex="0"></dive-blueprint>
          <dive-blueprint text="Tab 2" tabindex="0"></dive-blueprint>
          <dive-blueprint text="Tab 3" tabindex="0"></dive-blueprint>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">ARIA Labels</h3>
        <div style="display: flex; gap: 8px;">
          <dive-blueprint 
            text="Save" 
            aria-label="Save document permanently">
          </dive-blueprint>
          <dive-blueprint 
            text="⭐" 
            aria-label="Add to favorites">
          </dive-blueprint>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">Disabled State</h3>
        <dive-blueprint 
          text="Disabled Button" 
          disabled="true"
          aria-label="This action is currently unavailable">
        </dive-blueprint>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including keyboard navigation, ARIA labels, and proper disabled state handling.',
      },
    },
  },
};

// =====================
// DESIGN SYSTEM INTEGRATION
// =====================

export const DesignSystemTokens: Story = {
  name: 'Design System Integration',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin: 0 0 12px 0;">Color Tokens</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <dive-blueprint variant="primary" text="Primary Colors"></dive-blueprint>
          <dive-blueprint variant="success" text="Success Colors"></dive-blueprint>
          <dive-blueprint variant="warning" text="Warning Colors"></dive-blueprint>
          <dive-blueprint variant="error" text="Error Colors"></dive-blueprint>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0;">Spacing Tokens</h3>
        <div style="display: flex; gap: 8px; align-items: center;">
          <dive-blueprint size="small" text="Small Spacing"></dive-blueprint>
          <dive-blueprint size="medium" text="Medium Spacing"></dive-blueprint>
          <dive-blueprint size="large" text="Large Spacing"></dive-blueprint>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0;">Border Radius Tokens</h3>
        <div style="display: flex; gap: 8px; align-items: center;">
          <dive-blueprint size="small" text="Small Radius"></dive-blueprint>
          <dive-blueprint size="medium" text="Medium Radius"></dive-blueprint>
          <dive-blueprint size="large" text="Large Radius"></dive-blueprint>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component uses design system tokens for consistent spacing, colors, and styling.',
      },
    },
  },
};

// =====================
// EVENT HANDLING STORIES
// =====================

export const EventHandling: Story = {
  name: 'Event Handling',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">Custom Events</h3>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
          Open browser console to see event details
        </p>
        <div style="display: flex; gap: 8px;">
          <dive-blueprint 
            text="Click Me" 
            @blueprint-click="${(e: CustomEvent) => {
              console.log('Blueprint Click Event:', e.detail);
              alert('Click event triggered! Check console for details.');
            }}"
            @blueprint-change="${(e: CustomEvent) => {
              console.log('Blueprint Change Event:', e.detail);
            }}">
          </dive-blueprint>
          <dive-blueprint 
            text="Focus Me" 
            @blueprint-focus="${(e: CustomEvent) => {
              console.log('Blueprint Focus Event:', e.detail);
            }}"
            @blueprint-blur="${(e: CustomEvent) => {
              console.log('Blueprint Blur Event:', e.detail);
            }}">
          </dive-blueprint>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates custom event handling. Open the browser console to see event details when interacting with the components.',
      },
    },
  },
};

// =====================
// RESPONSIVE DESIGN
// =====================

export const ResponsiveDesign: Story = {
  name: 'Responsive Behavior',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">Desktop View</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <dive-blueprint text="Resize"></dive-blueprint>
          <dive-blueprint text="Browser"></dive-blueprint>
          <dive-blueprint text="Window"></dive-blueprint>
        </div>
      </div>
      
      <div style="max-width: 320px; border: 1px dashed #ccc; padding: 16px; border-radius: 4px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">Mobile Simulation</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <dive-blueprint text="Mobile"></dive-blueprint>
          <dive-blueprint text="Touch"></dive-blueprint>
          <dive-blueprint text="Targets"></dive-blueprint>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component adapts to different screen sizes. The bottom section simulates mobile layout.',
      },
    },
  },
}; 