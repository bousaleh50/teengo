const { json } = require('express');
var express = require('express');
const { findUser } = require('../controllers/UserController');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("user/data/:id",findUser);

router.get('/:id',findUser)


module.exports = router;
