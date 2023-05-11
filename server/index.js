require('dotenv').config();
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', createProxyMiddleware({
  target: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe',
  headers: {
    Authorization: process.env.GITHUB_ATELIER_API_KEY,
  },
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
