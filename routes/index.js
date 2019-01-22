var express = require('express');
var router = express.Router();
var db = require('../util/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { msg: "none" });
});
router.post('/login_info', (req, res) => {
  db.login(req.body, res);
})
router.get('/sign_up', (req, res) => {
  res.render('sign_up', { msg: "none" });
})
router.post('/sign_up', (req, res) => {
  db.check(req.body, res)
});
module.exports = router;
