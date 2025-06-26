# Dive - Design System

### ✨ Overview

A scalable, theme-aware system for managing design tokens and generating CSS custom properties from Figma-exported JSON files. Supports multiple themes, color modes, and component-level tokens for consistent, maintainable web styling.

---

### 🚀 Quickstart

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Generate CSS variables**
   ```sh
   npx ts-node scripts/generate-css-variables.ts
   ```
   _See [scripts/README.md](scripts/README.md) for advanced options._

3. **Component development workflow**
   - Create Stencil components in `src/components/` using TypeScript (`.tsx` files).
   - Use CSS files directly - no build step needed for styles.
   - Build components:
     ```sh
     npm run build
     ```
   - Test in Storybook:
     ```sh
     npm run storybook
     ```
   - See [src/components/COMPONENT_DEVELOPMENT.md](src/components/COMPONENT_DEVELOPMENT.md) for complete guide.

4. **Use in your app**
---

### 🗂️ Project Structure

| Path                        | Purpose                                      |
|-----------------------------|----------------------------------------------|
| `src/tokens/data/`          | Source JSON for themes, modes, components    |
| `src/tokens/css-vars/`      | Generated CSS variable files                 |
| `scripts/`                  | Node.js scripts for token processing         |
| `src/`                      | Main source code for your app/design system  |

---

### 🧩 Token File Examples

#### Theme File (`src/tokens/data/brand-theme/dive-theme.json`)
```json
{
  "Color": {
    "Primary": {
      "600": { "$type": "color", "$value": "#2c72e0" }
      // ...
    }
    // ...
  }
  // ...
}
```

#### Color Mode File (`src/tokens/data/color-modes/light-mode.json`)
```json
{
  "Primary": {
    "600": { "$type": "color", "$value": "{Color.Primary.600}" }
    // ...
  }
  // ...
}
```

#### Component Token File (`src/tokens/data/components/component.json`)
```json
{
  "Color": {
    "Primary": {
      "Background": {
        "default": { "$type": "color", "$value": "{Primary.50}" }
        // ...
      }
      // ...
    }
    // ...
  }
  // ...
}
```

---

### 🛠️ Common Tasks

#### Add a New Theme
1. Create a new file in `src/tokens/data/brand-theme/` (e.g., `my-theme.json`).
2. Follow the structure of `dive-theme.json`.
3. Run the generation script.

#### Add a New Color Mode
1. Create a new file in `src/tokens/data/color-modes/` (e.g., `sepia-mode.json`).
2. Map semantic tokens to palette tokens as in `light-mode.json`.
3. Run the generation script.

#### Add a New Component Token
1. Edit `src/tokens/data/components/component.json`.
2. Add your new token under the appropriate category.
3. Run the generation script.

#### Enable Layout Tokens (Advanced)
- Uncomment the relevant line in `scripts/generate-css-variables.cjs`.
- Ensure all references in `layouts/layout.json` are mapped in your mode files.

#### 🎨 Stencil Component Development

Components are built using Stencil framework for natural CSS variable inheritance and Scale Design System compatibility:

1. **Create a new component** (e.g., `src/components/Button/Button.tsx`):
   ```tsx
   import { Component, Prop, h } from '@stencil/core';
   
   @Component({
     tag: 'dive-button',
     styleUrl: 'Button.css',
     shadow: true,
   })
   export class Button {
     @Prop() variant: string = 'primary';
     render() {
       return h('button', { class: `button button--${this.variant}` }, 'Button');
     }
   }
   ```

2. **Create CSS with design tokens** (`Button.css`):
   ```css
   :host {
     --button-bg: var(--Color-Primary-Primary-Background-default, #2563eb);
   }
   .button { background: var(--button-bg); }
   ```

3. **Build and test:**
   ```sh
   npm run build      # Compile Stencil components
   npm run storybook  # Test in Storybook
   ```

- CSS variables are naturally inherited in Stencil's shadow DOM
- No manual CSS variable forwarding needed
- Automatic component registration and TypeScript definitions

---

### 📚 Storybook Integration

- **Design System Integration**: Storybook UI automatically adapts to theme modes using design system background variables
- **Component Preview**: Explore all color variables visually in ComponentColors story
- **Theme Switching**: Use toolbar to switch between light/dark/high-contrast modes
- **Component Testing**: All components automatically work with theme switching
- For Storybook configuration, see [src/components/COMPONENT_DEVELOPMENT.md](src/components/COMPONENT_DEVELOPMENT.md) and [Storybook Docs](https://storybook.js.org/).

---

### 🧑‍💻 Contributing

- Edit JSON files in `src/tokens/data/` to extend tokens.
- See [scripts/README.md](scripts/README.md) for script customization.
- PRs and issues welcome!

---

### ❓ FAQ & Troubleshooting

- **Unresolved Token Error:**  
  Check that all references in your JSON files are correct and resolvable.
- **No Files Generated:**  
  Remove the `--dry-run` flag.
- **Script Errors:**  
  Ensure all required JSON files exist and are valid.

---

### 📎 Resources

- [scripts/README.md](scripts/README.md): Full script documentation, CLI options, troubleshooting.
- Comments in each script for implementation details.

---

## Component Development Guidelines

For complete best practices, patterns, and troubleshooting when creating new Stencil components, see [src/components/COMPONENT_DEVELOPMENT.md](src/components/COMPONENT_DEVELOPMENT.md).

**Framework Migration**: The design system has been migrated from Lit to Stencil for improved CSS variable handling, Scale Design System compatibility, and simplified development experience. See [STENCIL_MIGRATION_SUCCESS.md](STENCIL_MIGRATION_SUCCESS.md) for details.

---

_For questions or improvements, open an issue or contact the maintainers._ 