import { Component, Prop, h } from '@stencil/core';

export type ChipType = 'base' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ChipVariant = 'outline' | 'filled';

@Component({
  tag: 'dive-chip',
  styleUrl: 'Chip.css',
  shadow: true,
})
export class Chip {
  @Prop() type: ChipType = 'base';
  @Prop() variant: ChipVariant = 'outline';
  @Prop() text: string = '';
  @Prop() disabled: boolean = false;

  render() {
    const classNames = ['chip'];
    
    if (this.type !== 'base') {
      classNames.push(`chip--type-${this.type}`);
    }
    
    if (this.variant !== 'outline') {
      classNames.push(`chip--variant-${this.variant}`);
    }
    
    if (this.disabled) {
      classNames.push('chip--disabled');
    }

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      },
      role: 'button',
      tabindex: this.disabled ? -1 : 0,
      'aria-disabled': this.disabled ? 'true' : 'false'
    }, this.text);
  }
} 