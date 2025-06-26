import type { Meta, StoryObj } from '@storybook/web-components';
import { defineCustomElement } from '../../../dist/components/dive-badge';

// Register the Badge component
defineCustomElement();

const meta: Meta = {
  title: 'Components/Badge',
  component: 'dive-badge',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['base', 'primary', 'success', 'warning', 'error', 'info'],
    },
    text: {
      control: { type: 'text' },
    },
  },
  render: ({ type, text }) => `<dive-badge type="${type}" text="${text}"></dive-badge>`,
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