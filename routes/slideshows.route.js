var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var slideshowCtrl = require('../controllers/slideshow.controller');

var router = express.Router();
//var mockSlideshowData = require('../data/mockSlideshows.json');
//var Slideshow = require('../model/slideshow.model')



router.route('/')
  /** GET /api/slideshows - Get list of slideshows */
  .get(slideshowCtrl.list)

  /** POST /api/slideshows - Create new slideshows */
  .post(validate(paramValidation.createSlideshow), slideshowCtrl.create);

//router.route('/:id')
router.route('/:id(\\d+)')
  /** GET /api/slideshows/:id - Get slideshows */
  .get(slideshowCtrl.get)

  /** PUT /api/slideshows/:id - Update slideshows */
  .put(validate(paramValidation.updateSlideshow), slideshowCtrl.update)

  /** DELETE /api/slideshows/:id - Delete slideshows */
  .delete(slideshowCtrl.remove);

/** Load slideshows when API with id route parameter is hit */
router.param('id', slideshowCtrl.load);


module.exports = router;
