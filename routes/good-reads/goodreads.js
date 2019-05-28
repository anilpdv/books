const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/review/:isbn', (req, res) => {
  console.log(req.params);
  const url =
    'https://www.goodreads.com/book/isbn/' +
    req.params.isbn +
    '?format=json&user_id=63504695';
  axios
    .get(url)
    .then(data => {
      res.send(data.data.reviews_widget);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/rating/:isbn', (req, res) => {
  console.log(req.params);
  const url =
    'https://www.goodreads.com/book/review_counts.json?key={' +
    apikey +
    '}&isbns=' +
    req.params.isbn;
  axios
    .get(url)
    .then(data => {
      res.send(data.data.books);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;