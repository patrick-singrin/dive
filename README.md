# Dive

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

3. **Component styles workflow**
   - Edit your component's `.css` file in `src/components/` (this is the source of truth).
   - Run the watcher to auto-generate Lit CSS files:
     ```sh
     npm run watch:lit-css
     ```
   - The watcher will keep Lit CSS files (e.g., `ComponentName.styles.ts`) in sync with your `.css` files.
   - Import the generated Lit styles in your component as shown in [src/components/README.md](src/components/README.md).

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

#### 🎨 Lit Component Styles Automation

To ensure styles work with Lit's shadow DOM, use the automated script to convert component CSS files to Lit `css` templates:

1. **Edit your component's CSS file** (e.g., `src/components/Button/Button.css`).
2. **Run the conversion script:**
   ```sh
   node scripts/convert-css-to-lit.cjs
   ```
   This will generate a corresponding `Button.styles.ts` file exporting a Lit `css` template.
3. **Import and use the generated styles in your component:**
   ```ts
   import { buttonStyles } from './Button.styles';
   export class MyButton extends LitElement {
     static styles = [buttonStyles];
     // ...
   }
   ```

- This workflow ensures your styles are encapsulated and always work in Storybook and all apps.
- The script will process all `.css` files in `src/components/**` and generate `.styles.ts` files as needed.

---

### 📚 Storybook Integration

- Explore all color variables visually in Storybook:  
  `src/stories/componentColors.stories.ts`  
  _Switch between color modes to preview all states and categories._
- For Storybook configuration and advanced usage, see `src/stories/Configure.mdx` and [Storybook Docs](https://storybook.js.org/).

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

For best practices and troubleshooting when creating new CSS components and their stories, see [src/components/README.md](src/components/README.md).

**Note:** CSS variables used in your component's styles are now automatically forwarded to the shadow DOM. You do not need to manually forward variables—just use them in your CSS and they will be available in your Lit component.

---

_For questions or improvements, open an issue or contact the maintainers._ 