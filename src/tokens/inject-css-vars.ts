import resolvedTokens from './tokens.resolved.json';

/**
 * Injects all resolved tokens as CSS variables on :root for the given mode.
 * @param mode Color mode (e.g., 'light', 'dark', 'hc-light', 'hc-dark')
 */
export function injectAllTokenCssVars(mode: string = 'light') {
  const cssVars = (resolvedTokens as any)['dive']?.[mode] || {};
  let style = document.getElementById('dive-token-css-vars') as HTMLStyleElement | null;
  if (style) style.remove();
  style = document.createElement('style');
  style.id = 'dive-token-css-vars';
  style.innerHTML = `:root {\n${Object.entries(cssVars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
  document.head.appendChild(style);
} 