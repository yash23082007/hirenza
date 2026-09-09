import fs from 'fs';
import path from 'path';

// Find the main compiled CSS file in .next/static/css
function findCssFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findCssFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      results.push(fullPath);
    }
  }
  return results;
}

const staticDir = path.join('.next', 'static');
const cssFiles = findCssFiles(staticDir);

if (cssFiles.length === 0) {
  console.log('No compiled CSS found in .next/static. Please run "npm run build" first.');
  process.exit(1);
}

const combinedCss = cssFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const criticalSelectors = [
  '.text-primary',
  '.text-secondary',
  '.text-muted',
  '.bg-primary',
];

for (const sel of criticalSelectors) {
  if (!combinedCss.includes(sel)) {
    console.error(`Missing critical selector in compiled CSS: ${sel}`);
    process.exit(1);
  }
}

console.log('Class audit passed: All critical design tokens and selectors present in compiled CSS.');
process.exit(0);
