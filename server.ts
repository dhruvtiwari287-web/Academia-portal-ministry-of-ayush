import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/src/routes/api.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AYUSH Academia–Industry Collaboration Platform API',
      organization: 'Ministry of Ayush / AIIA',
      timestamp: new Date().toISOString()
    });
  });

  // Mount primary REST APIs FIRST
  app.use('/api', apiRouter);

  // Vite middleware setup (Express v5 compatible)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AYUSH Platform] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[AYUSH Platform] Failed to start server:', err);
  process.exit(1);
});
