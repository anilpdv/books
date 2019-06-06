// : importing the modules
const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const path = require('path');
const cors = require('cors');

// : routes
const searchRoute = require('./routes/libgen/search');
const reviewRoute = require('./routes/good-reads/goodreads.js');
const downloadRoute = require('./routes/libgen/download.js');

// : creating instance
const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

// : middleware
app.use('/static', express.static(path.join(__dirname, 'public')));

// : creating routes
app.use('/api/books', searchRoute);
app.use('/api/book', reviewRoute);
app.use('/api/book', downloadRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is started and listening to port 3000');
  console.log(`listen to the server http://localhost:${port}`);
});
