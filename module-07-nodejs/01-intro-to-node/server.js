const http = require('http');

const server = http.createServer((request, response) => {
  console.log('Request method: ', request.method);
  console.log('URL: ', request.url);

  if (request.url === '/chicken') {
    response.end('Hello chicken');
  } else if (request.url === '/blabla') {
    response.end('blabla!!!');
  }
});

server.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
