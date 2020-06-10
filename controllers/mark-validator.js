const { Joi } = require("express-validation");

const markValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
};
module.exports = markValidation;
