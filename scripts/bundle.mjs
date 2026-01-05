import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = process.argv[2];
if (!distDir) {
  console.error('Use: node scripts/bundle.mjs dist/<app>/browser');
  process.exit(1);
}

const files = readdirSync(distDir)
  .filter((f) => f.endsWith('.js'))
  .sort((a, b) => {
    const score = (name) =>
      name.startsWith('polyfills')
        ? 0
        : name.startsWith('runtime')
        ? 1
        : name.startsWith('main')
        ? 2
        : 3;
    return score(a) - score(b);
  });

const out = files.map((f) => readFileSync(join(distDir, f), 'utf8')).join('\n;\n');

writeFileSync(join(distDir, 'mfe-angular.js'), out, 'utf8');
console.log('✅ Gerado:', join(distDir, 'mfe-angular.js'));
