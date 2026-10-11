import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceRoot = path.resolve('public/assets')
const outputRoot = path.resolve('public/assets-optimized')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png'])

async function collectImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectImages(absolutePath))
    else if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) files.push(absolutePath)
  }
  return files
}

const images = await collectImages(sourceRoot)
await Promise.all(images.map(async (sourcePath) => {
  const relativePath = path.relative(sourceRoot, sourcePath)
  const outputPath = path.join(outputRoot, relativePath.replace(/\.(jpe?g|png)$/i, '.webp'))
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await sharp(sourcePath).webp({ quality: 84, effort: 5 }).toFile(outputPath)
}))

console.log(`Optimized ${images.length} images into ${path.relative(process.cwd(), outputRoot)}`)
