const express = require("express");
var router = express.Router();

const app = express();
const checkJwt = require("../controllers/auth-controller");

router.post("/usuario/inicio", checkJwt, (req, res, next) => {
  console.log("pls wrk");
  //user_controller.addUsuario(req, res, next);
});

module.exports = router;
