const {Router} = require('express');
const router = new Router();

const {tagValidator} = require('../validator/tag');
const {runValidation} = require('../validator');

const {requireSignin, adminMiddleware} = require('../controllers/tag');

const {create, read, list, remove} = require('../controllers/tag');


router.post('/tag', tagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);




module.exports = router;
