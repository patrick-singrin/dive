import { Component, Prop, h, Event, EventEmitter, Host } from '@stencil/core';

export type ChipType = 'base' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ChipVariant = 'outline' | 'filled';
export type ChipSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'dive-chip',
  styleUrl: 'Chip.css',
  shadow: true,
})
export class Chip {
  @Prop() type: ChipType = 'base';
  @Prop() variant: ChipVariant = 'outline';
  @Prop() size: ChipSize = 'medium';
  @Prop() text: string = '';
  @Prop() disabled: boolean = false;
  @Prop() removable: boolean = false;
  @Prop() icon?: string;                    // Left icon name from Tabler Icons
  @Prop() iconOnly: boolean = false;        // Icon-only chip (no text)
  @Prop() clickable: boolean = true;        // Whether chip responds to clicks

  @Event() chipClick!: EventEmitter<void>;
  @Event() chipRemove!: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled && this.clickable) {
      this.chipClick.emit();
    }
  };

  private handleRemove = (event: Event) => {
    event.stopPropagation();
    if (!this.disabled) {
      this.chipRemove.emit();
    }
  };

  render() {
    const classNames = ['chip'];
    
    if (this.type !== 'base') {
      classNames.push(`chip--type-${this.type}`);
    }
    
    if (this.variant !== 'outline') {
      classNames.push(`chip--variant-${this.variant}`);
    }
    
    if (this.size !== 'medium') {
      classNames.push(`chip--size-${this.size}`);
    }
    
    if (this.disabled) {
      classNames.push('chip--disabled');
    }
    
    if (this.iconOnly) {
      classNames.push('chip--icon-only');
    }
    
    if (this.removable) {
      classNames.push('chip--removable');
    }

    const content = [];

    // Add left icon
    if (this.icon) {
      content.push(
        h('dive-icon', {
          name: this.icon,
          size: 'small',
          class: {
            'chip__icon': true
          }
        })
      );
    }

    // Add text content (only if not icon-only)
    if (!this.iconOnly && this.text) {
      content.push(
        h('span', {
          class: {
            'chip__text': true
          }
        }, this.text)
      );
    }

    // Add remove button
    if (this.removable) {
      // Use circle-x icon with variant matching chip variant
      const iconVariant = this.variant === 'filled' ? 'filled' : 'outline';
      
      content.push(
        h('button', {
          class: {
            'chip__remove': true
          },
          onClick: this.handleRemove,
          'aria-label': 'Remove'
        }, 
          h('dive-icon', {
            name: 'circle-x',
            variant: iconVariant,
            size: 'small',
            class: {
              'chip__remove-icon': true
            }
          })
        )
      );
    }

    return h(Host, {},
      h('div', {
        class: {
          [classNames.join(' ')]: true
        },
        onClick: this.clickable ? this.handleClick : undefined,
        role: this.clickable ? 'button' : undefined,
        tabindex: this.clickable && !this.disabled ? '0' : undefined,
        'aria-disabled': this.disabled ? 'true' : undefined,
        'aria-label': this.iconOnly ? this.text : undefined
      }, content)
    );
  }
} 