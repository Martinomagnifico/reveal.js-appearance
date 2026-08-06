import fs from 'fs-extra'

// reveal.js 6 ships its plugins inside `dist/plugin`, so copying `dist`
// brings them along. Older versions had a separate top-level `plugin` folder.
const copyRevealFiles = async () => {
 try {
   await fs.copy(
     'node_modules/reveal.js/dist',
     'demo/dist'
   )

   console.log('✓ Successfully copied reveal.js files')
 } catch (err) {
   console.error('Error copying reveal.js files:', err)
   process.exit(1)
 }
}

copyRevealFiles()
