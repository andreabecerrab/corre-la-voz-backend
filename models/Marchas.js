var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var MarchaSchema=new Schema({
     id:Number,
    img:String,
     nombre:String,
     fecha:String,
    hashtag:String,
     descripcion:String,
    direccion:String,
});

module.exports = mongoose.model('Marcha',MarchaSchema);