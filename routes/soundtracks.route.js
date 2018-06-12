var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var soundtrackCtrl = require('../controllers/soundtrack.controller');
var authCtrl = require('../controllers/auth.controller');

var router = express.Router();



router.route('/')
  /** GET /api/soundtracks - Get list of soundtracks */
  .get(authCtrl.isLoggedIn, soundtrackCtrl.list)

  /** POST /api/soundtracks - Create new soundtracks */
  .post(validate(paramValidation.createSoundtrack), authCtrl.isLoggedIn, soundtrackCtrl.create);

// router.route('/:id')
router.route('/:id(\\d+)')
  /** GET /api/soundtracks/:id - Get soundtracks */
  .get(authCtrl.isLoggedIn, soundtrackCtrl.get)

  /** PUT /api/soundtracks/:id - Update soundtracks */
  .put(validate(paramValidation.updateSoundtrack), authCtrl.isLoggedIn, soundtrackCtrl.update)

  /** DELETE /api/soundtracks/:id - Delete soundtracks */
  .delete(authCtrl.isLoggedIn, soundtrackCtrl.remove);

/** Load soundtracks when API with id route parameter is hit */
router.param('id', soundtrackCtrl.load);


module.exports = router;
