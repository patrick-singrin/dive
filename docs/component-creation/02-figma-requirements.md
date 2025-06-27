# 🎨 Figma Requirements

*What We Need from Figma Designs*

## Purpose
This document specifies the exact information required from Figma component designs to create pixel-perfect Stencil components. Use this as a checklist when analyzing Figma components and as guidance for designers when creating component specifications.

---

## 📋 Required Figma Input

### **Figma Component URL** 
[PASTE_FIGMA_URL_HERE]

*If no URL is provided, request the Figma component URL before proceeding with component creation.*

---

## 🔍 MCP Server Integration

### Figma MCP Server Usage
The Figma MCP Server automatically extracts comprehensive component data. This tool provides:

- **Component Properties**: ALL properties with types, options, and default values
- **Component Variables**: Text, boolean, instance swap, and other variable types
- **Variant Combinations**: All possible component state combinations
- **Design Tokens**: Colors, typography, spacing, shadows, borders
- **Layout Properties**: Auto-layout settings, constraints, positioning
- **Interactive States**: Hover, focus, active, disabled states
- **Asset References**: Icons, images, and other embedded assets

**Critical**: Always reference MCP server data directly rather than making assumptions about component structure.

**Collaborative Approach**: If any information is unclear or seems incomplete, **ASK THE USER for clarification**. Component analysis is collaborative - the user has context about design intent that automated tools might miss.

---

## 🧩 Component Property Analysis

### Required Property Documentation

#### **1. Component Variants**
Extract ALL variant properties from Figma:

```
Example Figma Component Properties:
├── Size: Small | Medium | Large
├── Variant: Primary | Secondary | Ghost | Destructive
├── State: Default | Hover | Pressed | Disabled
├── Icon: Boolean (Show/Hide)
├── Icon Position: Left | Right
└── Loading: Boolean
```

**Map to Stencil Props**:
```tsx
@Prop() size: 'small' | 'medium' | 'large' = 'medium';
@Prop() variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary';
@Prop() state: 'default' | 'hover' | 'pressed' | 'disabled' = 'default';
@Prop() icon: boolean = false;
@Prop() iconPosition: 'left' | 'right' = 'left';
@Prop() loading: boolean = false;
```

#### **2. Text Properties**
Document all text-related properties:

```
Text Properties:
├── Label: String (main button text)
├── Placeholder: String (for inputs)
├── Helper Text: String (additional context)
├── Error Message: String (validation feedback)
└── Icon Label: String (accessibility label)
```

#### **3. Boolean Properties**
Identify all show/hide functionality:

```
Boolean Controls:
├── Show Icon: true/false
├── Show Label: true/false  
├── Disabled: true/false
├── Required: true/false
├── Loading: true/false
├── Error State: true/false
└── Read Only: true/false
```

#### **4. Instance Swap Properties**
Document any swappable components:

```
Instance Swaps:
├── Icon: Tabler icon instances
├── Avatar: User avatar components
├── Logo: Brand logo variants
└── Content: Slot-based content areas
```

---

## 🎨 Design Token Extraction

### Required Visual Properties

#### **Colors**
Map ALL colors to design system tokens:

```
Color Mapping:
├── Background: --Color-Primary-Primary-Background-default
├── Text: --Color-Primary-Primary-Foreground-default
├── Border: --Color-Primary-Primary-Border-default
├── Hover Background: --Color-Primary-Primary-Background-hover
├── Focus Border: --Color-Primary-Primary-Border-focus
└── Disabled Background: --Color-Base-Subtle-Background-default
```

#### **Typography**
Document exact typography specifications:

```
Typography Properties:
├── Font Family: Atkinson Hyperlegible (system default)
├── Font Size: 14px (map to --Typography-Size-sm)
├── Font Weight: 500 (medium)
├── Line Height: 1.4
├── Letter Spacing: 0px
└── Text Transform: none
```

#### **Spacing**
Measure ALL spacing values:

