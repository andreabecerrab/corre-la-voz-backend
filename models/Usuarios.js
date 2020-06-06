var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var UsuarioSchema= new Schema({
     
     nombre:String,
     apellido:String,
     correo:String,
     sub:String,
     tipo:String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);