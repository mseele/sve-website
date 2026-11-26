import sharp from 'sharp'

const args = process.argv.slice(2)

if (args.length < 2) {
  console.error(
    'Create the two event image assets from one source photo. Run from the repo root. ' +
      'Usage: bun scripts/createEventImages.mjs <source.jpg> <name> [light|dark] [aspect] [yOffsetPercent] ' +
      "aspect: 'W:H' (e.g. '16:9') or 'none', yOffsetPercent: vertical crop start as percent of the " +
      'croppable height (0 = top, 50 = center, default 50). ' +
      'Writes src/assets/events/<name>.jpg and ../sve-tools/src/assets/events/<name>_<light|dark>.jpg',
  )
  process.exit(1)
}

const [src, name, theme = 'light', aspect = '16:9', yOffsetPercent = '50'] = args

if (theme !== 'light' && theme !== 'dark') {
  console.error(`Unknown theme '${theme}', expected 'light' or 'dark'`)
  process.exit(1)
}

if (name.includes('_') || !/^[a-z0-9-]+$/i.test(name)) {
  console.error(
    `Invalid name '${name}': must not contain underscores (sve-tools derives the image name by stripping ` +
      'after the last underscore) and must be a plain file name without extension',
  )
  process.exit(1)
}

const metadata = await sharp(src).metadata()
const { width, height } = metadata

if (!width || !height) {
  console.error(`Could not read dimensions of ${src}`)
  process.exit(1)
}

let crop = () => sharp(src)
if (aspect !== 'none') {
  const [aspectWidth, aspectHeight] = aspect.split(':').map(Number)
  const cropHeight = Math.round((width * aspectHeight) / aspectWidth)
  if (!cropHeight || cropHeight >= height) {
    console.error(
      `Source ${width}x${height} is too wide for aspect ${aspect}, pass 'none' to skip cropping`,
    )
    process.exit(1)
  }
  const offsetPercent = Number(yOffsetPercent)
  if (Number.isNaN(offsetPercent) || offsetPercent < 0 || offsetPercent > 100) {
    console.error(`Invalid yOffsetPercent '${yOffsetPercent}', expected a number between 0 and 100`)
    process.exit(1)
  }
  const top = Math.round(((height - cropHeight) * offsetPercent) / 100)
  crop = () => sharp(src).extract({ left: 0, top, width, height: cropHeight })
}

await crop().jpeg({ quality: 80 }).toFile(`src/assets/events/${name}.jpg`)
await crop()
  .resize({ width: 300 })
  .jpeg({ quality: 80 })
  .toFile(`../sve-tools/src/assets/events/${name}_${theme}.jpg`)

console.log(
  `Created src/assets/events/${name}.jpg and ../sve-tools/src/assets/events/${name}_${theme}.jpg`,
)
