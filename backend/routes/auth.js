const {Router} = require('express');

const router = new Router();
const {signup, signin,signout, requireSignin} = require('../controllers/auth');

const {runValidation} = require('../validator/index');
const {userSignupValidator, userSignInValidator} = require('../validator/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSignInValidator, runValidation, signin)
router.get('/signout', signout)

// router.get('/secret', requireSignin, authMiddleware, (req, res) => {
//   res.json({
//     user: req.user
//   })
//   // user 정보
// })

module.exports = router;