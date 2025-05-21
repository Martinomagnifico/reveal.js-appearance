import fs from 'fs';
import { resolve } from 'path';

export function dynamicIndex() {
  return {
    name: 'vite-plugin-dynamic-index', // Name of the plugin
    async configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          // Generate dynamic index.html

          const viewsDir = resolve(__dirname, '../src/demo/views');
          const files = fs.readdirSync(viewsDir);

          // Find all Pug files in the directory
          const pugFiles = files.filter(file => file.endsWith('.pug'));

          // Map the Pug files to links
          const links = pugFiles.map(file => {
            const name = file.replace('.pug', '');
            return `<li><a href="/${name}.html">${name}</a></li>`;
          }).join('\n');

          // Generate the HTML content
          const indexHtml = `
            <!DOCTYPE html>
            <html lang="en" class="index">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Demo</title>
              <link rel="stylesheet" href="/src/demo/css/demo.scss">
            </head>
            <body>
              <ul class="fileindex">
                ${links}
              </ul>
            </body>
            </html>
          `;

          // Send the generated HTML as a response
          res.setHeader('Content-Type', 'text/html');
          res.end(indexHtml);
        } else {
          next();
        }
      });
    }
  };
}
