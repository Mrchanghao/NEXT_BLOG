const {Router} = require('express');

const {time} = require('../controllers/blog')

const router = new Router();

router.get('/', time)


module.exports = router;