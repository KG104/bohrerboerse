var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/equipment');
  //res.render('express', { activePage: 'equipment' });
});

module.exports = router;
