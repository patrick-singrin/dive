"use strict";
// src/tokens/processor.ts
// Token Processor: Loads and merges token JSON files according to cascading rules
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProcessor = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * TokenProcessor loads and merges tokens from all layers (theme, mode, component, layout)
 * according to the strict cascading structure.
 */
var TokenProcessor = /** @class */ (function () {
    function TokenProcessor() {
        this.dataDir = path_1.default.resolve(__dirname, './data');
        this.tokens = { theme: {}, modes: {}, component: {}, layout: {} };
        // Optionally, load tokens on construction
    }
    /**
     * Loads all token JSON files from the data directory.
     */
    TokenProcessor.prototype.loadAllTokens = function () {
        // Load theme (brand-theme/dive-theme.json)
        var themePath = path_1.default.join(this.dataDir, 'brand-theme', 'dive-theme.json');
        this.tokens.theme = JSON.parse(fs_1.default.readFileSync(themePath, 'utf-8'));
        // Load modes (color-modes/*.json)
        var modesDir = path_1.default.join(this.dataDir, 'color-modes');
        var modeFiles = fs_1.default.readdirSync(modesDir).filter(function (f) { return f.endsWith('-mode.json'); });
        for (var _i = 0, modeFiles_1 = modeFiles; _i < modeFiles_1.length; _i++) {
            var file = modeFiles_1[_i];
            var modeName = file.replace('-mode.json', '');
            var modePath = path_1.default.join(modesDir, file);
            this.tokens.modes[modeName] = JSON.parse(fs_1.default.readFileSync(modePath, 'utf-8'));
        }
        // Load component tokens (components/component.json)
        var componentPath = path_1.default.join(this.dataDir, 'components', 'component.json');
        this.tokens.component = JSON.parse(fs_1.default.readFileSync(componentPath, 'utf-8'));
        // Load layout tokens (layouts/layout.json)
        var layoutPath = path_1.default.join(this.dataDir, 'layouts', 'layout.json');
        this.tokens.layout = JSON.parse(fs_1.default.readFileSync(layoutPath, 'utf-8'));
    };
    /**
     * Merges tokens according to the cascade: Layout → Component → Mode → Theme.
     * Returns the merged token object.
     */
    TokenProcessor.prototype.mergeTokens = function () {
        // For now, just return the loaded tokens as a structure for the resolver
        // (Merging logic can be expanded as needed)
        return {
            layout: this.tokens.layout,
            component: this.tokens.component,
            modes: this.tokens.modes,
            theme: this.tokens.theme,
        };
    };
    /**
     * Validates the merged token set for reference integrity and completeness.
     */
    TokenProcessor.prototype.validateTokens = function () {
        // TODO: Implement validation logic
    };
    return TokenProcessor;
}());
exports.TokenProcessor = TokenProcessor;
