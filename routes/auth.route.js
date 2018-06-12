//import express from 'express';
var express = require('express');
var passport = require('passport');
var router = express.Router();
var authCtrl = require('../controllers/auth.controller');


// this route handles the Local login
router.route('/local')
    .post(authCtrl.login);

// This route handles the link click to redirect to the google login
// router.route('/google')
// .get(passport.authenticate('google', {
//     scope: [
//             'https://www.googleapis.com/auth/userinfo.profile',
//             'https://www.googleapis.com/auth/userinfo.email'
//            ]
// }));
router.route('/google')
    .get(authCtrl.loginViaGoogle);

// This is the callback route that will get hit after google has authenticated a user.
router.route('/google/callback') 
    .get(passport.authenticate('google'), authCtrl.loginViaGoogleCallback);
// router.route('/google/callback') 
//     .get(passport.authenticate('google'),
//         (req, res) => {
//             //req.session.token = req.user.token;
//             //res.redirect('/');
//             //req.token = req.user.token;
//             // req.displayname = req.user.username;
//             // res.email = req.user.email;
//            var user = req.user;
        

//             //authCtrl.loginUser(req, res, req.user);

//             //res.redirect('http://localhost:4200/gallery');
//         }
// );






  //.get(passport.authenticate('google', { 
    //   successRedirect: '/',
    //   failure: '/error/'
  //}));
//router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// router.get('/google/callback', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));



// router.route('/twitter').get(passport.authenticate('twitter'));
// router.route('/twitter/callback').get(passport.authenticate('twitter', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

// router.route('/linkedin').get(passport.authenticate('linkedin'));
// router.route('/linkedin/callback').get(passport.authenticate('linkedin', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

// router.route('/facebook').get(passport.authenticate('facebook', {
//     scope: ['email']
// 	}));
// router.route('/facebook/callback').get(passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

//router.param('userId', userCtrl.load);

module.exports = router;
