import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const originals = path.resolve('public/assets')
const optimized = path.resolve('public/assets-optimized')
const imageExtension = /\.(jpe?g|png)$/i

// The UI resolves these originals to WebP URLs. Fail before shipping a
// page that would request a missing file.
const missing = readdirSync(originals, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && imageExtension.test(entry.name))
  .map((entry) => path.relative(originals, path.join(entry.parentPath, entry.name)))
  .map((relative) => path.join(optimized, relative.replace(imageExtension, '.webp')))
  .filter((filename) => !statSync(filename, { throwIfNoEntry: false })?.size)
  .map((filename) => path.relative(process.cwd(), filename))

if (missing.length) {
  console.error(`Missing or empty WebP files:\n${missing.sort().join('\n')}\nRun pnpm optimize-images and include the generated files.`)
  process.exitCode = 1
}
