import { Component, Prop, Event, EventEmitter, h, State, Host } from '@stencil/core';

// =====================
// TYPE DEFINITIONS
// =====================
// Export all types for external use
export type BlueprintVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BlueprintSize = 'small' | 'medium' | 'large';
export type BlueprintState = 'default' | 'hover' | 'active' | 'focused' | 'disabled';
export type BlueprintContent = 'text' | 'icon' | 'text-icon' | 'avatar';

// Interface for event payloads
export interface BlueprintChangeEvent {
  value: string;
  variant: BlueprintVariant;
  size: BlueprintSize;
}

/**
 * Blueprint Component
 * 
 * A comprehensive template component that demonstrates all patterns and conventions
 * for creating Stencil Web Components in this project.
 * 
 * @slot default - The main content slot
 * @slot icon - Icon content (when content type supports icons)
 * @slot avatar - Avatar content (when content type supports avatars)
 */
@Component({
  tag: 'dive-blueprint',
  styleUrl: 'Blueprint.css',
  shadow: true,
})
export class Blueprint {
  // =====================
  // PROPERTIES
  // =====================
  // All properties should map directly to Figma component properties from MCP server
  
  /** The visual variant/type of the component */
  @Prop() variant: BlueprintVariant = 'primary';
  
  /** The size of the component */
  @Prop() size: BlueprintSize = 'medium';
  
  /** The main text content */
  @Prop() text: string = '';
  
  /** Secondary text or description */
  @Prop() description: string = '';
  
  /** Whether the component is disabled */
  @Prop() disabled: boolean = false;
  
  /** Whether to show an icon */
  @Prop() hasIcon: boolean = false;
  
  /** Whether to show an avatar */
  @Prop() hasAvatar: boolean = false;
  
  /** The content type/layout */
  @Prop() content: BlueprintContent = 'text';
  
  /** Form-related properties */
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() required: boolean = false;
  
  /** ARIA and accessibility properties */
  @Prop() ariaLabel: string = '';
  @Prop() ariaDescribedBy: string = '';
  
  // =====================
  // STATE
  // =====================
  // Internal component state that doesn't come from outside
  
  /** Whether the component is currently focused */
  @State() focused: boolean = false;
  
  /** Whether the component is currently pressed/active */
  @State() pressed: boolean = false;
  
  /** Whether the component is being hovered */
  @State() hovered: boolean = false;
  
  // =====================
  // EVENTS
  // =====================
  // Custom events that the component can emit
  
  /** Emitted when component value changes */
  @Event() blueprintChange!: EventEmitter<BlueprintChangeEvent>;
  
  /** Emitted when component is clicked */
  @Event() blueprintClick!: EventEmitter<MouseEvent>;
  
  /** Emitted when component gains focus */
  @Event() blueprintFocus!: EventEmitter<FocusEvent>;
  
  /** Emitted when component loses focus */
  @Event() blueprintBlur!: EventEmitter<FocusEvent>;
  
  // =====================
  // ELEMENT REFERENCES
  // =====================
  // References to internal elements (if needed for imperative operations)
  
  private buttonRef!: HTMLButtonElement;
  
  // =====================
  // LIFECYCLE METHODS
  // =====================
  
  componentDidLoad() {
    // Perform any setup after component mounts
    this.setupAccessibility();
  }
  
  componentDidUpdate() {
    // Handle updates after re-render
    this.updateAccessibility();
  }
  
  // =====================
  // PRIVATE METHODS
  // =====================
  
  private setupAccessibility() {
    // Set up accessibility attributes and behaviors
    if (this.buttonRef && this.ariaLabel) {
      this.buttonRef.setAttribute('aria-label', this.ariaLabel);
    }
  }
  
  private updateAccessibility() {
    // Update accessibility when props change
    this.setupAccessibility();
  }
  
  private getCurrentState(): BlueprintState {
    if (this.disabled) return 'disabled';
    if (this.pressed) return 'active';
    if (this.focused) return 'focused';
    if (this.hovered) return 'hover';
    return 'default';
  }
  
  // =====================
  // EVENT HANDLERS
  // =====================
  
  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    this.blueprintClick.emit(event);
    
