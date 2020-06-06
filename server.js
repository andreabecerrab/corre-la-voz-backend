const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
<<<<<<< HEAD
=======
const user_controller = require('./controllers/user-controller');
>>>>>>> dbc6996de6d4ca444b7978fff23a32f2d5c644ec

// Auth0 config

const authConfig = {
  domain: 'dev-hmnnmmhr.auth0.com',
  audience: 'http://localhost:8081'
}

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-hmnnmmhr.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Initializationsrr
const app = express();
require("./database/database");
app.use(require("./routes/index"));

//conf
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8081;
const router = express.Router();

//for imgs
app.use("/images", express.static(path.join("./images")));
app.use("/images/shared", express.static(path.join("./images/shared")));
//
app.use(morgan("dev"));

var corsOptions = {
  origin: "*",
  opptionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

router.use(function (req, res, next) {
  console.log("Getting in API");
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

const indexRoute = require("./routes/index");
app.use("/api", indexRoute);

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

<<<<<<< HEAD
=======
router.post('/usuario/inicio', checkJwt, (req, res, next) => {
  console.log('pls wrk');
  user_controller.addUsuario(req,res,next);
});

>>>>>>> dbc6996de6d4ca444b7978fff23a32f2d5c644ec
app.disable("etag");

app.listen(PORT, () => {
  console.log("Port listening in " + PORT);
});
