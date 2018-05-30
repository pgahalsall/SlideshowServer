const path 		= require('path');
const appRoot 	= require('app-root-path');
var Slide       = require('../model/slide.model');
var mockSlides  = require('../data/mockSlides.json');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');

function getMockSlides(req) {
  if(req) {
    for (let index = 0; index < mockSlides.length; index++) {
        slide = mockSlides[index];
        checkUrl(req.protocol, req.headers.host, slide);
    }
  }
  return mockSlides;
}

function checkUrl(protocol, host, slide) {
  if(!(slide.imageUrl.includes(host))) {
    var slideFile = getFullUrl(protocol, host, slide.imageUrl);
    slide.imageUrl = slideFile;
  }
}

function getFullUrl(protocol, host, requiredUri)
{
  // http://localhost:3000/images/prototype/slides/anchor.jpg
  return protocol + "://" + host + "/" + requiredUri;
}


/**
 * Load slides and append to req.
 */
function load(req, res, next, id) {
      var allSlides = getMockSlides(req);
      const selectedSlide =  allSlides.find(slide => {
                                            return slide.slideId == id;
                                           }
                                  );
    if(selectedSlide) {
      req.slide = selectedSlide; // eslint-disable-line no-param-reassign
      return next();
    }
    else
    {
      const err = new APIError('No such slide exists!', httpStatus.NOT_FOUND);
      next(err);
    }
  }
  
  /**
   * Get user
   * @returns {Slide}
   */
  function get(req, res) {
    return res.json(req.slide);
  }
  
  /**
   * Create new user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
   function create(req, res, next) {
    //   const user = new Slide({
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
    const slide = req.slide;
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
    var allSlides = getMockSlides(req);
    if(allSlides) {
      //req.allSlides = allSlides; // eslint-disable-line no-param-reassign
      //return next();
      res.json(allSlides);
    }
    else
    {
      const err = new APIError('No slides exist!', httpStatus.NOT_FOUND);
      next(err);
    }
  }
  
  /**
   * Delete user.
   * @returns {User}
   */
  function remove(req, res, next) {
    const slide = req.slide;
    // user.remove()
    //   .then(deletedUser => res.json(deletedUser))
    //   .catch(e => next(e));
  }
  
  //export default { load, get, create, update, list, remove };
  module.exports = { load, get, create, update, list, remove };
  




