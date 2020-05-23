// puerta de netrada para mi applicacion
var express= require('express');
var app=express();
var bodyParser=require('body-parser');
var morgan=require('morgan');
var mongoose =require('mongoose');
var Comentario =require('./models/Comentarios');
var Marcha=require('./models/Marchas');
var Usuario= require('./models/Usuarios');
// configuracion de base de datos 
const url='mongodb+srv://new-user-corre-la-voz:correoVozLAA@cluster-corre-la-voz-oz0oz.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

// configura mi aplicacion de node con express
//paso para enviar peticiones a consola

app.use(morgan('dev'));
//codificacion de url y recibira json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// establecimiento de coneccion de base de datos 
var basededatos= mongoose.connection;
basededatos.on('error',console.error.bind(console,'ocurrio un problema en la conexión de la base de datos'));
//configuracion levanta la url
basededatos.once('openuri',function(){
    console.log("se establecio la conexion a la base de datos");
})

var puertoHTTP=process.env.PORT || 8081;
var router =express.Router();

router.use(function(request,response,next){
    console.log('entrando a la api');
    next();
});

router.get('/', function(request,response){

    response.json({mensaje:"Api generada"});


});

router.route("/usuarios").post(function(request,res){
            var usuario= new Usuario();
            
       
            usuario.nombre=request.body.nombre;
            usuario.apellido=request.body.apellido;
            usuario.correo=request.body.correo;
            usuario.contrasena=request.body.contrasena;
            usuario.tipo=request.body.tipo;

            
            usuario.save(function(errores){
                if(errores){
                    console.log(errores);
                    res.send(errores);
                }
                res.json({mensaje:'usiario creado'});
            });

           


        })

router.route("/comentarios").post(function(request,res){
            var comentario= new Comentario();

            comentario.nombre=request.body.nombre;
            comentario.fecha=request.body.fecha;
            comentario.contenido=request.body.contenido;
            
            comentario.save(function(errores){
                if(errores){
                    console.log(errores);
                    res.send(errores);
                }
                res.json({mensaje:'cometario creado'});


            });



})

router.route("/marchas").post(function(request,res){
            var marcha= new Marcha();
            marcha.img=request.body.img;
            marcha.nombre=request.body.nombre;
            marcha.hashtag=request.body.hashtag;
            marcha.descripcion=request.body.descripcion;
            marcha.direccion=request.body.direccion;

            marcha.save(function(errores){
                if(errores){
                    console.log(errores);
                    res.send(errores);
                }
                res.json({mensaje:'marcha creada'});

            });


})
           
            


//registrar rutas
app.use('/apicorrelavoz',router);
app.listen(puertoHTTP);
console.log("esta corriendo el puerto"+puertoHTTP);
