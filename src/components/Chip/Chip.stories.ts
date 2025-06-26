import type { Meta, StoryObj } from '@storybook/web-components';
import { defineCustomElement } from '../../../dist/components/dive-chip';

// Register the Chip component
defineCustomElement();

const meta: Meta = {
  title: 'Components/Chip',
  component: 'dive-chip',
  parameters: {
    layout: 'centered',
  },
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
    text: {
      control: { type: 'text' },
      description: 'The text content of the chip',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the chip is disabled',
    },
  },
  render: ({ type, variant, text, disabled }) => 
    `<dive-chip type="${type}" variant="${variant}" text="${text}" ${disabled ? 'disabled' : ''}></dive-chip>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: 'base',
    variant: 'outline',
    text: 'Default Chip',
    disabled: false,
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    variant: 'outline',
    text: 'Primary Chip',
    disabled: false,
  },
};

export const PrimaryFilled: Story = {
  args: {
    type: 'primary',
    variant: 'filled',
    text: 'Primary Filled',
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    variant: 'outline',
    text: 'Success Chip',
    disabled: false,
  },
};

export const SuccessFilled: Story = {
  args: {
    type: 'success',
    variant: 'filled',
    text: 'Success Filled',
    disabled: false,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    variant: 'outline',
    text: 'Warning Chip',
    disabled: false,
  },
};

export const WarningFilled: Story = {
  args: {
    type: 'warning',
    variant: 'filled',
    text: 'Warning Filled',
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    variant: 'outline',
    text: 'Error Chip',
    disabled: false,
  },
};

export const ErrorFilled: Story = {
  args: {
    type: 'error',
    variant: 'filled',
    text: 'Error Filled',
    disabled: false,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    variant: 'outline',
    text: 'Info Chip',
    disabled: false,
  },
};

export const InfoFilled: Story = {
  args: {
    type: 'info',
    variant: 'filled',
    text: 'Info Filled',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    variant: 'outline',
    text: 'Disabled Chip',
    disabled: true,
  },
};

// Showcase all outline variants
export const AllOutlineVariants: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <dive-chip type="base" variant="outline" text="Base"></dive-chip>
      <dive-chip type="primary" variant="outline" text="Primary"></dive-chip>
      <dive-chip type="success" variant="outline" text="Success"></dive-chip>
      <dive-chip type="warning" variant="outline" text="Warning"></dive-chip>
      <dive-chip type="error" variant="outline" text="Error"></dive-chip>
      <dive-chip type="info" variant="outline" text="Info"></dive-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available chip types in outline variant.',
      },
    },
  },
};

// Showcase all filled variants
export const AllFilledVariants: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <dive-chip type="base" variant="filled" text="Base"></dive-chip>
      <dive-chip type="primary" variant="filled" text="Primary"></dive-chip>
      <dive-chip type="success" variant="filled" text="Success"></dive-chip>
      <dive-chip type="warning" variant="filled" text="Warning"></dive-chip>
      <dive-chip type="error" variant="filled" text="Error"></dive-chip>
      <dive-chip type="info" variant="filled" text="Info"></dive-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available chip types in filled variant.',
      },
    },
  },
};

// Show comparison between outline and filled
export const VariantComparison: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <h4 style="margin: 0; width: 100%; font-size: 14px; color: #666;">Outline</h4>
        <dive-chip type="base" variant="outline" text="Base"></dive-chip>
        <dive-chip type="primary" variant="outline" text="Primary"></dive-chip>
        <dive-chip type="success" variant="outline" text="Success"></dive-chip>
        <dive-chip type="warning" variant="outline" text="Warning"></dive-chip>
        <dive-chip type="error" variant="outline" text="Error"></dive-chip>
        <dive-chip type="info" variant="outline" text="Info"></dive-chip>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <h4 style="margin: 0; width: 100%; font-size: 14px; color: #666;">Filled</h4>
        <dive-chip type="base" variant="filled" text="Base"></dive-chip>
        <dive-chip type="primary" variant="filled" text="Primary"></dive-chip>
        <dive-chip type="success" variant="filled" text="Success"></dive-chip>
        <dive-chip type="warning" variant="filled" text="Warning"></dive-chip>
        <dive-chip type="error" variant="filled" text="Error"></dive-chip>
        <dive-chip type="info" variant="filled" text="Info"></dive-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of outline and filled variants.',
      },
    },
  },
};

// Show disabled states for both variants
export const AllDisabled: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <h4 style="margin: 0; width: 100%; font-size: 14px; color: #666;">Outline Disabled</h4>
        <dive-chip type="base" variant="outline" text="Base" disabled></dive-chip>
        <dive-chip type="primary" variant="outline" text="Primary" disabled></dive-chip>
        <dive-chip type="success" variant="outline" text="Success" disabled></dive-chip>
        <dive-chip type="warning" variant="outline" text="Warning" disabled></dive-chip>
        <dive-chip type="error" variant="outline" text="Error" disabled></dive-chip>
        <dive-chip type="info" variant="outline" text="Info" disabled></dive-chip>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <h4 style="margin: 0; width: 100%; font-size: 14px; color: #666;">Filled Disabled</h4>
        <dive-chip type="base" variant="filled" text="Base" disabled></dive-chip>
        <dive-chip type="primary" variant="filled" text="Primary" disabled></dive-chip>
        <dive-chip type="success" variant="filled" text="Success" disabled></dive-chip>
        <dive-chip type="warning" variant="filled" text="Warning" disabled></dive-chip>
        <dive-chip type="error" variant="filled" text="Error" disabled></dive-chip>
        <dive-chip type="info" variant="filled" text="Info" disabled></dive-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All chip variants in their disabled state for both outline and filled.',
      },
    },
  },
}; 