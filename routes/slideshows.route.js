var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var slideshowCtrl = require('../controllers/slideshow.controller');
var authCtrl = require('../controllers/auth.controller');

var router = express.Router();
//var mockSlideshowData = require('../data/mockSlideshows.json');
//var Slideshow = require('../model/slideshow.model')



router.route('/')
  /** GET /api/slideshows - Get list of slideshows */
  .get(authCtrl.isLoggedIn, slideshowCtrl.list)

  /** POST /api/slideshows - Create new slideshows */
  .post(validate(paramValidation.createSlideshow), authCtrl.isLoggedIn, slideshowCtrl.create);

//router.route('/:id')
router.route('/:id(\\d+)')
  /** GET /api/slideshows/:id - Get slideshows */
  .get(authCtrl.isLoggedIn, slideshowCtrl.get)

  /** PUT /api/slideshows/:id - Update slideshows */
  .put(validate(paramValidation.updateSlideshow), authCtrl.isLoggedIn, slideshowCtrl.update)

  /** DELETE /api/slideshows/:id - Delete slideshows */
  .delete(authCtrl.isLoggedIn, slideshowCtrl.remove);

/** Load slideshows when API with id route parameter is hit */
router.param('id', slideshowCtrl.load);


module.exports = router;
