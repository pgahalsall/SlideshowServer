var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var slideCtrl = require('../controllers/slide.controller');

var router = express.Router();


router.route('/')
  /** GET /api/slides - Get list of slides */
  .get(slideCtrl.list)

  /** POST /api/slides - Create new slide */
  .post(validate(paramValidation.createSlide), slideCtrl.create);

router.route('/:slideId(\\d+)')
  /** GET /api/slides/:slideId - Get slide 
  Request URL: http://localhost:3000/api/slides/4
  req.params: {"slideId": "4"}  
  Now that it has the slideId param it will hit the slideCtrl.load */
  .get(slideCtrl.get)

  /** PUT /api/slides/:slideId - Update slide */
  .put(validate(paramValidation.updateSlide), slideCtrl.update)

  /** DELETE /api/slides/:slideId - Delete slide */
  .delete(slideCtrl.remove);

/** Load slide when API with slideId route parameter is hit */
router.param('slideId', slideCtrl.load);


module.exports = router;
