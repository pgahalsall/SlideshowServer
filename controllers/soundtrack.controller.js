var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var mockSoundtracks = require('../data/mockSoundtracks.json');


function getMockSoundtracks(req) {
  if(req) {
    for (let index = 0; index < mockSoundtracks.length; index++) {
        sound = mockSoundtracks[index];
        checkUrl(req.protocol, req.headers.host, sound);
    }
}
  return mockSoundtracks;
}

function checkUrl(protocol, host, sound) {
  if(!(sound.filename.includes(host))) {
    var filename = getFullUrl(protocol, host, sound.filename);
    sound.filename = filename;
  }
}

function getFullUrl(protocol, host, requiredUri)
{
  // http://localhost:3000/images/prototype/slides/anchor.jpg
  return protocol + "://" + host + "/" + requiredUri;
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
      var allSoundtracks = getMockSoundtracks(req);
      const selectedSound =  allSoundtracks.find(st => {
                                            return st.id == id;
                                           }
                                  );
    if(selectedSound) {
      req.sound = selectedSound; // eslint-disable-line no-param-reassign
      return next();
    }
    else
    {
      const err = new APIError('No such Soundtrack exists!', httpStatus.NOT_FOUND);
      next(err);
    }
  }
  
  /**
   * Get user
   * @returns {User}
   */
  function get(req, res) {
    return res.json(req.sound);
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
    // const user = req.user;
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
    var allSoundtracks = getMockSoundtracks(req);
    if(allSoundtracks) {
      // req.allSoundtracks = allSoundtracks; // eslint-disable-line no-param-reassign
      // return next();
      res.json(allSoundtracks);
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
    // const user = req.user;
    // user.remove()
    //   .then(deletedUser => res.json(deletedUser))
    //   .catch(e => next(e));
  }
  
  module.exports = { load, get, create, update, list, remove };
  