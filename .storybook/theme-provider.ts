export const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme || 'dive-theme';
  const mode = context.globals.mode || 'light';
  document.documentElement.setAttribute('data-theme', mode);
  document.documentElement.setAttribute('data-theme-name', theme);
  document.documentElement.setAttribute('data-mode', `${mode}-mode`);
  // Dynamically import the CSS variable injector to avoid circular deps
  import('../src/tokens/inject-css-vars').then(({ injectAllTokenCssVars }) => {
    injectAllTokenCssVars(mode);
  });

  // Inject canvas/card and full background style using the design token
  const canvasStyleId = 'storybook-canvas-token-bg-style';
  let canvasStyle = document.getElementById(canvasStyleId) as HTMLStyleElement | null;
  if (!canvasStyle) {
    canvasStyle = document.createElement('style');
    canvasStyle.id = canvasStyleId;
    document.head.appendChild(canvasStyle);
  }
  canvasStyle.textContent = `
    body {
      background: #fff !important;
    }
    .css-1cvjpgl {
      background: var(--Color-Components-Base-Background-Default, #fff) !important;
      transition: background 0.2s;
    }
  `;
  return Story();
}; 