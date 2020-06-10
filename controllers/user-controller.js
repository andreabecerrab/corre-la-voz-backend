const Usuario = require("../models/Usuarios");

let user_sub = '';

exports.addUsuario = async function(req,res,next){
    let user_name = req.body.name || '-';
    let user_last_name = req.body.last_name || '-';
    let user_email = req.body.email;
    let user_type = req.body.type;
    user_sub = req.body.sub;
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

exports.getUser = async function(req, res, next) {
    try{
        let user = await Usuario.findOne({ sub: user_sub });
        res.json(user);
    } catch(err) {
        res.status(404).json({ msg: err });
    }
}

exports.editUser = async function(req, res, next) {
    try{
        let user = await Usuario.findOne({ sub: user_sub });
        if(req.body.nombre != "" && req.body.nombre != null) {
            user.nombre = req.body.nombre;
        }
        if(req.body.apellido != "" && req.body.apellido != null){
            user.apellido = req.body.apellido;
        }

        res.user = user;
        const updated = await res.user.save();
        res.json(updated);
    } catch(err) {
        res.status(500).json({ msg: err });
    }
}