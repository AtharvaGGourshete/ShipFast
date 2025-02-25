import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API requests to OpenAI directly (not recommended for production)
      '/api/chat': {
        target: 'https://api.openai.com/v1/chat/completions',
        changeOrigin: true,
        rewrite: (path) => '',
        configure: (proxy, _options) => {
          proxy.on('proxyReq', function(proxyReq, req, _res) {
            // Read the body from the original request
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                // Transform the request for OpenAI format
                const newBody = JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: data.messages
                });
                
                // Update headers and write body
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Authorization', `Bearer ${process.env.VITE_OPENAI_API_KEY}`);
                proxyReq.setHeader('Content-Length', Buffer.byteLength(newBody));
                proxyReq.write(newBody);
              } catch (error) {
                console.error('Error processing proxy request:', error);
              }
            });
          });
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
