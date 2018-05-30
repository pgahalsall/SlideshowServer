// import Joi from 'joi';
var Joi = require('Joi');

//export default {
module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
   // POST /api/slide
   createSlide: {
    body: {
      slideName: Joi.string().required(),
      slideCode: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
   // POST /api/slideshow
   createSlideshow: {
    body: {
      title: Joi.string().required(),
      producer: Joi.string().required()
    }
  },
  // POST /api/soundtrack
  createSoundtrack: {
    body: {
      song: Joi.string().required(),
      musician: Joi.string().required()
    }
  },
  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required(),
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  // UPDATE /api/slide/:slideId
  updateSlide: {
    body: {
      slideName: Joi.string().required(),
      slideCode: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      slideName: Joi.string().required(),
      slideCode: Joi.string().hex().required()
    }
  },
  // UPDATE /api/slidehow/:id
  updateSlideshow: {
    body: {
      title: Joi.string().required(),
      producer: Joi.string().required()
    },
    params: {
      title: Joi.string().required()
    }
  },
// UPDATE /api/soundtrack/:id
updateSoundtrack: {
  body: {
    song: Joi.string().required(),
    musician: Joi.string().required()
  },
  params: {
    song: Joi.string().required()
  }
},
  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      postId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
