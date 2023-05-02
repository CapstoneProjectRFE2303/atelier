require('dotenv').config();
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

const port = process.env.PORT || 3000;

const proxy = httpProxy.createProxyServer();

const devServerProxy = (request, response, next) => {
  if (request.url.startsWith('/client/dist/')) {
    proxy.web(request, response, {
      target: 'http://localhost:8080',
    });
  } else {
    next();
  }
};

app.use(devServerProxy);

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
