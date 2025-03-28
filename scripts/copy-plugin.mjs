import fs from 'fs-extra'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(join(currentDir, '../package.json'), 'utf8'))

const pluginName = pkg.name.replace('reveal.js-', '')

const generateBanner = () => ` /*****************************************************************
 *
 * ${pkg.name} for Reveal.js 
 * Version ${pkg.version}
 * 
 * @link
 * ${pkg.homepage}
 * 
 * @author: ${pkg.author.name}, ${pkg.author.email}
 * https://github.com/${pkg.author.username}
 *
 * @license 
 * ${pkg.license}
 * 
 * Copyright (C) ${new Date().getFullYear()} ${pkg.author.name}
 *
 ******************************************************************/
\r\n
`

const addBannerToFile = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf8')
  await fs.writeFile(filePath, generateBanner() + content)
}

const copyPluginFiles = async () => {
  try {
    const srcDir = join('demo', 'plugin', pluginName)
    const destDir = join('plugin', pluginName)
 
    // First add banners to files in demo
    const files = await fs.readdir(srcDir)
    for (const file of files) {
      if (file.endsWith('.mjs') || file.endsWith('.css')) {
        await addBannerToFile(join(srcDir, file))
      }
    }
 
    // Then copy the files with banners to distribution folder
    await fs.copy(srcDir, destDir)
 
    console.log('✓ Successfully processed plugin files with banners')
  } catch (error) {
    console.error('Error processing plugin files:', error)
    process.exit(1)
  }
 }
 
 copyPluginFiles()