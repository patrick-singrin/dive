import { css } from 'lit';

export const componentColorsStyles = css`
.color-showcase {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 32px 16px;
  background: var(--Color-Base-Background-default);
  color: var(--Color-Base-Foreground-default);
  min-height: 100vh;
  max-width: 100vw;
  width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;
}
.category {
  margin-bottom: 48px;
}
.category-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-spacing-2);
  color: var(--Color-Base-Foreground-default);
  border-bottom: var(--border-border-width-default) solid var(--Color-Base-Border-default);
  padding-bottom: 8px;
}
.subcategory {
  margin-bottom: 32px;
}
.subcategory-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--Color-Base-Subtle-Foreground-default);
}
.modern-color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  margin-bottom: 8px;
}
.modern-color-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-border-radius-md) !important;
  outline: 1px solid var(--Color-Base-Border-default);
  overflow: hidden;
  box-shadow: none;
  background: #fff;
  min-width: 0;
  transition: outline 0.2s;
}
.modern-color-card:hover {
  box-shadow: none;
}
.modern-color-swatch {
  height: 90px;
  width: 100%;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  transition: background 0.2s;
}
.modern-color-footer {
  background: #fff;
  padding: 12px 16px 10px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.modern-color-label {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
}
.modern-color-value {
  font-family: monospace;
  font-size: 0.95rem;
  color: #888;
}
.modern-color-var {
  font-family: monospace;
  font-size: 0.8rem;
  color: #bbb;
  word-break: break-all;
}
@media (max-width: 768px) {
  .modern-color-grid {
    grid-template-columns: 1fr;
  }
} 
`;
