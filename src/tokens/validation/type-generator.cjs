// src/tokens/validation/type-generator.ts
// Type Generator for Design Tokens (CommonJS version)
// Parses token JSON and outputs TypeScript types for token paths and value interfaces
/**
 * TokenTypeGenerator parses token JSON and generates TypeScript types for token paths and values.
 */
var TokenTypeGenerator = /** @class */ (function () {
    function TokenTypeGenerator() {
    }
    /**
     * Extracts all token paths from a nested token object.
     */
    TokenTypeGenerator.extractAllTokenPaths = function (obj, prefix) {
        if (prefix === void 0) { prefix = ''; }
        var paths = [];
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var currentPath = prefix ? "".concat(prefix, ".").concat(key) : key;
            if (value && typeof value === 'object') {
                if ('$value' in value) {
                    paths.push(currentPath);
                }
                else {
                    paths.push.apply(paths, this.extractAllTokenPaths(value, currentPath));
                }
            }
        }
        return paths;
    };
    /**
     * Generates the TypeScript types file content from token data.
     */
    TokenTypeGenerator.generateTypesFromJSON = function (tokenData) {
        var paths = this.extractAllTokenPaths(tokenData);
        return "// Auto-generated token types - DO NOT EDIT\nexport type ComponentTokenPaths =\n  ".concat(paths.map(function (p) { return "'".concat(p, "'"); }).join(' |\n  '), ";\n\nexport interface TokenValue {\n  $value: string;\n  $type: 'color' | 'number' | 'text';\n  $description?: string;\n  $extensions?: {\n    accessibility?: {\n      contrastRatio?: number;\n      wcagLevel?: 'AA' | 'AAA';\n    };\n    usage?: {\n      components?: string[];\n      deprecated?: boolean;\n    };\n  };\n}\n");
    };
    return TokenTypeGenerator;
}());
module.exports = { TokenTypeGenerator: TokenTypeGenerator };
