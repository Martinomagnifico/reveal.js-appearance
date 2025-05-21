// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import pkg from "./package.json";
import pluginConfig from './plugin.config.js'
import { dynamicIndex } from './vite-plugins/vite-plugin-dynamic-index';
import suppressWarnings from './vite-plugins/vite-plugin-suppress-warnings';

export default defineConfig({
    publicDir: "src/demo/public",
    build: {
        outDir: "demo",
        emptyOutDir: false,
        rollupOptions: {
            input: [
                resolve(__dirname, "src/demo/views/demo*.pug"),
                // resolve(__dirname, "src/demo/views/*.html"),
                resolve(__dirname, "src/demo/css/*.scss"),
            ],
            external: [/^\/node_modules\/reveal\.js\/.*/],
            output: {
                assetFileNames: (assetInfo) => {
                if (/\.css$/.test(assetInfo.names[0])) {
                    return "assets/css/[name].[ext]";
                }
                return "[name].[ext]";
                },
            }
        },
    },
    plugins: [
        vituum({
            pages: {
                dir: "src/demo/views",
                normalizeBasePath: true,
            },
        }),
        pug({
            root: "src",
            globals: {
                plugin: {
                    packagename: pkg.name,
                    homepage: pkg.homepage,
                    name: pluginConfig.functionname.toLowerCase(),
                },
                presentation: {
                    title: pluginConfig.demo?.presentation?.title || pkg.name,
                    theme: pluginConfig.demo?.presentation?.theme || "black",
                },
                author: pkg.author,
                isProd: process.env.NODE_ENV === "production",
            },
            options: {
                pretty: true,
            },
        }),
        dynamicIndex(),
        suppressWarnings()
    ],
    resolve: {
        alias: {
        "@": "/src",
        },
    },
    server: {
        host: true,
        open: pluginConfig.demo?.server?.open || "index.html" || "demo.html",
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern"
            }
        }
    }
});
