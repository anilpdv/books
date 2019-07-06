const express = require('express');
const axios = require('axios');
const prettyError = require('pretty-error');
const libgen = require('../../LibGen');

const pe = new prettyError();
const router = express.Router();

router.get('/search', (req, res) => {
  errors = [];
  if (req.query.q) {
    const q = req.query.q;

    const options = {
      query: q,
      page: req.query.page,
    };

    libgen(options)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
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
  const limit = req.query.limit;
  const url = `http://booksdescr.org/json.php?mode=last&timefirst=${from}&timelast=${to}&limit1=${limit}`;
  console.log(url);
  axios
    .get(url)
    .then(resp => {
      res.json(resp.data);
    })
    .catch(err => {
      console.log(pe.render(err));
    });
});

module.exports = router;
