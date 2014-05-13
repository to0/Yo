var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/beta/ios',function(req, res) {
  res.render('ios-beta');
})
router.get('/beta/android', function(req, res) {
	res.download(path.resolve(__dirname,'../app-beta/yohelper.apk'));
});
module.exports = router;
