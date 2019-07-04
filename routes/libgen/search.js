const express = require('express');
const libgen = require('../../libgen.js/index.js');
const axios = require('axios');
const prettyError = require('pretty-error');

const pe = new prettyError();
const router = express.Router();

router.get('/search', (req, res) => {
  errors = [];
  if (req.query.q) {
    const q = req.query.q;

    const search_in = req.query.search_in;

    const options = {
      mirror: 'http://libgen.io',
      query: q,
      search_in: search_in,
      page: req.query.page,
    };

    libgen.pageSearch(options, (err, data) => {
      if (err) {
        let err = new Error('internal error');
        err.status = 404;
        errors.push(err);
        res.send(errors);
      } else {
        res.json(data);
      }
    });
  } else {
    let err = new Error(' query is not provided');
    err.status = 404;
    res.send({message: err.message, status: err.status});
  }
});

router.get('/latest', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  const url = `http://libgen.io/json.php?mode=last&timefirst=${from}&timelast=${to}&limit1=100`;
  axios
    .get(url)
    .then(data => {
      res.json(data.data);
    })
    .catch(err => {
      console.log(pe.render(err));
    });
});

module.exports = router;
