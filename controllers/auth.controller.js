var passport = require('passport');
var User = require('../model/user.model');
var jwt = require('jsonwebtoken');
// var userCtrl = require('./user.controller');
var authCtrl = require('./auth.controller');
var crypto = require('crypto');
var config = require('../config/config');


function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};

function setPassword(user, password) {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  }
  
  function validPassword(user, password) {
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
  }

  function getExpiry() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return expiry;
  }
  
  function generateJwt(user) {
    var expiry = getExpiry();

    var token = jwt.sign({
        id: user.userId,
        email: user.email,
        name: user.username,
        exp: parseInt(expiry.getTime() / 1000),
        }, config.jwtSecret); 
  
    return token;
  }

function verifyJwt(token) {
    // invalid token - synchronous
    try {
        var decoded = jwt.verify(token, config.jwtSecret); 
        return true;
    } catch(err) {
        return false;
    }
}

function isValidUser(req) {
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization;
    var isValid = false;
    
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if (!err) {
                isValid = true;
            }
        });
    }

    return isValid;
}

// function getProfile(req, res) {
//     var isPermitted = isValidUser(res);
//     if(isValidUser == true)
//     {

//     }
// }

function register(req, res) {
    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { "message": "All fields required" });
        return;
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    //user.setPassword(req.body.password);
    authCtrl.setPassword(user, req.body.password);

    user.save(function(err) {
        var token;
        
        //token = user.generateJwt();
        token = generateJwt(user);
        expiry = getExpiry();

        res.status(200);
        res.json({"token" : token });
        res.json({"expires_at" : expiry });

    });
};

function isLoggedIn(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization;
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if (err) {
                //return res.status(401).send({ success: false, message: 'Sign in to continue.' });
                sendJSONresponse(res, 401, {"success": false, "message": "Sign in to continue."});
                return;
            } else {
                // if everything is good, save to request for use in other routes
                next();
            }
        });
    } else {
        // if there is no token return an error
        //return res.status(401).send({ success: false, message: 'Sign in to continue.' });
        sendJSONresponse(res, 401, {"success": false, "message": "Sign in to continue."});
        return;
    }
}


function loginUser(req, res, user) {
    // If a user is found
    if(user){
        token = generateJwt(user);
        expiry = getExpiry();

        var authResponse = {'token': token, 'expires_at': expiry};
        sendJSONresponse(res, 200, { "tokenpayload" : authResponse });
    } 
    else {
        // If user is not found
        sendJSONresponse(res, 401, {"message": info});
        return;
    }
}


function login(req, res) {

    if(!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {"message": "All fields required"});
      return;
    }
  
    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        sendJSONresponse(res, 404, {"message": err});
        return;
      }
  
      // If a user is found
      if(user){
        token = generateJwt(user);
        expiry = getExpiry();

        res.status(200);

        var authResponse = {'token': token, 'expires_at': expiry};
        sendJSONresponse(res, 200, { "tokenpayload" : authResponse });
        //res.json({"tokenpayload" : authResponse });
      } 
      else {
        // If user is not found
        sendJSONresponse(res, 401, {"message": info});
        return;
      }
    })(req, res);
   // else
    // {
    //   const err = new APIError('No such Soundtrack exists!', httpStatus.NOT_FOUND);
    //   next(err);
    // }
  };

  function loginViaGoogleCallback(req, res)
  {

            //authCtrl.loginUser(req, res, req.user);

            //res.redirect('http://localhost:4200/gallery');
  }

  function loginViaGoogle(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {"message": "All fields required"});
    //   return;
    // }
    //var newRequest = req.clone();

    passport.authenticate('google', 
        { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                  'https://www.googleapis.com/auth/userinfo.email']
    }, function(request, accessToken, refreshToken, profile, done){

      // If Passport throws/catches an error
      if (err) {
        sendJSONresponse(res, 404, {"message": err});
        return;
      }
  
      // If a user is found
      if(user){
        token = generateJwt(user);
        expiry = getExpiry();

        res.status(200);

        var authResponse = {'token': token, 'expires_at': expiry};
        sendJSONresponse(res, 200, { "tokenpayload" : authResponse });
        //res.json({"tokenpayload" : authResponse });
      } 
      else {
        // If user is not found
        sendJSONresponse(res, 401, {"message": info});
        return;
      }
    })(req, res);
   // else
    // {
    //   const err = new APIError('No such Soundtrack exists!', httpStatus.NOT_FOUND);
    //   next(err);
    // }
  };

  module.exports = { login, loginViaGoogle, loginViaGoogleCallback, loginUser, register, isLoggedIn, setPassword, validPassword, generateJwt, getExpiry };