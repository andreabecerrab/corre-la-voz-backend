const Marcha = require("../models/Marcha");
const multer = require("multer");
const direccion_controller = require("../controllers/get-address");

//add strike
exports.addMarcha = async function (req, res, next) {
  const url = req.protocol + "://" + req.get("host");

  const marcha = new Marcha({
    img: url + "/images/" + req.file.filename,
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    hashtag: req.body.hashtag,
    descripcion: req.body.desc,
    direccion: await direccion_controller.getData(req.body.direccion),
  });
  try {
    marcha.save().then((created) => {
      res.status(200).json({ message: "Added" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all strikes
exports.getMarchas = async function (req, res) {
  try {
    //pagination
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Marcha.find();
    let marchas;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then((documents) => {
        marchas = documents;
        return Marcha.count();
      })
      .then((count) => {
        res.status(200).json({ marchas: marchas, maxPosts: count });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get one strike
exports.getSingleMarcha = async function (req, res, next) {
  try {
    marcha = await Marcha.findById(req.params.id);
    if (!marcha) {
      return res.status(404).json({ message: "Cant find this strike" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.marcha = marcha;
  res.status(200).json(res.marcha);
  next();
};

//edit one strike
exports.editSingleMarcha = async function (req, res, next) {
  try {
    marcha = await Marcha.findById(req.params.id);

    if (req.body.fecha != "" && req.body.fecha != null) {
      marcha.fecha = req.body.fecha;
    }

    if (req.body.nombre != "" && req.body.nombre != null) {
      marcha.nombre = req.body.nombre;
    }
    if (req.body.hashtag != "" && req.body.hashtag != null) {
      marcha.hashtag = req.body.hashtag;
    }
    if (req.body.desc != "" && req.body.desc != null) {
      marcha.descripcion = req.body.desc;
    }
    if (req.body.direccion != "" && req.body.direccion != null) {
      marcha.direccion = await direccion_controller.getData(req.body.direccion);
    }

    res.marcha = marcha;
    const updated = await res.marcha.save();
    res.json(updated);

    //checar
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete one strike
exports.deleteMarcha = async function (req, res) {
  try {
    marcha = await Marcha.findById(req.params.id);
    res.marcha = marcha;
    await res.marcha.remove();
    //delete this soon
    res.json({ message: "Succesfully deleted" });
    //checar
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async function (req, res) {
  try {
    marcha = await Marcha.findById(req.params.id);

    const comment = {
      nombre: req.body.nombre,
      fecha: req.body.fecha,
      contenido: req.body.contenido,
    };

    marcha.comentarios.push(comment);
    res.marcha = marcha;
    await res.marcha.save();

    res.json({ message: "Comment added" });
    //checar
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addImage = async function (req, res) {
  try {
    marcha = await Marcha.findById(req.params.id);

    const url = req.protocol + "://" + req.get("host");
    const newimg = url + "/images/shared/" + req.file.filename;
    marcha.imgs.push(newimg);

    res.marcha = marcha;
    await res.marcha.save();

    res.json({ message: "Image added" });
    //checar
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMarker = async function (req, res) {
  try {
    marcha = await Marcha.findById(req.params.id);
    const marker = {
      title: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    marcha.puntosLoc.push(marker);
    res.marcha = marcha;
    await res.marcha.save();
    res.json({ message: "Marker added" });
    //checar
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
