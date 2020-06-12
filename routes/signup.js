const express = require("express");
var router = express.Router();
const user_controller = require('../controllers/user-controller');

const app = express();
const checkJwt = require("../controllers/auth-controller");

router.post("/usuario/inicio", checkJwt, (req, res, next) => {
  user_controller.addUsuario(req, res, next);
});

router.get("/usuario", checkJwt, (req,res,next) => {
  user_controller.getUser(req, res, next);
})

router.put("/edit/usuario", checkJwt, (req,res,next) => {
  user_controller.editUser(req, res, next);
})

module.exports = router;
