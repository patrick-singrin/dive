import { Component, Prop, h, Host, State } from '@stencil/core';

@Component({
  tag: 'dive-icon',
  styleUrl: 'Icon.css',
  shadow: true,
})
export class Icon {
  @Prop() name!: string;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() color?: string;
  @Prop() strokeWidth: number = 2;
  @Prop() variant: 'outline' | 'filled' = 'outline';
  
  @State() svgContent: string = '';

  async componentWillLoad() {
    await this.loadIconSVG();
  }

  async componentWillUpdate() {
    await this.loadIconSVG();
  }

  private async loadIconSVG() {
    try {
      // Load SVG content from the public directory
      const response = await fetch(`/icons/${this.variant}/${this.name}.svg`);
      if (response.ok) {
        this.svgContent = await response.text();
      } else {
        throw new Error('Icon not found');
      }
    } catch (error) {
      console.warn(`Icon "${this.name}" not found in ${this.variant} variant`);
      this.svgContent = '';
    }
  }

  private getSizeClass(): string {
    const sizeMap = {
      'small': 'icon--small',
      'medium': 'icon--medium', 
      'large': 'icon--large'
    };
    return sizeMap[this.size];
  }

  private parseSVGPaths(svgContent: string) {
    if (!svgContent) return [];
    
    // Extract path elements from SVG
    const pathMatches = svgContent.match(/<path[^>]*>/g) || [];
    
    return pathMatches.map((pathString, index) => {
      // Extract attributes from path string
      const dMatch = pathString.match(/d="([^"]*)"/);
      const strokeMatch = pathString.match(/stroke="([^"]*)"/);
      const fillMatch = pathString.match(/fill="([^"]*)"/);
      
      const attrs: any = { key: index };
      
      if (dMatch) attrs.d = dMatch[1];
      if (strokeMatch) attrs.stroke = strokeMatch[1];
      if (fillMatch) attrs.fill = fillMatch[1];
      
      return h('path', attrs);
    });
  }

  render() {
    const style = this.color ? { color: this.color } : {};
    const paths = this.parseSVGPaths(this.svgContent);

    if (paths.length === 0) {
      return h(Host, { 
        class: { [this.getSizeClass()]: true }
      }, 
        h('div', { class: { 'icon-placeholder': true } }, '?')
      );
    }

    return h(Host, { 
      class: { [this.getSizeClass()]: true }, 
      style 
    }, 
      h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24", 
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': this.strokeWidth,
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        class: { 
          'icon': true,
          'icon-tabler': true,
          [`icons-tabler-${this.variant}`]: true,
          [`icon-tabler-${this.name}`]: true
        }
      }, paths)
    );
  }
} 