```
Spacing Measurements:
├── Padding: 8px 12px (--Spacing-2 --Spacing-4)
├── Margin: 0px (external spacing)
├── Gap: 8px (--Spacing-2 for icon-text gap)
├── Border Width: 1px (--border-border-width-default)
└── Border Radius: 8px (--border-border-radius-md)
```

#### **Effects**
Document shadows and other effects:

```
Visual Effects:
├── Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
├── Transition: all 0.2s ease
├── Transform: translateY(-1px) on hover
└── Opacity: 0.5 when disabled
```

---

## 🎭 Interactive States

### Required State Documentation

#### **Default State**
- Base visual appearance
- Default property values
- Initial component state

#### **Hover State**
- Background color changes
- Shadow/elevation changes
- Transform effects (e.g., translateY)
- Transition timing

#### **Focus State**
- Outline/border changes for keyboard navigation
- Focus indicator styles
- ARIA state changes

#### **Active/Pressed State**
- Visual feedback during interaction
- Transform or color changes
- Animation timing

#### **Disabled State**
- Visual indicators (opacity, colors)
- Interaction prevention
- Accessibility considerations

#### **Loading State** (if applicable)
- Loading indicator placement
- Text changes during loading
- Icon replacement with spinner

#### **Error State** (for inputs)
- Error color applications
- Error message styling
- Icon changes for error indication

---

## 📐 Layout & Positioning

### Auto-Layout Analysis

#### **Flex Properties**
```
Figma Auto-Layout → CSS Flex:
├── Direction: Row/Column → flex-direction
├── Main Axis: Packed/Space Between → justify-content
├── Cross Axis: Center/Start/End → align-items
├── Gap: 8px → gap: var(--Spacing-2)
└── Padding: 8px 12px → padding: var(--Spacing-2) var(--Spacing-4)
```

#### **Constraints & Sizing**
```
Component Sizing:
├── Width: Hug Contents/Fill Container/Fixed
├── Height: Hug Contents/Fill Container/Fixed
├── Min Width: 120px (if specified)
├── Max Width: none/specific value
└── Aspect Ratio: maintain/ignore
```

#### **Responsive Behavior**
- How component adapts to different container sizes
- Breakpoint-specific behaviors
- Text wrapping and truncation rules

---

## 🔤 Content Guidelines

### Text Content Requirements

#### **Default Text Values**
- What text appears by default
- Placeholder text for inputs
- Label text for interactive elements

#### **Content Length Handling**
- How long text is handled (truncation/wrapping)
- Multi-line text support
- Internationalization considerations

#### **Content Validation**
- Required vs optional text
- Character limits
- Special character handling

---

## ♿ Accessibility Requirements

### Required A11y Information

#### **ARIA Properties**
```
Accessibility Mapping:
├── Role: button/textbox/combobox/etc.
├── Label: Text or aria-label value
├── Description: aria-describedby content
├── State: aria-pressed/aria-expanded/etc.
├── Live Region: aria-live for dynamic content
└── Required: aria-required for form inputs
```

#### **Keyboard Interaction**
- Tab order and focus management
- Enter/Space key behaviors
- Arrow key navigation (for complex components)
- Escape key handling

#### **Screen Reader Support**
- What should be announced when component receives focus
- State changes that need announcement
- Context information for complex components

---

## 📊 Figma Analysis Checklist

### Pre-Implementation Validation

Before creating the component, verify you have:

#### **Complete Property List**
- [ ] All variant combinations documented
- [ ] All boolean properties identified
- [ ] All text properties specified
- [ ] All instance swap properties noted
- [ ] Default values for every property documented

#### **Visual Specifications**
- [ ] All colors mapped to design tokens
- [ ] Typography specifications complete
- [ ] Spacing values measured and mapped
- [ ] Effects and transitions documented
- [ ] Icon usage and positioning specified

#### **Interactive Behavior**
- [ ] All interactive states documented
- [ ] Hover/focus/active/disabled behaviors specified
- [ ] Loading states (if applicable) designed
- [ ] Error states (for inputs) documented
- [ ] Transition timing and easing specified

