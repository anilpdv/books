const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/download/:md5', (req, res) => {
  res.set('Content-Type', 'application/epub+zip');
  axios
    .get('http://libgen.io/get.php?md5=' + req.params.md5, {
      responseType: 'stream',
    })
    .then(resp => {
      resp.data.pipe(res);
    })
    .catch(err => {
      console.log(pe.render(err));
    });
});

module.exports = router;
