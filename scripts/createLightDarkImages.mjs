import sharp from 'sharp'

if (process.argv.length >= 4) {
  const src = process.argv[2]
  const name = process.argv[3]
  const assetsFolder = process.argv.length >= 5 ? process.argv[4] : 'pages'

  await convert(src, assetsFolder, name, true)
  await convert(src, assetsFolder, name, false)
} else {
  console.error(
    'Please add image src and new image name as cli parameters (node <script.mjs> <source.jpg> <name prefix> [asset folder]).'
  )
}

async function convert(src, assetsFolder, name, light) {
  let image = sharp(src)
  if (!light) {
    image.modulate({
      lightness: -15
    })
  }
  image.toFile(`src/assets/${assetsFolder}/${name}-${light ? 'light' : 'dark'}.jpg`)
}
