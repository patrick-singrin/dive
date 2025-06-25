// src/tokens/resolver.ts
// Token Resolver: Resolves tokens with type safety and cycle detection

import type { ComponentTokenPaths, TokenValue } from './types';
import { TokenValidationError } from './processor';

/**
 * TokenResolver provides type-safe resolution of tokens with cycle detection and error handling.
 */
export class TokenResolver {
  private tokens: any;
  constructor(mergedTokens: any) {
    this.tokens = mergedTokens;
  }

  /**
   * Resolves a token path to its final value, with cycle detection.
   */
  resolve<T extends ComponentTokenPaths>(tokenPath: T, mode: string = 'light'): TokenValue | undefined {
    return this.resolveWithCycleDetection(tokenPath, mode, new Set());
  }

  /**
   * Recursively resolves a token path through the cascade, with cycle detection.
   */
  private resolveWithCycleDetection(tokenPath: string, mode: string, visited: Set<string>): TokenValue | undefined {
    if (visited.has(tokenPath)) {
      throw new TokenValidationError(`Circular reference detected: ${Array.from(visited).concat(tokenPath).join(' -> ')}`, tokenPath);
    }
    visited.add(tokenPath);

    // Try to resolve from layout, then component, then mode, then theme
    let token = this.getTokenByPath(tokenPath, this.tokens.layout)
      || this.getTokenByPath(tokenPath, this.tokens.component)
      || this.getTokenByPath(tokenPath, this.tokens.modes[mode])
      || this.getTokenByPath(tokenPath, this.tokens.theme);

    if (!token) {
      throw new TokenValidationError(`Token not found: ${tokenPath} (mode: ${mode})`, tokenPath);
    }

    // If token is a reference (e.g., { $value: '{Color.Base.Background.default}' }), resolve recursively
    if (typeof token.$value === 'string' && token.$value.startsWith('{') && token.$value.endsWith('}')) {
      const refPath = token.$value.slice(1, -1);
      return this.resolveWithCycleDetection(refPath, mode, visited);
    }

    return token;
  }

  /**
   * Utility to get a token by dot-separated path from a token object.
   */
  private getTokenByPath(pathStr: string, obj: any): TokenValue | undefined {
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
    // Only return if it's a token (has $value)
    return current && typeof current === 'object' && '$value' in current ? current : undefined;
  }

  /**
   * Detects cycles in token references.
   */
  detectCycles(): string[][] {
    // TODO: Implement cycle detection logic for all tokens
    return [];
  }

  /**
   * Handles errors and provides helpful debugging information.
   */
  handleError(error: Error): void {
    // TODO: Implement error handling
  }

  /**
   * Resolves any token path (string) to its final value, with cycle detection. For utilities.
   */
  resolveAny(tokenPath: string, mode: string = 'light'): TokenValue | undefined {
    return this.resolveWithCycleDetection(tokenPath, mode, new Set());
  }
} 