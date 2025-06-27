# 🐛 Problem Database

*LIVING DOCUMENT - Add problems and solutions as they're discovered*

## Purpose
This document captures known issues encountered during component creation and their proven solutions. The goal is **Zero Repeated Mistakes** - if someone has solved a problem once, no one should have to solve it again.

---

## 🚨 Critical Build Issues

### ❌ **Problem: "Failed to fetch dynamically imported module" in Storybook**
**Frequency**: Very Common (80% of new developers)  
**Impact**: High - Blocks component testing entirely

#### Symptoms
```bash
Error: Failed to fetch dynamically imported module: 
http://localhost:6006/dist/components/dive-component-name
```

#### Root Cause
Storybook attempts to import component from `dist/` folder before Stencil build has generated the distribution files.

#### Solution
```bash
# ALWAYS build Stencil components before running Storybook
npm run build
npm run storybook
```

#### Prevention
- Never skip the build step when creating new components
- Add this to component creation checklist
- Consider adding build validation to Storybook startup

#### References
- This is Stencil-specific behavior, not a general web component issue
- Distribution files only exist after `npm run build`

---

### ❌ **Problem: CSS Variables Not Inherited in Shadow DOM**
**Frequency**: Common (60% of new components)  
**Impact**: Medium - Components don't match design tokens

#### Symptoms
- Component appears with default styles instead of design system colors
- CSS custom properties appear as fallback values
- Theme switching doesn't affect component

#### Root Cause
Shadow DOM doesn't automatically inherit all CSS custom properties from parent context.

#### Solution
```css
:host {
  /* Explicit inheritance for shadow DOM */
  --Spacing-2: var(--Spacing-2, 8px);
  --Spacing-4: var(--Spacing-4, 12px);
  --Color-Primary-Primary-Background-default: var(--Color-Primary-Primary-Background-default, #2563eb);
  
  /* Then use in component styles */
  --component-padding: var(--Spacing-2) var(--Spacing-4);
  --component-background: var(--Color-Primary-Primary-Background-default);
}

.component {
  padding: var(--component-padding);
  background: var(--component-background);
}
```

#### Prevention
- Always test components in both light and dark themes
- Include CSS variable inheritance in component checklist
- Reference successful examples from existing components

---

### ❌ **Problem: TypeScript Compilation Errors with Stencil Props**
**Frequency**: Moderate (40% of complex components)  
**Impact**: Medium - Prevents build completion

#### Symptoms
```bash
Error: Type 'string | undefined' is not assignable to type 'string'
Error: Property 'myProp' does not exist on type 'HTMLElement'
```

#### Root Cause
- Missing default values for optional props
- Incorrect type definitions for union types
- Using props before null checking

#### Solution
```tsx
// ✅ Correct prop definitions
@Prop() variant: 'primary' | 'secondary' = 'primary';  // Default value
@Prop() text?: string;  // Optional prop
@Prop() disabled: boolean = false;  // Boolean with default

// ✅ Safe prop usage
render() {
  return h('div', {
    class: {
      'component': true,
      [`component--${this.variant}`]: true,
      'component--disabled': this.disabled
    }
  }, this.text || 'Default text');
}
```

#### Prevention
- Always provide default values for required props
- Use optional typing (`?`) for truly optional props
- Test components with undefined/null prop values

---

## 🎨 Design Fidelity Issues

### ❌ **Problem: Component Doesn't Match Figma Design**
**Frequency**: Very Common (90% of first attempts)  
**Impact**: High - Requires complete rework

#### Symptoms
- Visual spacing doesn't match Figma measurements
- Colors are close but not exact
- Typography sizes or weights are incorrect
- Interactive states missing or incorrect

#### Root Cause
- Insufficient analysis of Figma component properties
- Skipping variant combinations
- Not implementing all component states
- Using wrong CSS variables

#### Solution
1. **Complete Property Analysis**:
   ```bash
   # Use Figma MCP Server to extract ALL component properties
   # Document every variant, state, and property combination
   ```

2. **Systematic Implementation**:
   ```tsx
   // Implement EVERY Figma property as a Stencil prop
   @Prop() size: 'small' | 'medium' | 'large' = 'medium';
   @Prop() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
   @Prop() state: 'default' | 'hover' | 'pressed' | 'disabled' = 'default';
   @Prop() hasIcon: boolean = false;
   ```

3. **Pixel-Perfect CSS**:
   ```css
   /* Use exact design token values */
   .component--size-small {
     padding: var(--Spacing-1) var(--Spacing-3); /* 4px 10px */
     font-size: var(--Typography-Size-sm); /* 14px */
   }
   ```

#### Prevention
- Use comprehensive Figma property checklist
- Implement ALL variants before considering component complete
- Test every state combination
- Screenshot comparison with Figma design

---

### ❌ **Problem: Missing Interactive States**
**Frequency**: Common (70% of interactive components)  
**Impact**: Medium - Poor user experience

#### Symptoms
- Button doesn't show hover feedback
- Focus states missing (accessibility issue)
- Disabled state not implemented
- Loading state missing

#### Root Cause
- Only implementing default state
- Not testing keyboard navigation
- Overlooking accessibility requirements

