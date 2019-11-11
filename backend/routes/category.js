const {Router} = require('express');

const router = new Router();


const {runValidation} = require('../validator');
const {categoryCreateValidator} = require('../validator/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');

const {create, list, read, remove} = require('../controllers/category');


router.get('/categories', list);
router.get('/category/:slug', read);
router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;