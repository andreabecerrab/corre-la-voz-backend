const express = require("express");
const bodyParser = require("body-parser");
const Marcha = require("../models/Marcha");
const { validate } = require("express-validation");

var router = express.Router();
const marchass_controller = require("../controllers/marchas-controller");
const storage_controller = require("../controllers/save-image");
const marchaValidation = require("../controllers/data-validator");
const commentValidation = require("../controllers/comment-validator");
const marktValidation = require("../controllers/mark-validator");

router.get("/", function (req, res) {
  res.json({ mensaje: "Heellou API" });
});
var multer = require("multer");

//add 400 responses
router
  .route("/marchas")
  .post(
    validate(marchaValidation),
    multer({ storage: storage_controller.storage }).single("img"),
    async (req, res, next) => {
      marchass_controller.addMarcha(req, res, next);
    }
  )
  .get(async (req, res) => {
    marchass_controller.getMarchas(req, res);
  });
router.route("/marcha/:id").get(async (req, res, next) => {
  marchass_controller.getSingleMarcha(req, res, next);
});
router.route("/edit-marcha/:id").put(async (req, res, next) => {
  console.log(req.body);
  marchass_controller.editSingleMarcha(req, res, next);
});
router.route("/delete-marcha/:id").delete(async (req, res) => {
  marchass_controller.deleteMarcha(req, res);
});
router
  .route("/add-comment/:id")
  .put(validate(commentValidation), async (req, res) => {
    marchass_controller.addComment(req, res);
  });
router
  .route("/add-img/:id")
  .put(
    multer({ storage: storage_controller.storage_shared }).single("img"),
    async (req, res) => {
      marchass_controller.addImage(req, res);
    }
  );
router
  .route("/add-marker/:id")
  .put(validate(marktValidation), async (req, res) => {
    marchass_controller.addMarker(req, res);
  });

module.exports = router;
