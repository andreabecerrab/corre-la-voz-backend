var mongoose = require("mongoose");
const Comentario = require("./Comentarios");
const Marker = require("./Marker");
var Schema = mongoose.Schema;

var MarchaSchema = new Schema({
  img: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hashtag: { type: String, required: true },
  descripcion: { type: String, required: true },
  direccion: { type: JSON },

  //others
  comentarios: [Comentario],
  imgs: [String],
  puntosLoc: [Marker],
});

module.exports = mongoose.model("Marcha", MarchaSchema);