#### Solution
```css
/* Complete state implementation */
.button {
  transition: all 0.2s ease;
}

.button:hover:not(.button--disabled) {
  --component-background: var(--Color-Primary-Primary-Background-hover);
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: var(--border-border-width-hover) solid var(--Color-Primary-Primary-Border-default);
  outline-offset: 2px;
}

.button:active:not(.button--disabled) {
  --component-background: var(--Color-Primary-Primary-Background-pressed);
  transform: translateY(0);
}

.button--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

#### Prevention
- Include interactive state testing in QA checklist
- Test with keyboard navigation
- Use accessibility testing tools
- Reference existing interactive components

---

## 🔧 Stencil Framework Issues

### ❌ **Problem: Event Emission Not Working**
**Frequency**: Moderate (30% of interactive components)  
**Impact**: Medium - Component integration issues

#### Symptoms
- Parent components don't receive events
- Event handlers not triggering
- Console errors about event emission

#### Root Cause
- Incorrect `@Event()` decorator usage
- Wrong event naming conventions
- Missing event emission in event handlers

#### Solution
```tsx
import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'dive-button',
  styleUrl: 'Button.css',
  shadow: true,
})
export class Button {
  @Event() buttonClick: EventEmitter<MouseEvent>;
  @Event() valueChange: EventEmitter<string>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  };

  render() {
    return h('button', {
      onClick: this.handleClick,
      disabled: this.disabled
    }, this.text);
  }
}
```

#### Prevention
- Follow Stencil event naming conventions
- Always test event emission with parent components
- Use TypeScript for event type safety

---

## 🧪 Testing & Development Issues

### ❌ **Problem: Storybook Hot Reload Not Working**
**Frequency**: Moderate (50% of development sessions)  
**Impact**: Low - Slows development

#### Symptoms
- Changes to component files don't reflect in Storybook
- Need to manually refresh browser
- Stories show stale component versions

#### Root Cause
- Stencil build cache not invalidating
- Browser caching compiled components
- File watcher issues

#### Solution
```bash
# Clear Stencil cache and rebuild
rm -rf .stencil dist
npm run build
npm run storybook

# For persistent issues, clear browser cache
# Chrome: DevTools > Application > Storage > Clear storage
```

#### Prevention
- Use `npm run start` for Stencil dev server with hot reload
- Regularly clear build cache during active development
- Use browser incognito mode for testing

---

## 📋 Quality Assurance Issues

### ❌ **Problem: Accessibility Violations**
**Frequency**: Common (60% of components without testing)  
**Impact**: High - Legal and usability issues

#### Symptoms
- Screen reader testing reveals missing labels
- Keyboard navigation doesn't work
- Color contrast ratios fail WCAG standards
- Focus indicators missing or inadequate

#### Root Cause
- Not testing with accessibility tools
- Missing ARIA attributes
- Insufficient color contrast
- No keyboard interaction testing

#### Solution
```tsx
render() {
  return h('button', {
    class: 'button',
    disabled: this.disabled,
    'aria-label': this.iconOnly ? this.text : undefined,
    'aria-pressed': this.pressed ? 'true' : 'false',
    role: 'button',
    tabindex: this.disabled ? -1 : 0
  }, this.renderContent());
}
```

```css
.button:focus-visible {
  outline: 2px solid var(--Color-Primary-Primary-Border-default);
  outline-offset: 2px;
}
```

#### Prevention
- Use accessibility testing tools (axe, WAVE)
- Test with screen readers
- Verify keyboard navigation
- Check color contrast ratios
- Include accessibility in QA checklist

---

## 🔄 Living Database Process

### How to Add New Problems
1. **Identify Pattern**: Only add problems that affect multiple developers or components
2. **Document Symptoms**: What does the developer see when this happens?
3. **Root Cause Analysis**: Why does this happen?
4. **Proven Solution**: What actually fixes it? (Test before documenting)
5. **Prevention Strategy**: How can this be avoided in the future?

### Problem Lifecycle
1. **New Problem**: Developer encounters issue, adds to database
2. **Solution Development**: Team works on reliable fix
3. **Solution Testing**: Verify fix works across different scenarios
4. **Documentation**: Update database with proven solution
5. **Prevention Integration**: Add to checklists or automation
6. **Archive**: Move resolved systemic issues to historical section

### Update Frequency
- **Immediate**: Add problems as soon as they're encountered
- **Weekly**: Review and improve existing entries
- **Monthly**: Archive resolved systemic issues
- **Quarterly**: Analyze patterns and update prevention strategies

---

## 📊 Problem Metrics

Track these metrics to improve the system:
- **Problem Frequency**: How often each issue occurs
- **Resolution Time**: How long it takes to solve
- **Prevention Success**: Are prevention strategies working?
- **Documentation Quality**: Are solutions clear and actionable?

### Current Statistics
- **Total Problems Documented**: 8
- **Critical Build Issues**: 3
- **Design Fidelity Issues**: 2  
- **Framework Issues**: 1
- **Testing Issues**: 1
- **Accessibility Issues**: 1

---

*Last Updated: 2024-12*  
*Next Review: 2024-12 (weekly during initial population)* 