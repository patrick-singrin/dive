const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const { readJson, writeCssFile, ensureDir, logInfo, logSuccess, logError } = require('./file-utils.cjs');
const { TokenResolver } = require('./token-resolver.cjs');
const { toCssVarName, formatCssValue, generateModeSelector } = require('./css-formatter.cjs');
const { performance } = require('perf_hooks');

const TOKENS_DIR = path.join(__dirname, '../src/tokens/data');
const OUTPUT_BASE = path.join(__dirname, '../src/tokens/css-vars');

// NOTE: Layout CSS variable generation is currently disabled.
// To enable, uncomment the layout token set in the tokenSets array below.
// See the initial requirements for layout support and ensure all references in layout.json are resolvable through the mode and theme layers.

function parseArgs() {
  return minimist(process.argv.slice(2), {
    boolean: ['dry-run', 'verbose', 'watch'],
    string: ['theme', 'output-dir'],
    default: { 'output-dir': OUTPUT_BASE },
  });
}

function discoverThemes() {
  const themesDir = path.join(TOKENS_DIR, 'brand-theme');
  return fs.readdirSync(themesDir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}

function discoverModes() {
  const modesDir = path.join(TOKENS_DIR, 'color-modes');
  return fs.readdirSync(modesDir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}

function processTokenSet({ theme, mode, tokenSet, tokenSetName, outputDir, dryRun, verbose }) {
  const themeTokens = readJson(path.join(TOKENS_DIR, 'brand-theme', `${theme}.json`));
  const modeTokens = readJson(path.join(TOKENS_DIR, 'color-modes', `${mode}.json`));
  const resolver = new TokenResolver({
    componentTokens: tokenSet,
    modeTokens,
    themeTokens,
    tokenType: tokenSetName,
  });
  const cssLines = [];
  function walk(obj, pathArr = []) {
    for (const key in obj) {
      if (key === '$type' || key === '$value') continue;
      if (typeof obj[key] === 'object' && ('$value' in obj[key])) {
        const type = obj[key].$type;
        let value;
        try {
          value = resolver.resolveToken([...pathArr, key]);
        } catch (err) {
          logError(err.message);
          value = '/* unresolved */';
        }
        cssLines.push(`  ${toCssVarName([...pathArr, key])}: ${formatCssValue(value, type)};`);
      } else if (typeof obj[key] === 'object') {
        walk(obj[key], [...pathArr, key]);
      }
    }
  }
  walk(tokenSet);
  const selector = generateModeSelector(mode);
  return `${selector} {\n${cssLines.join('\n')}\n}`;
}

function main() {
  const startTime = performance.now();
  const args = parseArgs();
  const dryRun = args['dry-run'];
  const verbose = args['verbose'];
  const outputBase = args['output-dir'] || OUTPUT_BASE;
  const themes = args.theme ? [args.theme] : discoverThemes();
  const modes = discoverModes();
  const tokenSets = [
    { name: 'component', file: path.join(TOKENS_DIR, 'components', 'component.json') },
    // { name: 'layout', file: path.join(TOKENS_DIR, 'layouts', 'layout.json') }, // Skip layout for now
  ];

  let filesWritten = [];
  let totalVariables = 0;
  let unresolvedTokens = 0;
  let duplicateVars = 0;
  const perFileVarCounts = {};

  for (const theme of themes) {
    logInfo(`Processing theme: ${theme}`);
    const themeDir = path.join(outputBase, theme);
    ensureDir(themeDir);
    for (const { name: tokenSetName, file: tokenSetFile } of tokenSets) {
      logInfo(`  Token set: ${tokenSetName}`);
      let tokenSet;
      try {
        tokenSet = readJson(tokenSetFile);
      } catch (err) {
        logError(err.message);
        continue;
      }
      const cssBlocks = [];
      let fileVarCount = 0;
      let modeDuplicateVars = 0;
      for (const mode of modes) {
        // Collect variable names for this mode
        const themeTokens = readJson(path.join(TOKENS_DIR, 'brand-theme', `${theme}.json`));
        const modeTokens = readJson(path.join(TOKENS_DIR, 'color-modes', `${mode}.json`));
        const resolver = new TokenResolver({
          componentTokens: tokenSet,
          modeTokens,
          themeTokens,
          tokenType: tokenSetName,
        });
        const cssLines = [];
        const modeVarNames = new Set();
        function walk(obj, pathArr = []) {
          for (const key in obj) {
            if (key === '$type' || key === '$value') continue;
            if (typeof obj[key] === 'object' && ('$value' in obj[key])) {
              const type = obj[key].$type;
              let value;
              let unresolved = false;
              try {
                value = resolver.resolveToken([...pathArr, key]);
              } catch (err) {
                logError(err.message);
                value = '/* unresolved */';
                unresolved = true;
                unresolvedTokens++;
              }
              const varName = toCssVarName([...pathArr, key]);
              if (modeVarNames.has(varName)) {
                modeDuplicateVars++;
              }
              modeVarNames.add(varName);
              cssLines.push(`  ${varName}: ${formatCssValue(value, type)};`);
              if (!unresolved) {
                fileVarCount++;
              }
            } else if (typeof obj[key] === 'object') {
              walk(obj[key], [...pathArr, key]);
            }
          }
        }
        walk(tokenSet);
        const selector = generateModeSelector(mode);
        cssBlocks.push(`${selector} {\n${cssLines.join('\n')}\n}`);
      }
      const cssContent = `/* ${theme}/${tokenSetName}.css */\n\n${cssBlocks.join('\n\n')}`;
      const outFile = path.join(themeDir, `${tokenSetName}.css`);
      writeCssFile(outFile, cssContent, { dryRun });
      filesWritten.push(outFile);
      perFileVarCounts[outFile] = fileVarCount;
      totalVariables += fileVarCount;
      duplicateVars += modeDuplicateVars;
    }
    // Write index.css for theme
    const indexContent = tokenSets.map(ts => `@import './${ts.name}.css';`).join('\n');
    const themeIndexFile = path.join(themeDir, 'index.css');
    writeCssFile(themeIndexFile, indexContent, { dryRun });
    filesWritten.push(themeIndexFile);
  }
  // Write global index.css
  const globalIndexFile = path.join(outputBase, 'index.css');
  const globalIndex = themes.map(t => `@import './${t}/index.css';`).join('\n');
  writeCssFile(globalIndexFile, globalIndex, { dryRun });
  filesWritten.push(globalIndexFile);

  const endTime = performance.now();
  const timeSec = ((endTime - startTime) / 1000).toFixed(2);

  // User-friendly status summary
  logSuccess('--- CSS Variable Generation Complete ---');
  logInfo(`Themes processed: ${themes.length} (${themes.join(', ')})`);
  logInfo(`Modes processed: ${modes.join(', ')}`);
  logInfo(`Token sets: ${tokenSets.map(ts => ts.name).join(', ')}`);
  logInfo('Files written:');
  filesWritten.forEach(f => {
    logInfo(`  - ${f} (${perFileVarCounts[f] !== undefined ? perFileVarCounts[f] + ' variables' : ''})`);
  });
  logInfo(`Total CSS variables generated: ${totalVariables}`);
  logInfo(`Unresolved tokens: ${unresolvedTokens}`);
  logInfo(`Duplicate variables: ${duplicateVars}`);
  logInfo('');
  logInfo('Sample usage:');
  logInfo(`  @import 'src/tokens/css-vars/${themes[0]}/index.css';`);
  logInfo('  .my-class { background: var(--Color-Primary-Background-default); }');
  logInfo('');
  if (tokenSets.length === 1) {
    logInfo('Layout CSS variable generation is currently disabled. To enable, see the comment at the top of this script.');
  }
  logInfo(`Total time: ${timeSec}s`);

  // Generate Storybook theme registration file if no errors
  const themeManifestPath = path.join(outputBase, 'themes.mjs');
  if (unresolvedTokens === 0 && duplicateVars === 0) {
    const themeObjs = themes.map(theme => ({
      name: theme,
      modes,
      css: `src/tokens/css-vars/${theme}/index.css`
    }));
    const manifest = `// Auto-generated by generate-css-variables.cjs\nexport const themes = ${JSON.stringify(themeObjs, null, 2)};\n`;
    fs.writeFileSync(themeManifestPath, manifest, 'utf-8');
    logSuccess(`Storybook theme manifest written: ${themeManifestPath}`);
  } else {
    logError('Theme manifest not generated due to unresolved or duplicate tokens. Fix errors and re-run.');
  }
}

main();
// TODO: Watch mode, advanced validation, performance, logging, etc. 