// src/tokens/validation/type-generator.ts
// Type Generator for Design Tokens (CommonJS version)
// Parses token JSON and outputs TypeScript types for token paths and value interfaces

/**
 * TokenTypeGenerator parses token JSON and generates TypeScript types for token paths and values.
 */
class TokenTypeGenerator {
  /**
   * Extracts all token paths from a nested token object.
   */
  static extractAllTokenPaths(obj: Record<string, any>, prefix: string = ''): string[] {
    const paths: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object') {
        if ('$value' in value) {
          paths.push(currentPath);
        } else {
          paths.push(...this.extractAllTokenPaths(value, currentPath));
        }
      }
    }
    return paths;
  }

  /**
   * Generates the TypeScript types file content from token data.
   */
  static generateTypesFromJSON(tokenData: Record<string, any>): string {
    const paths = this.extractAllTokenPaths(tokenData);
    return `// Auto-generated token types - DO NOT EDIT\nexport type ComponentTokenPaths =\n  ${paths.map((p: string) => `'${p}'`).join(' |\n  ')};\n\nexport interface TokenValue {\n  $value: string;\n  $type: 'color' | 'number' | 'text';\n  $description?: string;\n  $extensions?: {\n    accessibility?: {\n      contrastRatio?: number;\n      wcagLevel?: 'AA' | 'AAA';\n    };\n    usage?: {\n      components?: string[];\n      deprecated?: boolean;\n    };\n  };\n}\n`;
  }
}

module.exports = { TokenTypeGenerator }; 