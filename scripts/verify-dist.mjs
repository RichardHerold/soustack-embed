#!/usr/bin/env node

import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');

const requiredFiles = [
  'embed.es.js',
  'embed.umd.js'
];

const optionalFiles = [
  'index.d.ts'
];

let missing = [];
let hasOptional = false;

// Check required files
for (const file of requiredFiles) {
  const path = join(distDir, file);
  if (!existsSync(path)) {
    missing.push(file);
  }
}

// Check optional files
for (const file of optionalFiles) {
  const path = join(distDir, file);
  if (existsSync(path)) {
    hasOptional = true;
  }
}

if (missing.length > 0) {
  console.error('❌ Missing required dist files:');
  missing.forEach(file => console.error(`   - dist/${file}`));
  console.error('\nThis package vendors build artifacts from soustack-blocks.');
  console.error('Copy the dist/ directory from soustack-blocks/packages/embed/dist to this repo.');
  process.exit(1);
}

console.log('✅ All required dist files present:');
requiredFiles.forEach(file => console.log(`   ✓ dist/${file}`));
if (hasOptional) {
  optionalFiles.forEach(file => {
    const path = join(distDir, file);
    if (existsSync(path)) {
      console.log(`   ✓ dist/${file} (optional)`);
    }
  });
}

