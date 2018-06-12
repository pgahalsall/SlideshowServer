var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../config/param-validation');
var userCtrl = require('../controllers/user.controller');
var authCtrl = require('../controllers/auth.controller');

var router = express.Router();
var mockUserData = require('../data/mockUsers.json');
var User = require('../model/user.model')



router.route('/')
  /** GET /api/users - Get list of users */
  .get(authCtrl.isLoggedIn, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), authCtrl.isLoggedIn, userCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), authCtrl.isLoggedIn, userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(authCtrl.isLoggedIn, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);


module.exports = router;
