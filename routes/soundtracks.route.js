var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var soundtrackCtrl = require('../controllers/soundtrack.controller');

var router = express.Router();



router.route('/')
  /** GET /api/soundtracks - Get list of soundtracks */
  .get(soundtrackCtrl.list)

  /** POST /api/soundtracks - Create new soundtracks */
  .post(validate(paramValidation.createSoundtrack), soundtrackCtrl.create);

// router.route('/:id')
router.route('/:id(\\d+)')
  /** GET /api/soundtracks/:id - Get soundtracks */
  .get(soundtrackCtrl.get)

  /** PUT /api/soundtracks/:id - Update soundtracks */
  .put(validate(paramValidation.updateSoundtrack), soundtrackCtrl.update)

  /** DELETE /api/soundtracks/:id - Delete soundtracks */
  .delete(soundtrackCtrl.remove);

/** Load soundtracks when API with id route parameter is hit */
router.param('id', soundtrackCtrl.load);


module.exports = router;
