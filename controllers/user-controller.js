const Usuario = require("../models/Usuarios");

exports.addUsuario = async function(req,res,next){
    let userTemp = req.body.user_for_db;
    console.log(userTemp);   
}