const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const { ValidationError } = require("express-validation");

// Initializationsrr
const app = express();
app.use(helmet());

//conf
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8081;
const router = express.Router();

//
require("./database/database");
app.use(require("./routes/index"));
const checkJwt = require("./controllers/auth-controller");

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
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

const indexRoute = require("./routes/index");
const userRoute = require("./routes/signup");
app.use("/api", indexRoute);
app.use("/auth", userRoute);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

app.disable("etag");

app.listen(PORT, () => {
  console.log("Port listening in " + PORT);
});
