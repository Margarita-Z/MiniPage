var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');

/* GET home page. */
router.get('/',controller.homePage);

module.exports = router;
