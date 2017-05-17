require('./config');
require('./db/mongoose');

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

// Middlewares
// allow cors requests
app.use(cors());
// parse application/json
app.use(bodyParser.json());

// Routes
app.use(routes);

app.use((req, res) => {
  res.status(404).send('endpoint not found');
});

app.listen(process.env.PORT, () => {
  console.log(`Task Manager API listening on port ${process.env.PORT}`);
});

module.exports = { app };
