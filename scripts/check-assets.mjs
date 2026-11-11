// Checks the artwork this public repository publishes. Run it before every change to assets/:
//   node scripts/check-assets.mjs
// It fails when
//   1. a vector or layered master is present (an SVG or a design file can be re-used at any size and re-coloured in
//      seconds; this repository publishes finished pictures only, and the masters stay private), or
//   2. a PNG does not say inside the file whose it is (the Copyright text every published picture carries).
// No dependency: Node 18 or newer.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OWNER = 'Arobi Technology Alliance';
const MASTER_FILE = /\.(svg|svgz|ai|eps|pdf|psd|fig|sketch|xd|afdesign|afphoto|cdr|indd|xcf|kra|blend)$/i;

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

/** The text entries inside a PNG (tEXt and uncompressed iTXt chunks) as { keyword: value }. */
function pngText(buffer) {
  const text = {};
  if (buffer.length < 8 || buffer.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG file');
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('latin1', offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    const split = data.indexOf(0);
    if (type === 'tEXt' && split > 0) {
      text[data.toString('latin1', 0, split)] = data.toString('latin1', split + 1);
    } else if (type === 'iTXt' && split > 0 && data[split + 1] === 0) {
      let cursor = data.indexOf(0, split + 3) + 1;
      cursor = data.indexOf(0, cursor) + 1;
      text[data.toString('latin1', 0, split)] = data.toString('utf8', cursor);
    }
    if (type === 'IEND') break;
    offset += 12 + length;
  }
  return text;
}

const problems = [];
const files = listFiles(ROOT);
for (const file of files) {
  const shown = file.slice(ROOT.length + 1).replace(/\\/g, '/');
  if (MASTER_FILE.test(file)) {
    problems.push(`${shown}: a vector or layered master. Publish a PNG of it and keep the master private.`);
  } else if (/\.png$/i.test(file)) {
    let copyright = '';
    try {
      copyright = pngText(readFileSync(file)).Copyright ?? '';
    } catch (error) {
      problems.push(`${shown}: ${error.message}`);
      continue;
    }
    if (!copyright.includes(OWNER)) problems.push(`${shown}: no Copyright text naming ${OWNER} inside the file.`);
  }
}

const pictures = files.filter(file => /\.png$/i.test(file)).length;
if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) in ${pictures} picture(s).`);
  process.exit(1);
}
console.log(`${pictures} pictures, each names its owner inside the file; no vector or layered master is published.`);
