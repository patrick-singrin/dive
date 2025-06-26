const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Utility to convert kebab-case or PascalCase to camelCase
function toCamelCase(str) {
  return str
    .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
    .replace(/^(.)/, (m) => m.toLowerCase());
}

const componentsDir = path.join(__dirname, '../src/components');
const pattern = path.join(componentsDir, '**/*.css');

const files = glob.sync(pattern, { ignore: '**/*.styles.ts' });

files.forEach((cssPath) => {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const dir = path.dirname(cssPath);
  const base = path.basename(cssPath, '.css');
  const exportName = toCamelCase(base) + 'Styles';
  const outPath = path.join(dir, `${base}.styles.ts`);

  const tsContent = `import { css } from 'lit';

export const ${exportName} = css\`
${cssContent}
\`;
`;
  fs.writeFileSync(outPath, tsContent);
  console.log(`Generated: ${outPath} (export: ${exportName})`);
});

if (files.length === 0) {
  console.log('No CSS files found in components directory.');
} 