const {Router} = require('express');

const router = new Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read } = require('../controllers/user');


router.get('/profile', requireSignin, adminMiddleware, read)

module.exports = router;