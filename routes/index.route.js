//import express from 'express';
// import userRoutes from './users.route';
// import authRoutes from './auth.route';
var express = require('express');
var userRoutes = require('./users.route');

var slideRoutes = require('./slides.route');
var soundtrackRoutes = require('./soundtracks.route');
var slideshowRoutes = require('./slideshows.route');

var authRoutes = require('./auth.route');

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// mount user routes at /users
router.use('/users', userRoutes);

// mount slides routes at /slides
router.use('/slides', slideRoutes);

// mount soundtrack routes at /soundtracks
router.use('/soundtracks', soundtrackRoutes);

// mount slideshows routes at /slideshows
router.use('/slideshows', slideshowRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);


module.exports = router;
