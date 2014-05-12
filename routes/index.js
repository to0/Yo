var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/download-android', function(req, res) {
	res.download(path.resolve(__dirname,'../tmp/yohelper.apk'));
});
module.exports = router;
