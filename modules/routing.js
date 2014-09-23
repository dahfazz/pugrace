var express     = require('express');
var router      = express.Router();


/* ROUTING */
console.log('route')
router.get('/', function(req, res) {
    res.sendfile('../views/index.html');
});
module.exports = router;