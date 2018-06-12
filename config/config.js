var Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(3000),
  SLIDE_SERVER_API_KEY: Joi.string().required()  
    .description('JWT Secret required to sign'),
  GOOGLE_CLIENT_ID: Joi.string().required()  
    .description('Google Client ID required to sign via Google'),
  GOOGLE_API_KEY: Joi.string().required()  
    .description('Google Secret required to sign via Google'),
  GOOGLE_REDIRECT_URI: Joi.string().required()  
    .description('Google redirect required to sign via Google'),
//   MONGOOSE_DEBUG: Joi.boolean()
//     .when('NODE_ENV', {
//       is: Joi.string().equal('development'),
//       then: Joi.boolean().default(true),
//       otherwise: Joi.boolean().default(false)
//     }),
//   MONGO_HOST: Joi.string().required()
//     .description('Mongo DB host url'),
//   MONGO_PORT: Joi.number()
//     .default(27017)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
//   mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.SLIDE_SERVER_API_KEY,
  GoogleSecret: envVars.GOOGLE_API_KEY,
  GoogleClientId: envVars.GOOGLE_CLIENT_ID,
  GoogleRedirect: envVars.GOOGLE_REDIRECT_URI
//   mongo: {
//     host: envVars.MONGO_HOST,
//     port: envVars.MONGO_PORT
//   }
};

//export default config;
module.exports = config;

