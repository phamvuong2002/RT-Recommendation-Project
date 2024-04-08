import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_SERVER_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              proxyReq.setHeader(
                'x-api-key',
                process.env.VITE_X_API_VERSION_KEY,
              );
              console.log(
                'Sending Request to the Target:',
                req.statusCode,
                req.url,
              );
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(
                'Received Response from the Target:',
                proxyRes.statusCode,
                req.url,
              );
            });
          },
        },
      },
      port: process.env.VITE_PORT,
      // host: '192.168.1.5',
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3050',
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         configure: (proxy, _options) => {
//           proxy.on('error', (err, _req, _res) => {
//             console.log('proxy error', err);
//           });
//           proxy.on('proxyReq', (proxyReq, req, _res) => {
//             proxyReq.setHeader(
//               'x-api-key',
//               '159fe76366a62f33a329e9709ed117f680280458db1ea73580a66e456bca4d90f0d1ffeb24344b63115fa9f0293f3992e758076d27fd594393e9204fe8874ee1',
//             );
//             console.log(import.meta.env.VITE_X_API_VERSION_KEY);
//             console.log('Sending Request to the Target:', req.headers, req.url);
//           });
//           proxy.on('proxyRes', (proxyRes, req, _res) => {
//             console.log(
//               'Received Response from the Target:',
//               proxyRes.statusCode,
//               req.url,
//             );
//           });
//         },
//       },
//     },
//     port: 5173,
//   },
// });
