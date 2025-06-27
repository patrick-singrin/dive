import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'dive-icon',  // Use string instead of imported class
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible icon component using Tabler Icons library with support for different sizes, colors, and variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from Tabler Icons',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Icon size',
    },
    color: {
      control: { type: 'color' },
      description: 'Icon color (CSS color value)',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 4, step: 0.25 },
      description: 'Stroke width for outline icons',
    },
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Icon variant',
    },
  },
  args: {
    name: 'home',
    size: 'medium',
    variant: 'outline',
    strokeWidth: 2,
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'medium',
    variant: 'outline',
    strokeWidth: 2,
  }
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px;">
      <dive-icon name="home" size="small"></dive-icon>
      <dive-icon name="home" size="medium"></dive-icon>
      <dive-icon name="home" size="large"></dive-icon>
    </div>
  `
};

export const CommonIcons: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; align-items: center;">
      <dive-icon name="home"></dive-icon>
      <dive-icon name="user"></dive-icon>
      <dive-icon name="settings"></dive-icon>
      <dive-icon name="search"></dive-icon>
      <dive-icon name="plus"></dive-icon>
      <dive-icon name="minus"></dive-icon>
      <dive-icon name="x"></dive-icon>
      <dive-icon name="check"></dive-icon>
      <dive-icon name="heart"></dive-icon>
      <dive-icon name="star"></dive-icon>
      <dive-icon name="mail"></dive-icon>
      <dive-icon name="phone"></dive-icon>
    </div>
  `
};

export const Variants: Story = {
  render: () => `
    <div style="display: flex; gap: 32px;">
      <div style="text-align: center;">
        <h3>Outline</h3>
        <div style="display: flex; gap: 8px;">
          <dive-icon name="heart" variant="outline"></dive-icon>
          <dive-icon name="star" variant="outline"></dive-icon>
          <dive-icon name="bookmark" variant="outline"></dive-icon>
        </div>
      </div>
      <div style="text-align: center;">
        <h3>Filled</h3>
        <div style="display: flex; gap: 8px;">
          <dive-icon name="heart" variant="filled"></dive-icon>
          <dive-icon name="star" variant="filled"></dive-icon>
          <dive-icon name="bookmark" variant="filled"></dive-icon>
        </div>
      </div>
    </div>
  `
};

export const Colors: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-icon name="heart" color="red"></dive-icon>
      <dive-icon name="star" color="gold"></dive-icon>
      <dive-icon name="check" color="green"></dive-icon>
      <dive-icon name="x" color="crimson"></dive-icon>
      <dive-icon name="settings" color="blue"></dive-icon>
    </div>
  `
};

export const StrokeWidths: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <dive-icon name="home" stroke-width="1"></dive-icon>
      <dive-icon name="home" stroke-width="1.5"></dive-icon>
      <dive-icon name="home" stroke-width="2"></dive-icon>
      <dive-icon name="home" stroke-width="2.5"></dive-icon>
      <dive-icon name="home" stroke-width="3"></dive-icon>
    </div>
  `
};