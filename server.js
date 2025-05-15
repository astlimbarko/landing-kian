import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import compression from 'compression';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  app.use(compression());
  app.use(express.json());

  // Health check para Render
  app.get('/health', (req, res) => {
    res.send('OK');
  });

  // API endpoint para consultar divisas
  app.get('/api/divisas', async (req, res) => {
    try {
      // Aquí irá la lógica de consulta a Firebase
      // Similar a como lo haces en CurrencyCalculator.vue
      res.json({ success: true, data: { /* tus datos */ } });
    } catch (error) {
      console.error('Error al consultar divisas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  // Servir archivos estáticos
  app.use(express.static(resolve(__dirname, 'dist')));

  // Configuración de rutas para /auth y /calc
  app.use('/auth', (req, res) => {
    res.redirect('https://landing-kian-auth.onrender.com' + req.url);
  });

  app.use('/calc', (req, res) => {
    res.redirect('https://landing-kian-calc.onrender.com' + req.url);
  });

  // Para todas las demás rutas, sirve el index.html
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor landing corriendo en puerto ${port}`);
  });
}

createServer();
