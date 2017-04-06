const express = require('express');
const config = require('./config');

const app = express();

app.use((req, res, next) => {
  console.log('request method', req.method);
  next();
});

app.get('/', (req, res) => {
  res.json({
    name: 'test',
  });
});

app.use((req, res) => {
  res.status(404).send('endpoint not found');
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
