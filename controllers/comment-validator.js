const { validator, Joi } = require("express-validation");

const commentValidation = {
  body: Joi.object({
    nombre: Joi.string().required(),
    fecha: Joi.string().required(),
    contenido: Joi.string().required(),
  }),
};
module.exports = commentValidation;
