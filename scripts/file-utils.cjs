const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}\nSuggestion: Create this file with the expected structure.`);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${filePath}: ${err.message}\nCheck for missing commas or braces.`);
    }
    throw err;
  }
}

function ensureDir(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    throw new Error(`Failed to create directory: ${dirPath}\n${err.message}`);
  }
}

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = filePath + '.bak';
    fs.copyFileSync(filePath, backupPath);
  }
}

function writeCssFile(filePath, content, { dryRun = false } = {}) {
  ensureDir(path.dirname(filePath));
  if (dryRun) {
    logInfo(`[Dry Run] Would write: ${filePath}`);
    return;
  }
  backupFile(filePath);
  fs.writeFileSync(filePath, content, 'utf-8');
  logSuccess(`Wrote: ${filePath}`);
}

function logInfo(msg) {
  console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`);
}
function logSuccess(msg) {
  console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`);
}
function logError(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
}

module.exports = {
  readJson,
  writeCssFile,
  ensureDir,
  backupFile,
  logInfo,
  logSuccess,
  logError,
}; 