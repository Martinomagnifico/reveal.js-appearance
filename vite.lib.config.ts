// vite.lib.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }
import pluginConfig from './plugin.config.js'

const pluginName = pkg.name.replace('reveal.js-', '');

export default defineConfig({
    build: {
        lib: {
            formats: ['es', 'umd'],
            entry: resolve(import.meta.dirname, 'src/plugin/js/index.ts'),
            name: pluginConfig.functionname,
            fileName: (format) => `plugin/${pluginName}/${pluginName}.${format === 'es' ? 'mjs' : 'js'}`
        },
        outDir: 'demo',
        emptyOutDir: false,
        rollupOptions: {
            checks: {
                emptyImportMeta: false,
            },
            external: [/^\/node_modules\/reveal\.js\/.*/],
            output: {
                assetFileNames: (assetInfo) => {
                    const assetName = assetInfo.names ? assetInfo.names[0] : assetInfo.name;
                    if (assetName?.endsWith('.css')) {
                        return `plugin/${pluginName}/${pluginName}.css`;
                    }
                    if (assetName?.endsWith('.scss')) {
                        return `plugin/${pluginName}/${pluginName}.css`;
                    }
                    return '[name].[ext]';
                  },
            }
        }
    }
})