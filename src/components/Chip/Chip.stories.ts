import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'dive-chip',  // Use string instead of imported class
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chip component for displaying tags, filters, and selectable items with various styles and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['base', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'The semantic variant of the chip',
    },
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'The visual style variant of the chip',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the chip',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content of the chip',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Whether the chip can be removed',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the chip is disabled',
    }
  },
  args: {
    type: 'base',
    variant: 'filled',
    size: 'medium',
    text: 'Chip',
    removable: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    text: 'Default Chip'
  }
};

export const AllTypes: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <dive-chip type="base" text="Base"></dive-chip>
      <dive-chip type="primary" text="Primary"></dive-chip>
      <dive-chip type="success" text="Success"></dive-chip>
      <dive-chip type="warning" text="Warning"></dive-chip>
      <dive-chip type="error" text="Error"></dive-chip>
      <dive-chip type="info" text="Info"></dive-chip>
    </div>
  `
};

export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px;">
      <dive-chip size="small" text="Small"></dive-chip>
      <dive-chip size="medium" text="Medium"></dive-chip>
      <dive-chip size="large" text="Large"></dive-chip>
    </div>
  `
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; gap: 16px;">
      <div style="text-align: center;">
        <h3>Filled</h3>
        <div style="display: flex; gap: 8px;">
          <dive-chip variant="filled" type="primary" text="Filled"></dive-chip>
          <dive-chip variant="filled" type="success" text="Success"></dive-chip>
        </div>
      </div>
      <div style="text-align: center;">
        <h3>Outline</h3>
        <div style="display: flex; gap: 8px;">
          <dive-chip variant="outline" type="primary" text="Outline"></dive-chip>
          <dive-chip variant="outline" type="success" text="Success"></dive-chip>
        </div>
      </div>
    </div>
  `
};

export const Removable: Story = {
  render: () => `
    <div style="display: flex; gap: 16px;">
      <dive-chip text="Removable Chip" removable="true"></dive-chip>
      <dive-chip text="Regular Chip" removable="false"></dive-chip>
    </div>
  `
};