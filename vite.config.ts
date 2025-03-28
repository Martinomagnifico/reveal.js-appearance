// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import pkg from "./package.json";

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
                    functionname: pkg.functionname,
                    name: pkg.functionname.toLowerCase(),
                    homepage: pkg.homepage,
                },
                presentation: {
                    title: pkg.demo?.presentation?.title || pkg.name,
                    theme: pkg.demo?.presentation?.theme || "black",
                },
                author: pkg.author,
                isProd: process.env.NODE_ENV === "production",
            },
            options: {
                pretty: true,
            },
        }),
        (() => {
            let originalWarn;
            return {
              name: 'filter-warnings',
              apply: 'build',
              configResolved() {
                originalWarn = console.warn;
                console.warn = function(msg, ...args) {
                  if (typeof msg === 'string' && (
                      msg.includes("can't be bundled without type=\"module\"") ||
                      msg.includes("doesn't exist at build time")
                  )) {
                    return;
                  }
                  originalWarn.call(console, msg, ...args);
                };
              },
              closeBundle() {
                if (originalWarn) {
                  console.warn = originalWarn;
                }
              }
            };
          })()
    ],
    resolve: {
        alias: {
        "@": "/src",
        },
    },
    server: {
        port: pkg.demo?.server?.port || 8000,
        open: pkg.demo?.server?.open || "index.html",
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern"
            }
        }
    }
});
