"use strict";
// src/tokens/resolver.ts
// Token Resolver: Resolves tokens with type safety and cycle detection
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenResolver = void 0;
/**
 * TokenResolver provides type-safe resolution of tokens with cycle detection and error handling.
 */
var TokenResolver = /** @class */ (function () {
    function TokenResolver(mergedTokens) {
        this.tokens = mergedTokens;
    }
    /**
     * Resolves a token path to its final value, with cycle detection.
     */
    TokenResolver.prototype.resolve = function (tokenPath, mode) {
        if (mode === void 0) { mode = 'light'; }
        return this.resolveWithCycleDetection(tokenPath, mode, new Set());
    };
    /**
     * Recursively resolves a token path through the cascade, with cycle detection.
     */
    TokenResolver.prototype.resolveWithCycleDetection = function (tokenPath, mode, visited) {
        if (visited.has(tokenPath)) {
            throw new Error("Circular reference detected: ".concat(Array.from(visited).concat(tokenPath).join(' -> ')));
        }
        visited.add(tokenPath);
        // Try to resolve from layout, then component, then mode, then theme
        var token = this.getTokenByPath(tokenPath, this.tokens.layout)
            || this.getTokenByPath(tokenPath, this.tokens.component)
            || this.getTokenByPath(tokenPath, this.tokens.modes[mode])
            || this.getTokenByPath(tokenPath, this.tokens.theme);
        if (!token)
            return undefined;
        // If token is a reference (e.g., { $value: '{Color.Base.Background.default}' }), resolve recursively
        if (typeof token.$value === 'string' && token.$value.startsWith('{') && token.$value.endsWith('}')) {
            var refPath = token.$value.slice(1, -1);
            return this.resolveWithCycleDetection(refPath, mode, visited);
        }
        return token;
    };
    /**
     * Utility to get a token by dot-separated path from a token object.
     */
    TokenResolver.prototype.getTokenByPath = function (pathStr, obj) {
        if (!obj)
            return undefined;
        var parts = pathStr.split('.');
        var current = obj;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (current && typeof current === 'object' && part in current) {
                current = current[part];
            }
            else {
                return undefined;
            }
        }
        // Only return if it's a token (has $value)
        return current && typeof current === 'object' && '$value' in current ? current : undefined;
    };
    /**
     * Detects cycles in token references.
     */
    TokenResolver.prototype.detectCycles = function () {
        // TODO: Implement cycle detection logic for all tokens
        return [];
    };
    /**
     * Handles errors and provides helpful debugging information.
     */
    TokenResolver.prototype.handleError = function (error) {
        // TODO: Implement error handling
    };
    return TokenResolver;
}());
exports.TokenResolver = TokenResolver;
