const meta = {
  title: 'Components/Icon',
  parameters: {
    layout: 'centered',
  },
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
};

export default meta;

export const Default = {
  args: {
    name: 'home',
    size: 'medium',
    variant: 'outline',
    strokeWidth: 2,
  },
  render: (args) => {
    const container = document.createElement('div');
    const icon = document.createElement('dive-icon');
    icon.setAttribute('name', args.name);
    icon.setAttribute('size', args.size);
    icon.setAttribute('variant', args.variant);
    icon.setAttribute('stroke-width', args.strokeWidth);
    if (args.color) icon.setAttribute('color', args.color);
    container.appendChild(icon);
    return container;
  },
};

export const Sizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '16px';
    
    ['small', 'medium', 'large'].forEach(size => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', 'home');
      icon.setAttribute('size', size);
      container.appendChild(icon);
    });
    
    return container;
  },
};

export const CommonIcons = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(6, 1fr)';
    container.style.gap = '16px';
    container.style.alignItems = 'center';
    
    ['home', 'user', 'settings', 'search', 'plus', 'minus', 'x', 'check', 'heart', 'star', 'mail', 'phone'].forEach(iconName => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', iconName);
      container.appendChild(icon);
    });
    
    return container;
  },
};

export const Variants = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '32px';
    
    // Outline section
    const outlineSection = document.createElement('div');
    outlineSection.style.textAlign = 'center';
    const outlineTitle = document.createElement('h3');
    outlineTitle.textContent = 'Outline';
    outlineSection.appendChild(outlineTitle);
    
    const outlineIcons = document.createElement('div');
    outlineIcons.style.display = 'flex';
    outlineIcons.style.gap = '8px';
    
    ['heart', 'star', 'bookmark'].forEach(iconName => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', iconName);
      icon.setAttribute('variant', 'outline');
      outlineIcons.appendChild(icon);
    });
    
    outlineSection.appendChild(outlineIcons);
    
    // Filled section
    const filledSection = document.createElement('div');
    filledSection.style.textAlign = 'center';
    const filledTitle = document.createElement('h3');
    filledTitle.textContent = 'Filled';
    filledSection.appendChild(filledTitle);
    
    const filledIcons = document.createElement('div');
    filledIcons.style.display = 'flex';
    filledIcons.style.gap = '8px';
    
    ['heart', 'star', 'bookmark'].forEach(iconName => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', iconName);
      icon.setAttribute('variant', 'filled');
      filledIcons.appendChild(icon);
    });
    
    filledSection.appendChild(filledIcons);
    
    container.appendChild(outlineSection);
    container.appendChild(filledSection);
    
    return container;
  },
};

export const Colors = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '16px';
    container.style.alignItems = 'center';
    
    const iconConfigs = [
      { name: 'heart', color: 'red' },
      { name: 'star', color: 'gold' },
      { name: 'check', color: 'green' },
      { name: 'x', color: 'crimson' },
      { name: 'settings', color: 'blue' }
    ];
    
    iconConfigs.forEach(config => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', config.name);
      icon.setAttribute('color', config.color);
      container.appendChild(icon);
    });
    
    return container;
  },
};

export const StrokeWidths = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '16px';
    container.style.alignItems = 'center';
    
    [1, 1.5, 2, 2.5, 3].forEach(strokeWidth => {
      const icon = document.createElement('dive-icon');
      icon.setAttribute('name', 'home');
      icon.setAttribute('stroke-width', strokeWidth.toString());
      container.appendChild(icon);
    });
    
    return container;
  },
}; 