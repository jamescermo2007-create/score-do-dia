import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'vite-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/')) {
              try {
                const url = new URL(req.url, 'http://localhost:3000');
                const pathname = url.pathname;
                
                res.setHeader('Content-Type', 'application/json');
                
                const query = Object.fromEntries(url.searchParams.entries());
                
                let body: any = {};
                if (req.method === 'POST') {
                  const buffers = [];
                  for await (const chunk of req) {
                    buffers.push(chunk);
                  }
                  const rawData = Buffer.concat(buffers).toString();
                  try {
                    body = JSON.parse(rawData);
                  } catch (e) {
                    body = rawData;
                  }
                }
                
                const mockReq = {
                  url: req.url,
                  method: req.method,
                  query,
                  body,
                  headers: req.headers
                };
                
                const mockRes = {
                  statusCode: 200,
                  headers: {},
                  setHeader(name: string, value: string) {
                    res.setHeader(name, value);
                    this.headers[name] = value;
                  },
                  status(code: number) {
                    res.statusCode = code;
                    this.statusCode = code;
                    return this;
                  },
                  json(data: any) {
                    res.write(JSON.stringify(data));
                    res.end();
                  },
                  end() {
                    res.end();
                  }
                };
                
                if (pathname === '/api/football') {
                  const handlerModule = await server.ssrLoadModule('/api/football.ts');
                  await handlerModule.default(mockReq, mockRes);
                } else if (pathname === '/api/gemini') {
                  const handlerModule = await server.ssrLoadModule('/api/gemini.ts');
                  await handlerModule.default(mockReq, mockRes);
                } else {
                  res.statusCode = 404;
                  res.write(JSON.stringify({ error: 'Endpoint not found' }));
                  res.end();
                }
              } catch (err: any) {
                console.error('Error in local API middleware:', err);
                res.statusCode = 500;
                res.write(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                res.end();
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
