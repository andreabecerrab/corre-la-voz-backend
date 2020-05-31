const express = require("express");
const bodyParser = require("body-parser");
const Marcha = require("../models/Marcha");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpj": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP(file.mimetype);

    let error = new Error("Invalid mime type");

    if (isValid) {
      error = null;
    }
    cb(error, "/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP(file.mimetype);

    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

var router = express.Router();
const marchass_controller = require("../controllers/marchas-controller");

router.get("/", function (req, res) {
  res.json({ mensaje: "Heellou API" });
});

//add 400 responses
router
  .route("/marchas")
  .post(multer({ storage: storage }).single("img"), async (req, res) => {
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
