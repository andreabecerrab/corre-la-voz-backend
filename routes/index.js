const express = require("express");
const bodyParser = require("body-parser");
const Marcha = require("../models/Marcha");

var router = express.Router();
const marchass_controller = require("../controllers/marchas-controller");

router.get("/", function (req, res) {
  res.json({ mensaje: "Heellou API" });
});

//add 400 responses
router
  .route("/marchas")
  .post(async (req, res) => {
    marchass_controller.addMarcha(req, res);
  })
  .get(async (req, res) => {
    marchass_controller.getMarchas(req, res);
  });
router.route("/marcha/:id").get(async (req, res, next) => {
  marchass_controller.getSingleMarcha(req, res, next);
});
router.route("/edit-marcha/:id").put(async (req, res, next) => {
  marchass_controller.editSingleMarcha(req, res, next);
});
router.route("/delete-marcha/:id").delete(async (req, res) => {
  marchass_controller.deleteMarcha(req, res);
});
router.route("/add-comment/:id").put(async (req, res) => {
  marchass_controller.addComment(req, res);
});
router.route("/add-img/:id").put(async (req, res) => {
  marchass_controller.addImage(req, res);
});
router.route("/add-marker/:id").put(async (req, res) => {
  marchass_controller.addMarker(req, res);
});

module.exports = router;
