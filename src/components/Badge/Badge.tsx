import { Component, Prop, h, Host } from '@stencil/core';

export type BadgeType = 'base' | 'primary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  tag: 'dive-badge',
  styleUrl: 'Badge.css',
  shadow: true,
})
export class Badge {
  @Prop() type: BadgeType = 'base';
  @Prop() text: string = '';

  render() {
    const classNames = ['badge'];
    if (this.type !== 'base') {
      classNames.push(`badge--type-${this.type}`);
    }

    return h('div', {
      class: {
        [classNames.join(' ')]: true
      },
      role: 'badge'
    }, this.text);
  }
} 