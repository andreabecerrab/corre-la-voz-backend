var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var UsuarioSchema= new Schema({
     
     nombre:String,
     apellido:String,
     correo:String,
     contrasena:String,
     tipo:String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);