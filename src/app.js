const express = require('express');

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
