import fs from 'fs-extra'

const copyRevealFiles = async () => {
 try {
   await fs.copy(
     'node_modules/reveal.js/dist',
     'demo/dist'
   )
   
   await fs.copy(
     'node_modules/reveal.js/plugin',
     'demo/plugin'
   )

   console.log('✓ Successfully copied reveal.js files')
 } catch (err) {
   console.error('Error copying reveal.js files:', err)
   process.exit(1)
 }
}

copyRevealFiles()