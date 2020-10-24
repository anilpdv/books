const express = require('express');
const axios = require('axios');
const prettyError = require('pretty-error');
const libgen = require('../../LibGen');

const pe = new prettyError();
const router = express.Router();

var getClientIp = function(req) {
    return (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
           req.client.remoteAddress;
};

router.get('/search', (req, res) => {
  errors = [];

  if (req.query.q) {
    const q = req.query.q;

    let remotePort = req.connection.remotePort;
    let remoteAddress = getClientIp(req); 

    const options = {
      query: q,
      page: req.query.page ? req.query.page : 1,
      remotePort,
      remoteAddress
    };

    libgen(options)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('error happend ');
        res.status(500);
        res.send(err);
      });
  } else {
    let err = new Error(' query is not provided');
    err.status = 400;
    res.status(400);
    res.send({
      message: err.message,
      status: err.status
    });
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