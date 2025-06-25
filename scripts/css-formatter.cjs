function toCssVarName(pathArr) {
  // Replace spaces with hyphens, preserve case, join with '-'
  return '--' + pathArr.map(p => p.replace(/\s+/g, '-')).join('-');
}

function formatCssValue(value, type) {
  if (type === 'color') return value; // Assume hex or valid CSS color
  if (type === 'number') return value.toString().match(/px|em|rem|%|vw|vh|pt|cm|mm|in|ex|ch|vmin|vmax|fr$/) ? value : value + 'px';
  return value;
}

function generateModeSelector(mode) {
  return `[data-mode="${mode}"]`;
}

module.exports = {
  toCssVarName,
  formatCssValue,
  generateModeSelector,
}; 