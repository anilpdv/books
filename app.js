// : importing the modules
const express = require('express');
const axios = require('axios');
const PrettyError = require('pretty-error');
const fs = require('fs');
const libgen = require('libgen');

// : routes
const searchRoute = require('./routes/libgen/search');
const reviewRoute = require('./routes/good-reads/goodreads.js');
const downloadRoute = require('./routes/libgen/download.js');

// : creating instance
const pe = PrettyError();
const app = express();

// : creating routes
app.use('/api', searchRoute);
app.use('/api', reviewRoute);
app.use('/api', downloadRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is started and listening to port 3000');
  console.log(`listen to the server http://localhost:${port}`);
});
