import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'dive-badge',  // Use string instead of imported class
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component for displaying status, categories, and labels with multiple visual variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['base', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'The visual style variant of the badge'
    },
    text: {
      control: { type: 'text' },
      description: 'The text content to display in the badge'
    },
  },
  args: {
    type: 'base',
    text: 'Badge'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: 'base',
    text: 'Default Badge'
  }
};

export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'Primary Badge'
  }
};

export const Success: Story = {
  args: {
    type: 'success',
    text: 'Success Badge'
  }
};

export const Warning: Story = {
  args: {
    type: 'warning',
    text: 'Warning Badge'
  }
};

export const Error: Story = {
  args: {
    type: 'error',
    text: 'Error Badge'
  }
};

export const Info: Story = {
  args: {
    type: 'info',
    text: 'Info Badge'
  }
};

// Accessibility testing story
export const AccessibilityTest: Story = {
  args: {
    type: 'primary',
    text: 'Accessible Badge'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

// Enhanced Badge story with interactive events
export const Interactive: Story = {
  args: {
    type: 'primary',
    text: 'Interactive Badge'
  },
  argTypes: {
    // Enable actions for custom events
    onBadgeClick: { action: 'badge-clicked' },
    onBadgeHover: { action: 'badge-hovered' },
  },
  render: (args) => `
    <dive-badge 
      type="${args.type}" 
      text="${args.text}"
      onclick="window.parent.postMessage({type: 'STORYBOOK_ACTION', payload: {id: 'badge-clicked', data: {type: '${args.type}', text: '${args.text}'}}}, '*')"
      onmouseover="window.parent.postMessage({type: 'STORYBOOK_ACTION', payload: {id: 'badge-hovered', data: {type: '${args.type}', text: '${args.text}'}}}, '*')"
    ></dive-badge>
  `
};

// All badge types showcase
export const AllTypes: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 20px;">
      <dive-badge type="base" text="Base Badge"></dive-badge>
      <dive-badge type="primary" text="Primary Badge"></dive-badge>
      <dive-badge type="success" text="Success Badge"></dive-badge>
      <dive-badge type="warning" text="Warning Badge"></dive-badge>
      <dive-badge type="error" text="Error Badge"></dive-badge>
      <dive-badge type="info" text="Info Badge"></dive-badge>
    </div>
  `,
  parameters: {
    backgrounds: { default: 'warm' }, // Test with different background
    viewport: { defaultViewport: 'medium' } // Test responsive behavior
  }
};