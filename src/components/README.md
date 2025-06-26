# Guidelines: Creating New CSS Components & Stories

## Workflow (Recommended)

1. **Edit your component's `.css` file** in `src/components/` (this is the source of truth).
2. **Run the watcher** to auto-generate Lit CSS files:
   ```sh
   npm run watch:lit-css
   ```
   The watcher will keep Lit CSS files (e.g., `ComponentName.styles.ts`) in sync with your `.css` files.
3. **Import the generated Lit styles** in your component:
   ```ts
   import { componentNameStyles } from './ComponentName.styles';
   export class ComponentName extends LitElement {
     static styles = [componentNameStyles];
     // ...
   }
   ```

---

## 1. File Structure

Each component should have its own folder:

```
src/components/ComponentName/
  ComponentName.ts
  ComponentName.css
  ComponentName.styles.ts
  ComponentName.stories.ts
```

## 2. Using Design Tokens

- Always use CSS variables for color, spacing, border-radius, etc.
- Reference tokens from the design system (e.g., `var(--border-border-radius-lg)`).

## 3. Shadow DOM & CSS Variables

**Important:** CSS variables must be available in the component's shadow DOM.

If a variable is defined globally, forward it to the component in `connectedCallback`:

```ts
connectedCallback() {
  super.connectedCallback();
  const value = getComputedStyle(document.documentElement).getPropertyValue('--your-variable-name');
  if (value) {
    this.style.setProperty('--your-variable-name', value);
  }
}
```
*Note: Match the variable name to the one used in your CSS (e.g., `--border-border-radius-md`).*

This prevents issues where variables are not visible inside the shadow DOM.

## 4. Storybook Integration

- Import the component and its CSS in the story file.
- Use real design tokens in stories to ensure consistency.

## 5. Common Pitfalls & Fixes

- **Shadow DOM variable issues:** See above.
- **CSS specificity:** Prefer component styles over global overrides.
- **Storybook style conflicts:** Use unique class names and avoid global selectors.

## 6. Checklist

- [ ] Component folder created
- [ ] Uses design tokens
- [ ] CSS variables forwarded if needed
- [ ] Storybook story created
- [ ] Manual test in Storybook

---

## 7. Troubleshooting

If a style is not applied, check:
- Is the variable available in the shadow DOM?
- Is there a more specific selector overriding your style?
- Is Storybook injecting conflicting styles?

---

## 8. Resources

- [Lit documentation](https://lit.dev/docs/)
- [Storybook documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/) 