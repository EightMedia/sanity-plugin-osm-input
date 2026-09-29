import { readFileSync } from 'node:fs';

/**
 * Fail if `package.json` version and the top `## [x.y.z]` entry in CHANGELOG.md
 * disagree. Keeps the semver workflow in CLAUDE.md honest. Run in CI and via
 * prepublishOnly.
 */
const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const changelog = readFileSync(new URL('CHANGELOG.md', root), 'utf8');

const match = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
if (!match) {
  console.error('✗ No "## [x.y.z]" version heading found in CHANGELOG.md');
  process.exit(1);
}

const changelogVersion = match[1];
if (changelogVersion !== pkg.version) {
  console.error(
    `✗ Version mismatch: package.json is ${pkg.version} but the top ` +
      `CHANGELOG.md entry is ${changelogVersion}.\n` +
      '  Bump one to match the other (see CLAUDE.md).',
  );
  process.exit(1);
}

console.log(`✓ package.json and CHANGELOG.md agree on ${pkg.version}`);
