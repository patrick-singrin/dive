// @ts-ignore
import './ComponentColors.css';
import './ComponentColors';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/ComponentColors',
  render: () => `<component-colors></component-colors>`,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Showcases all CSS color variables as cards.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default'
}; 