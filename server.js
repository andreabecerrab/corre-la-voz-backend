const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// Initializationsrr
const app = express();
require("./database/database");
app.use(require("./routes/index"));
const checkJwt = require("./controllers/auth-controller");

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
