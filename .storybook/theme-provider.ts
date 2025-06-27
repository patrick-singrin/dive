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

  // Inject Storybook UI background styles using design system tokens
  const storybookBgStyleId = 'storybook-design-system-background';
  let storybookBgStyle = document.getElementById(storybookBgStyleId) as HTMLStyleElement | null;
  if (!storybookBgStyle) {
    storybookBgStyle = document.createElement('style');
    storybookBgStyle.id = storybookBgStyleId;
    document.head.appendChild(storybookBgStyle);
  }
  
  // Use design system background variables with fallbacks
  const lightBg = mode === 'light' || mode === 'hc-light' ? '#ffffff' : '#000000';
  const subtleBg = mode === 'light' || mode === 'hc-light' ? '#ecedf0' : '#101318';
  
  storybookBgStyle.textContent = `
    /* Set CSS custom properties for Storybook theming */
    :root {
      --sb-bg-primary: var(--Color-Base-Background-default, ${lightBg});
      --sb-bg-subtle: var(--Color-Base-Subtle-Background-default, ${subtleBg});
      --sb-text-primary: var(--Color-Base-Foreground-default, ${mode === 'light' || mode === 'hc-light' ? '#1d222c' : '#c7cad1'});
      --sb-text-subtle: var(--Color-Base-Subtle-Foreground-default, ${mode === 'light' || mode === 'hc-light' ? '#31394a' : '#7b8394'});
    }
    
    /* Storybook Manager UI (sidebar, toolbar, etc.) */
    #storybook-root,
    #storybook-root > div,
    .sidebar-container,
    [data-side="left"],
    .css-1ksm81t,
    .css-1m1ak26,
    .css-79hbkx,
    .css-1cj58qf {
      background: var(--sb-bg-primary) !important;
      color: var(--sb-text-primary) !important;
      transition: background 0.2s, color 0.2s;
    }
    
    /* Main content area and canvas */
    body,
    .css-1cvjpgl,
    .sbdocs-wrapper,
    .sbdocs-content,
    .sb-show-main {
      background: var(--sb-bg-primary) !important;
      color: var(--sb-text-primary) !important;
      transition: background 0.2s, color 0.2s;
    }
    
    /* Story canvas specific (where components render) */
    .sb-main-padded,
    #storybook-preview-iframe {
      background: var(--sb-bg-primary) !important;
      transition: background 0.2s;
    }
    
    /* Sidebar and navigation elements */
    .sidebar-item,
    .sidebar-item button,
    .css-1m1ak26 span,
    .css-1ksm81t span {
      color: var(--sb-text-primary) !important;
    }
    
    /* Controls panel */
    .docblock-argstable,
    .docblock-argstable th,
    .docblock-argstable td {
      background: var(--sb-bg-primary) !important;
      color: var(--sb-text-primary) !important;
      border-color: var(--sb-text-subtle) !important;
    }
    
    /* Ensure docs page also gets themed */
    .docs-story {
      background: var(--sb-bg-primary) !important;
    }
  `;
  return Story();
}; 