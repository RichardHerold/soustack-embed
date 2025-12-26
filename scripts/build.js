const fs = require('fs');
const path = require('path');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const srcFile = path.join(root, 'src', 'soustack-embed.js');
const styleFile = path.join(root, 'src', 'styles.css');

function indent(text, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

function build() {
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const banner = `/*!\n * soustack-embed build file.\n * Generated on ${new Date().toISOString()}\n */\n`;
  const source = fs.readFileSync(srcFile, 'utf8');
  const style = fs.readFileSync(styleFile, 'utf8');

  fs.writeFileSync(path.join(distDir, 'soustack-embed.esm.js'), `${banner}${source}`);

  const cleaned = source
    .replace(/export default SoustackEmbed;?\n?/g, '')
    .replace(/export \{[^}]+\};?\n?/g, '')
    .trim();

  const umd = `${banner}(function (global, factory) {\n  if (typeof module === 'object' && typeof module.exports === 'object') {\n    module.exports = factory();\n  } else {\n    global.SoustackEmbed = factory();\n  }\n})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {\n${indent(cleaned, 2)}\n\n  return SoustackEmbed;\n});\n`;

  fs.writeFileSync(path.join(distDir, 'soustack-embed.umd.js'), umd);
  fs.writeFileSync(path.join(distDir, 'soustack-embed.css'), style);

  console.log('Built dist/soustack-embed.esm.js');
  console.log('Built dist/soustack-embed.umd.js');
  console.log('Copied dist/soustack-embed.css');
}

build();
