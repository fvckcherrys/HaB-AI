import { APP_BASE_HREF } from '@angular/common';
import { renderModule } from '@angular/platform-server';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppComponent } from './app/app.component';
import { readFileSync } from 'fs';
import { provideAnimations } from '@angular/platform-browser/animations';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Read the index.html file
  const template = readFileSync(join(browserDistFolder, 'index.html'), 'utf-8');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    renderModule(AppComponent, {
      document: template,
      url: `${protocol}://${headers.host}${originalUrl}`,
      extraProviders: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        provideAnimations(),
      ],
    })
      .then((html: string) => res.send(html))
      .catch((err: Error) => {
        console.error('Error rendering:', err);
        next(err);
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './main.server';
