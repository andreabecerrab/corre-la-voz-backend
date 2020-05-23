var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var ComentarioSchema=new Schema({
    nombre:String,
    fecha:String,
     contenido:String
});

module.exports = mongoose.model('Comentario',ComentarioSchema);