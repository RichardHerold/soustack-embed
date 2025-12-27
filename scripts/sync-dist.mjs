#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');

// Parse command line arguments
const args = process.argv.slice(2);
let sourcePath = '../soustack-blocks/packages/embed/dist';

const fromIndex = args.indexOf('--from');
if (fromIndex !== -1 && args[fromIndex + 1]) {
  sourcePath = args[fromIndex + 1];
}

const sourceDir = resolve(root, sourcePath);

// Files to copy
const requiredFiles = [
  'embed.es.js',
  'embed.umd.js'
];

const optionalFiles = [
  'index.d.ts'
];

console.log(`📦 Syncing dist artifacts from: ${sourceDir}`);
console.log(`   to: ${distDir}\n`);

// Check source directory exists
if (!existsSync(sourceDir)) {
  console.error(`❌ Source directory not found: ${sourceDir}`);
  console.error('\nExpected layout:');
  console.error('  ../soustack-blocks/packages/embed/dist');
  console.error('\nOr specify a custom path:');
  console.error('  npm run sync:dist -- --from /path/to/soustack-blocks/packages/embed/dist');
  process.exit(1);
}

// Check if source is a directory
try {
  const stat = statSync(sourceDir);
  if (!stat.isDirectory()) {
    console.error(`❌ Source path is not a directory: ${sourceDir}`);
    process.exit(1);
  }
} catch (err) {
  console.error(`❌ Error accessing source directory: ${err.message}`);
  process.exit(1);
}

// Create dist directory if missing
if (!existsSync(distDir)) {
  console.log(`📁 Creating dist directory: ${distDir}`);
  mkdirSync(distDir, { recursive: true });
}

// Copy required files
let copied = 0;
let missing = [];

for (const file of requiredFiles) {
  const sourceFile = join(sourceDir, file);
  const destFile = join(distDir, file);
  
  if (!existsSync(sourceFile)) {
    console.error(`⚠️  Missing required file: ${file}`);
    missing.push(file);
    continue;
  }
  
  console.log(`📋 Copying: ${file}`);
  copyFileSync(sourceFile, destFile);
  copied++;
}

// Copy optional files
for (const file of optionalFiles) {
  const sourceFile = join(sourceDir, file);
  const destFile = join(distDir, file);
  
  if (existsSync(sourceFile)) {
    console.log(`📋 Copying: ${file} (optional)`);
    copyFileSync(sourceFile, destFile);
    copied++;
  } else {
    console.log(`⏭️  Skipping: ${file} (not present in source)`);
  }
}

console.log(`\n✅ Copied ${copied} file(s)`);

if (missing.length > 0) {
  console.error(`\n❌ Missing required files in source:`);
  missing.forEach(file => console.error(`   - ${file}`));
  console.error('\nMake sure soustack-blocks is built:');
  console.error('  cd ../soustack-blocks && npm run build');
  process.exit(1);
}

console.log('\n✨ Sync complete! Run `npm run verify:dist` to verify.');

