// Injects the server-rendered App into dist/index.html after `vite build`.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = resolve(root, 'dist/index.html')
const ssrDir = resolve(root, 'dist-ssr')

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const appHtml = render()

const template = readFileSync(indexPath, 'utf-8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
}
writeFileSync(indexPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`))
rmSync(ssrDir, { recursive: true, force: true })

console.log(`prerender: wrote ${appHtml.length} characters of HTML into dist/index.html`)
