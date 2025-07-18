import http from 'http';
import { getAllProducts } from './crudOperations.js';

const server = http.createServer(async (req, res) => {
  if (req.url === '/products') {
    if (req.method === 'GET') return await getAllProducts(req, res);
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
