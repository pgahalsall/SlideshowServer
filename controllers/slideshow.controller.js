var Slideshow = require('../model/slideshow.model');
var mockSlideshows = require('../data/mockSlideshows.json');

var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');



function getMockSlideshow() {
  return mockSlideshows;
}

/**
 * Load slideshow and append to req.
 */
function load(req, res, next, id) {
      var allSlideshows = getMockSlideshow();
      const selectedSlideshow =  allSlideshows.find(slideshow => {
                                            return slideshow.id == id;
                                           }
                                  );
    if(selectedSlideshow) {
      req.slideshow = selectedSlideshow; // eslint-disable-line no-param-reassign
      return next();
      //res.json(selectedSlideshow);
    }
    else
    {
      const err = new APIError('No such Slideshow exists!', httpStatus.NOT_FOUND);
      next(err);
    }
  }
  
  /**
   * Get slideshow
   * @returns {Slideshow}
   */
  function get(req, res) {
    return res.json(req.slideshow);
  }
  
  /**
   * Create new user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
   function create(req, res, next) {
    //   const user = new User({
    //     userId: req.body.userId,
    //     username: req.body.username,
    //     mobileNumber: req.body.mobileNumber
    //   });
  
    //   user.save()
    //     .then(savedUser => res.json(savedUser))
    //     .catch(e => next(e));
  }
  
  /**
   * Update existing user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
  function update(req, res, next) {
    const slideshow = req.slideshow;
    // user.username = req.body.username;
    // user.mobileNumber = req.body.mobileNumber;
  
    // user.save()
    //   .then(savedUser => res.json(savedUser))
    //   .catch(e => next(e));
  }
  
  /**
   * Get user list.
   * @property {number} req.query.skip - Number of users to be skipped.
   * @property {number} req.query.limit - Limit number of users to be returned.
   * @returns {User[]}
   */
  function list(req, res, next) {
    // const { limit = 50, skip = 0 } = req.query;
    var allSlideshows = getMockSlideshow();
    if(allSlideshows) {
      //req.allSlideshows = allSlideshows; // eslint-disable-line no-param-reassign
      //return next();
      res.json(allSlideshows);
    }
    else
    {
      const err = new APIError('No Slideshows exist!', httpStatus.NOT_FOUND);
      next(err);
    }
  }
  
  /**
   * Delete slideshow.
   * @returns {Slideshow}
   */
  function remove(req, res, next) {
    const slideshow = req.slideshow;
    // user.remove()
    //   .then(deletedUser => res.json(deletedUser))
    //   .catch(e => next(e));
  }
  
  module.exports = { load, get, create, update, list, remove };
  