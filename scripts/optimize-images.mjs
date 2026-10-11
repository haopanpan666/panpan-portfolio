import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceRoot = path.resolve('public/assets')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const variants = [
  { directory: 'public/assets-optimized', maxDimension: 2048, quality: 80 },
  { directory: 'public/assets-display', maxDimension: 1280, quality: 76 },
]

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

for (const variant of variants) {
  const outputRoot = path.resolve(variant.directory)
  await fs.rm(outputRoot, { recursive: true, force: true })

  let cursor = 0
  const workers = Array.from({ length: Math.min(6, images.length) }, async () => {
    while (cursor < images.length) {
      const sourcePath = images[cursor]
      cursor += 1
      const relativePath = path.relative(sourceRoot, sourcePath)
      const outputPath = path.join(outputRoot, relativePath.replace(/\.(jpe?g|png)$/i, '.webp'))
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await sharp(sourcePath)
        .rotate()
        .resize({
          width: variant.maxDimension,
          height: variant.maxDimension,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: variant.quality, effort: 6, smartSubsample: true })
        .toFile(outputPath)
    }
  })

  await Promise.all(workers)
  const outputFiles = await collectImages(outputRoot).catch(() => [])
  const totalBytes = (await Promise.all(outputFiles.map((file) => fs.stat(file)))).reduce((sum, stat) => sum + stat.size, 0)
  console.log(`${variant.directory}: ${images.length} images, ${(totalBytes / 1024 / 1024).toFixed(1)} MB`)
}
