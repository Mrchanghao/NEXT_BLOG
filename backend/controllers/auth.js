const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');  


exports.signup = (req, res) => {
  console.log('sign up')
  User.findOne({email: req.body.email}).exec((err, user) => {
    if(user) {
      return res.status(400).json({
        error: "email is already taken"
      })
    }

    const {name, email, password } = req.body
    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({name, email, password, profile, username});

    newUser.save()
      .then((success) => {
        res.json({
          message: 'Sign up success'
        })
      })
      .catch((err) => {
        return res.status(400).json({
          error: err
        })
      })

    // newUser.save((err, success) => {
    //   if(err) {
    //     return res.status(400).json({
    //       error: err 
    //     })
    //   }
    //   // res.json({
    //   //   user: success
    //   // })
    //   res.json({
    //     message: 'Sign up success'
    //   })
    // })

  })
}

exports.signin = async (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User with the email does not exist please sign up'
      })
    }
    if(!user.authenticate(password)) {
      return res.status(400).json({
        error: 'User with the password does not exist please sign up'
      })
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.cookie('token', token, {expiresIn: '1d'});

    const {_id, username, name, email, role} = user;

    return res.json({
      token, user: {_id, username, name, email, role}
    })

  })
};

exports.signout = (req, res) => {
  res.clearCookie('token');

  res.json({
    message: 'sign out success'
  })
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
})

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({_id: authUserId}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'user not found'
      })
    };
    req.profile = user;
    next();
  })
}

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({_id: adminUserId}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'user not found'
      })
    }

    if(user.role !== 1) {
      return res.status(400).json({
        error: 'Admin access denied'
      })
    }

    req.profile = user;
    next();
  })
}