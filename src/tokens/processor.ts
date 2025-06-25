// src/tokens/processor.ts
// Token Processor: Loads and merges token JSON files according to cascading rules

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class TokenValidationError extends Error {
  constructor(message: string, public tokenPath?: string) {
    super(message);
    this.name = 'TokenValidationError';
  }
}

/**
 * TokenProcessor loads and merges tokens from all layers (theme, mode, component, layout)
 * according to the strict cascading structure.
 */
export class TokenProcessor {
  private dataDir: string;
  private tokens: {
    theme: any;
    modes: Record<string, any>;
    component: any;
    layout: any;
  } = { theme: {}, modes: {}, component: {}, layout: {} };

  constructor() {
    // ESM-compatible __dirname
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.dataDir = path.resolve(__dirname, './data');
    // Optionally, load tokens on construction
  }

  /**
   * Loads all token JSON files from the data directory.
   */
  loadAllTokens(): void {
    // Load theme (brand-theme/dive-theme.json)
    const themePath = path.join(this.dataDir, 'brand-theme', 'dive-theme.json');
    this.tokens.theme = JSON.parse(fs.readFileSync(themePath, 'utf-8'));

    // Load modes (color-modes/*.json)
    const modesDir = path.join(this.dataDir, 'color-modes');
    const modeFiles = fs.readdirSync(modesDir).filter(f => f.endsWith('-mode.json'));
    for (const file of modeFiles) {
      const modeName = file.replace('-mode.json', '');
      const modePath = path.join(modesDir, file);
      this.tokens.modes[modeName] = JSON.parse(fs.readFileSync(modePath, 'utf-8'));
    }

    // Load component tokens (components/component.json)
    const componentPath = path.join(this.dataDir, 'components', 'component.json');
    this.tokens.component = JSON.parse(fs.readFileSync(componentPath, 'utf-8'));

    // Load layout tokens (layouts/layout.json)
    const layoutPath = path.join(this.dataDir, 'layouts', 'layout.json');
    this.tokens.layout = JSON.parse(fs.readFileSync(layoutPath, 'utf-8'));
  }

  /**
   * Merges tokens according to the cascade: Layout → Component → Mode → Theme.
   * Returns the merged token object.
   */
  mergeTokens(): any {
    // For now, just return the loaded tokens as a structure for the resolver
    // (Merging logic can be expanded as needed)
    return {
      layout: this.tokens.layout,
      component: this.tokens.component,
      modes: this.tokens.modes,
      theme: this.tokens.theme,
    };
  }

  /**
   * Validates the merged token set for reference integrity and completeness.
   * Logs errors for missing/invalid references and cycles.
   */
  validateTokens(): void {
    const merged = this.mergeTokens();
    const resolver = {
      get: (path: string, mode: string) => {
        // Simple resolution for validation (no cycle detection here)
        let token = this.getTokenByPath(path, merged.layout)
          || this.getTokenByPath(path, merged.component)
          || this.getTokenByPath(path, merged.modes[mode])
          || this.getTokenByPath(path, merged.theme);
        return token;
      }
    };
    // Validate all component token paths
    const allPaths = Object.keys(merged.component).length ? this.extractAllPaths(merged.component) : [];
    const modes = Object.keys(merged.modes);
    for (const path of allPaths) {
      for (const mode of modes) {
        const token = resolver.get(path, mode);
        if (!token) {
          console.error(`[TokenValidationError] Missing token: ${path} in mode: ${mode}`);
        } else if (typeof token.$value === 'string' && token.$value.startsWith('{') && token.$value.endsWith('}')) {
          const refPath = token.$value.slice(1, -1);
          const refToken = resolver.get(refPath, mode);
          if (!refToken) {
            console.error(`[TokenValidationError] Invalid reference: ${token.$value} in ${path} (mode: ${mode})`);
          }
        }
      }
    }
    // TODO: Add cycle detection validation
  }

  private extractAllPaths(obj: any, prefix = ''): string[] {
    const paths: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object') {
        if ('$value' in value) {
          paths.push(currentPath);
        } else {
          paths.push(...this.extractAllPaths(value, currentPath));
        }
      }
    }
    return paths;
  }

  private getTokenByPath(pathStr: string, obj: any): any {
    if (!obj) return undefined;
    const parts = pathStr.split('.');
    let current = obj;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current && typeof current === 'object' && '$value' in current ? current : undefined;
  }
} 