#### **Layout Understanding**
- [ ] Auto-layout settings documented
- [ ] Responsive behavior understood
- [ ] Content overflow handling specified
- [ ] Icon and text positioning clear

#### **Accessibility Requirements**
- [ ] ARIA roles and properties identified
- [ ] Keyboard interaction patterns specified
- [ ] Screen reader announcements defined
- [ ] Color contrast verified (4.5:1 minimum)

---

## 🚨 Common Figma Issues

### Missing Information
Watch out for Figma components that lack:

- **Incomplete State Coverage**: Missing hover, focus, or disabled states
- **Unclear Property Relationships**: Dependencies between properties not documented
- **Missing Responsive Behavior**: How component adapts to different sizes
- **Accessibility Gaps**: Missing focus states or ARIA specifications
- **Icon Integration Issues**: Unclear icon sizing or positioning rules

### Resolution Process
When encountering missing information:

1. **Document the Gap**: Note what information is missing
2. **Consult Designer**: Work with design team to fill gaps
3. **Make Informed Assumptions**: Use design system patterns for missing details
4. **Document Assumptions**: Record decisions for future reference
5. **Validate with Design**: Review implementation with design team

---

## ✅ User Validation Step

### Component Property Confirmation
**CRITICAL STEP**: Before proceeding to implementation, present your analysis to the user for validation:

```markdown
## 🔍 Component Analysis Complete - Please Validate

Based on the Figma MCP Server data, I've identified the following component structure:

### Component Properties Found:
- Variant: ['primary', 'secondary', 'ghost'] (default: 'primary')
- Size: ['small', 'medium', 'large'] (default: 'medium') 
- Text: string (default: '')
- Disabled: boolean (default: false)
- Icon: string | undefined (optional)
- IconPosition: ['left', 'right'] (default: 'left')

### Interactive States Identified:
- Default, Hover, Focus, Active, Disabled

### Design Tokens Mapped:
- Background: --Color-Primary-Primary-Background-default
- Text: --Color-Primary-Primary-Foreground-default
- Spacing: --Spacing-2, --Spacing-4

### Questions for Validation:
1. Did I miss any component properties or variants?
2. Are the default values correct?
3. Are there any interactive states I didn't identify?
4. Do you see any conditional logic between properties?
5. Are there any accessibility requirements I should know about?

**Please confirm this analysis is complete before I proceed with implementation.**
```

### When to Ask for Help
- **Unclear Property Relationships**: When dependencies between properties aren't clear
- **Missing State Information**: When hover/focus/disabled states aren't fully specified
- **Ambiguous Design Intent**: When multiple interpretations are possible
- **Complex Interactions**: When component behavior isn't obvious from static design
- **Accessibility Gaps**: When ARIA requirements or keyboard behavior isn't specified

## 📝 Documentation Template

### Figma Analysis Output Template

```markdown
# Component: [ComponentName]
**Figma URL**: [URL]
**Analysis Date**: [Date]
**Analyst**: [Name]

## Component Properties
### Variants
- Property: Type = Default
- [List all variant properties]

### Text Properties  
- Property: Type = Default
- [List all text properties]

### Boolean Properties
- Property: Boolean = Default
- [List all boolean properties]

## Visual Specifications
### Colors
- Element: CSS Variable
- [Map all colors to tokens]

### Typography
- Font Size: [value] → [CSS variable]
- Font Weight: [value]
- Line Height: [value]

### Spacing
- Padding: [values] → [CSS variables]
- Margins: [values] → [CSS variables]
- Gaps: [values] → [CSS variables]

## Interactive States
### State: Description
- [Document all interactive states]

## Layout & Positioning
- Flex Direction: [value]
- Justify Content: [value]  
- Align Items: [value]
- Gap: [value]

## Accessibility
- Role: [ARIA role]
- Label: [accessibility label]
- States: [ARIA states]
- Keyboard: [interaction patterns]

## Implementation Notes
- [Any special considerations]
- [Design system pattern references]
- [Assumptions made for missing information]
```

---

**Next**: Read [Technical Implementation](./03-technical-implementation.md) to understand how to translate Figma requirements into Stencil components. 