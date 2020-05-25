const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Initializations
const app = express();
require("./database/database");
app.use(require("./routes/index"));

//conf
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8081;
const router = express.Router();

//
app.use(morgan("dev"));

router.use(function (req, res, next) {
  console.log("Getting in API");
  next();
});

const indexRoute = require("./routes/index");
app.use("/api", indexRoute);

app.listen(PORT, () => {
  console.log("Port listening in " + PORT);
});
