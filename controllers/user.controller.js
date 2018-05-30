var User = require('../model/user.model');
var mockUserData = require('../data/mockUsers.json');

var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');


function getMockUsers() {
  return mockUserData;
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    var allUsers = getMockUsers();
    const thisUser =  allUsers.find(user => {
                                          return user.userId == id;
                                         }
                                );
  if(thisUser) {
    req.user = thisUser; // eslint-disable-line no-param-reassign
    return next();
  }
  else
  {
    const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
    next(err);
  }

}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
 function create(req, res, next) {
    // const user = new User({
    //   userId: req.body.userId,
    //   username: req.body.username,
    //   mobileNumber: req.body.mobileNumber
    // });

    // user.save()
    //   .then(savedUser => res.json(savedUser))
    //   .catch(e => next(e));
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
  var allUsers = getMockUsers();
  if(allUsers) {
    // req.allUsers = allUsers; // eslint-disable-line no-param-reassign
    // return next();
    res.json(allUsers);
  }
  else
  {
    const err = new APIError('No users exist!', httpStatus.NOT_FOUND);
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

//export default { load, get, create, update, list, remove };
module.exports = { load, get, create, update, list, remove };
