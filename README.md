# Design Token & CSS Variable System

## Overview

This project provides a scalable system for managing design tokens and generating CSS custom properties (variables) from Figma-exported JSON files. It supports multiple themes, color modes, and component-level tokens, enabling consistent, theme-aware styling for web applications.

## Key Features

- **Design Token Management:** Organize tokens by theme, color mode, and component.
- **Automated CSS Variable Generation:** Scripts convert tokens into CSS variables for use in your app.
- **Theme & Mode Support:** Easily switch between themes and color modes using generated CSS.
- **Extensible:** Add new themes, modes, or token sets as your design system grows.

## Project Structure

- `src/tokens/data/` — Source JSON files for themes, color modes, components, and layouts.
- `src/tokens/css-vars/` — Generated CSS variable files (output from scripts).
- `scripts/` — Node.js scripts for processing tokens and generating CSS variables.
- `src/` — Main source code for your application or design system.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Generate CSS variables:**
   ```sh
   node scripts/generate-css-variables.cjs
   ```
   See [`scripts/README.md`](scripts/README.md) for advanced options and troubleshooting.

3. **Use in your app:**
   Import the generated CSS files from `src/tokens/css-vars/` into your project as needed.

## Contributing

- To extend or modify the token system, edit the JSON files in `src/tokens/data/`.
- To improve or customize the generation scripts, see [`scripts/README.md`](scripts/README.md) for details and guidance.

## Resources

- [scripts/README.md](scripts/README.md): Full documentation for the CSS variable generation scripts, including file structure, CLI usage, and troubleshooting.
- Comments in each script for implementation details and extension points.

---

For questions or improvements, please open an issue or contact the maintainers. 