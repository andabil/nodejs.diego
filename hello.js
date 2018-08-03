const http = require('http');
const url = require('url');

const PORT = 3000;
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedUrl = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLocaleLowerCase();
  const queryStringObjects = parsedUrl.query;

  const handle = routes[trimmedUrl] ? routes[trimmedUrl][method] : false;
  if(handle) {
    handle(req, res, queryStringObjects);    
  } else {
    res.end('');
  }
});

const routes = {
  'json': {
    'get': (req, res, query) => {
      console.log('query', query);
      res.setHeader('Content-Type', 'application/json');

      const data = JSON.stringify({
        name: 'Diego',
        age: 29,
        lastname: query.lastname,
      });
  
      res.writeHead(200); //request status
      res.end(data);
    },
    'post': (req, res) => res.end('we did post it;)')
  },
  'cart': (req, res) => {
    res.end('you have no cart :P');
  }
}

server.listen(PORT, () => 
  console.log('Server is running on port', PORT)
);