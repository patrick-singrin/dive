class TokenResolver {
  constructor({ componentTokens, modeTokens, themeTokens, tokenType }) {
    this.componentTokens = componentTokens;
    this.modeTokens = modeTokens;
    this.themeTokens = themeTokens;
    this.tokenType = tokenType;
    this.cache = new Map();
    this.resolvingStack = [];
  }

  resolveToken(pathArr, context = {}) {
    const cacheKey = pathArr.join('.');
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
    if (this.resolvingStack.includes(cacheKey)) {
      throw new Error(`Circular reference detected: ${[...this.resolvingStack, cacheKey].join(' -> ')}`);
    }
    this.resolvingStack.push(cacheKey);
    let value = this._getValueFromLayer(this.componentTokens, pathArr)
      || this._getValueFromLayer(this.modeTokens, pathArr)
      || this._getValueFromLayer(this.themeTokens, pathArr);
    if (!value) {
      this.resolvingStack.pop();
      throw new Error(`Unresolved token: ${cacheKey}\nContext: ${JSON.stringify(context, null, 2)}`);
    }
    if (typeof value === 'object' && value.$value) value = value.$value;
    if (typeof value === 'string' && value.match(/^\{(.+)\}$/)) {
      // Reference: {Some.Path}
      const refPath = value.slice(1, -1).split('.');
      value = this.resolveToken(refPath, context);
    }
    this.cache.set(cacheKey, value);
    this.resolvingStack.pop();
    return value;
  }

  _getValueFromLayer(layer, pathArr) {
    let obj = layer;
    for (const key of pathArr) {
      if (!obj || typeof obj !== 'object' || !(key in obj)) return undefined;
      obj = obj[key];
    }
    return obj;
  }
}

module.exports = { TokenResolver }; 