const Usuario = require("../models/Usuarios");

exports.addUsuario = async function(req,res,next){
    let user_name = req.body.name || '-';
    let user_last_name = req.body.last_name || '-';
    let user_email = req.body.email;
    let user_type = req.body.type;
    let user_sub = req.body.sub;
    // console.log("user sub: " + user.sub);
    let user_exists = await Usuario.findOne({ sub: user_sub }).then((data) => {
        console.log(data);
        
            if(data === null){
                let user = new Usuario({
                    nombre: user_name,
                    apellido: user_last_name,
                    correo: user_email,
                    sub: user_sub,
                    tipo: user_type
                });
                try{
                    user.save().then((data) => {
                        res.json({ msg: user.name + " added."})
                    })
                } catch(err){
                    res.status(500).json({ msg: err });
                }
            }
        });
}

exports.getUsers = async function(req, res, next) {
    let users = await Usuario.find({ sub: "google-oauth2|114213436716257432224" });
    res.json(users);
}