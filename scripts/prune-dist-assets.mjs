import fs from 'node:fs/promises'
import path from 'node:path'

const distAssets = path.resolve('dist/assets')
const copiedSourceImages = [
  'gallery',
  'projects',
  'small-ideas',
  'paper-texture.jpg',
  'profile.jpg',
]

await Promise.all(copiedSourceImages.map((entry) => (
  fs.rm(path.join(distAssets, entry), { recursive: true, force: true })
)))

console.log('Removed unreferenced source images from dist/assets')
