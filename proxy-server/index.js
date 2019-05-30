const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = 8000;

const { routes } = require('../proxy-config.json');

const app = express();
app.use(express.static(path.join(__dirname, '../proxy-public')));

// configure middleware
for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
  );
}

app.listen(port, () => {
  console.log(`Proxy listening on ${port}`);
});
