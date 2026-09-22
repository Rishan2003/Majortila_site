import { readFile, writeFile } from 'node:fs/promises'
// The production build remains a standard ES-module site.
// A classic-script copy also lets the owner review the same build by opening a file.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const local = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>').replace(/ crossorigin/g, '')
await writeFile(new URL('../dist/OPEN-WEBSITE.html', import.meta.url), local)
console.log('Created dist/OPEN-WEBSITE.html for local review.')
