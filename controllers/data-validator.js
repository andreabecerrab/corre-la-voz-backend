const { validator, Joi } = require("express-validation");

const marchaValidation = {
  body: Joi.object({
    nombre: Joi.string(),
    fecha: Joi.string(),
    desc: Joi.string(),
    hashtag: Joi.string(),
    direccion: Joi.string(),
  }),
};
module.exports = marchaValidation;