    // Emit change event with current state
    this.blueprintChange.emit({
      value: this.value,
      variant: this.variant,
      size: this.size,
    });
  };
  
  private handleFocus = (event: FocusEvent) => {
    if (this.disabled) return;
    
    this.focused = true;
    this.blueprintFocus.emit(event);
  };
  
  private handleBlur = (event: FocusEvent) => {
    this.focused = false;
    this.blueprintBlur.emit(event);
  };
  
  private handleMouseEnter = () => {
    if (this.disabled) return;
    this.hovered = true;
  };
  
  private handleMouseLeave = () => {
    this.hovered = false;
    this.pressed = false;
  };
  
  private handleMouseDown = () => {
    if (this.disabled) return;
    this.pressed = true;
  };
  
  private handleMouseUp = () => {
    this.pressed = false;
  };
  
  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    
    // Handle Enter and Space for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pressed = true;
    }
  };
  
  private handleKeyUp = (event: KeyboardEvent) => {
    if (this.disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pressed = false;
      
      // Trigger click behavior
      this.handleClick(new MouseEvent('click'));
    }
  };
  
  // =====================
  // CSS CLASS GENERATION
  // =====================
  
  private getComponentClasses(): string[] {
    const classes = ['blueprint'];
    const state = this.getCurrentState();
    
    // Add variant classes (only if not default)
    if (this.variant !== 'primary') {
      classes.push(`blueprint--variant-${this.variant}`);
    }
    
    // Add size classes (only if not default)
    if (this.size !== 'medium') {
      classes.push(`blueprint--size-${this.size}`);
    }
    
    // Add content type classes
    if (this.content !== 'text') {
      classes.push(`blueprint--content-${this.content}`);
    }
    
    // Add state classes
    if (state !== 'default') {
      classes.push(`blueprint--state-${state}`);
    }
    
    // Add conditional classes
    if (this.hasIcon) {
      classes.push('blueprint--has-icon');
    }
    
    if (this.hasAvatar) {
      classes.push('blueprint--has-avatar');
    }
    
    if (this.required) {
      classes.push('blueprint--required');
    }
    
    return classes;
  }
  
  // =====================
  // RENDER HELPERS
  // =====================
  
  private renderIcon() {
    if (!this.hasIcon && this.content !== 'icon' && this.content !== 'text-icon') {
      return null;
    }
    
    return h('span', { 
      class: { 'blueprint__icon': true },
      'aria-hidden': 'true'
    }, [
      h('slot', { name: 'icon' }, '🎯') // Default icon as fallback
    ]);
  }
  
  private renderAvatar() {
    if (!this.hasAvatar && this.content !== 'avatar') {
      return null;
    }
    
    return h('span', { 
      class: { 'blueprint__avatar': true },
      'aria-hidden': 'true'
    }, [
      h('slot', { name: 'avatar' }, '👤') // Default avatar as fallback
    ]);
  }
  
  private renderText() {
    if (!this.text && !this.description) {
      return h('slot'); // Allow slotted content
    }
    
    const textElements = [];
    
    if (this.text) {
      textElements.push(
        h('span', { class: { 'blueprint__text': true } }, this.text)
      );
    }
    
    if (this.description) {
      textElements.push(
        h('span', { class: { 'blueprint__description': true } }, this.description)
      );
    }
    
    return h('span', { class: { 'blueprint__text-container': true } }, textElements);
  }
  
  private renderContent() {
    const contentElements = [];
    
    // Render content based on content type
    switch (this.content) {
      case 'icon':
        contentElements.push(this.renderIcon());
        break;
        
      case 'text-icon':
        contentElements.push(this.renderIcon());
        contentElements.push(this.renderText());
        break;
        
      case 'avatar':
        contentElements.push(this.renderAvatar());
        contentElements.push(this.renderText());
        break;
        
      case 'text':
      default:
        contentElements.push(this.renderText());
        break;
    }
    
    return contentElements;
  }
  
  // =====================
  // MAIN RENDER METHOD
  // =====================
  
  render() {
    const componentClasses = this.getComponentClasses();
    
    // Determine the appropriate HTML element
    const elementProps = {
      class: {
        [componentClasses.join(' ')]: true
      },
      disabled: this.disabled,
      name: this.name,
      value: this.value,
      'aria-label': this.ariaLabel || undefined,
      'aria-describedby': this.ariaDescribedBy || undefined,
      'aria-disabled': this.disabled ? 'true' : undefined,
      'aria-pressed': this.pressed ? 'true' : undefined,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      ref: (el: HTMLButtonElement) => this.buttonRef = el,
    };
    
    return h(Host, {
      role: 'button',
      tabindex: this.disabled ? -1 : 0,
    }, [
      h('button', elementProps, this.renderContent())
    ]);
  }
} 