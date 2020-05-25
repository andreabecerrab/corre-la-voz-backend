// router.route("/usuarios").post(function (request, res) {
//   const usuario = new Usuario();

//   usuario.nombre = request.body.nombre;
//   usuario.apellido = request.body.apellido;
//   usuario.correo = request.body.correo;
//   usuario.contrasena = request.body.contrasena;
//   usuario.tipo = request.body.tipo;

//   usuario.save(function (errores) {
//     if (errores) {
//       console.log(errores);
//       res.send(errores);
//     }
//     res.json({ mensaje: "usiario creado" });
//   });
// });
