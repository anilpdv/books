const express = require('express');
const axios = require('axios');
const prettyError = require('pretty-error');

const router = express.Router();
const pe = new prettyError();

router.get('/download/:title', (req, res) => {
  res.set('Content-Type', 'application/epub+zip');
  axios
    .get('http://libgen.io/get.php?md5=' + req.query.md5, {
      responseType: 'stream',
    })
    .then(resp => {
      resp.data.pipe(res);
    })
    .catch(err => {
      console.log(pe.render(err));
    });
});

router.get('/:id', (req, res) => {
  const url = 'http://libgen.io/json.php?ids=' + req.params.id;
  axios
    .get(url)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
