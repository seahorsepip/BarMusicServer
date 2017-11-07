var express = require('express');
var router = express.Router();

router.use('/songs', require('./songs'));
router.use('/playlists', require('./playlists/index'));

module.exports = router;
