const mongoose = require("mongoose");
const Comentario = require("../models/Comentarios");
const Marcha = require("../models/Marcha");
const Usuario = require("../models/Usuarios");

//add strike
exports.addMarcha = async function (req, res) {
  const marcha = new Marcha({
    img: req.body.img,
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    hashtag: req.body.hashtag,
    descripcion: req.body.desc,
    direccion: req.body.direccion,
  });

  try {
    const newMarcha = await marcha.save();
    res.status(201).json(newMarcha);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//get all strikes
exports.getMarchas = async function (req, res) {
  try {
    const marchas = await Marcha.find();
    res.json(marchas);
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
  res.json(res.marcha);
  next();
};

//edit one strike
exports.editSingleMarcha = async function (req, res, next) {
  try {
    marcha = await Marcha.findById(req.params.id);

    if (req.body.nombre != "" && req.body != null) {
      marcha.nombre = req.body.nombre;
    }
    if (req.body.hashtag != "" && req.hashtag != null) {
      marcha.hashtag = req.body.hashtag;
    }
    if (req.body.desc != "" && req.desc != null) {
      marcha.descripcion = req.body.desc;
    }
    if (req.body.direccion != "" && req.direccion != null) {
      marcha.direccion = req.body.direccion;
    }
    if (req.body.img != "" && req.img != null) {
      marcha.img = req.body.img;
    }
    if (req.body.fecha != "" && req.fecha != null) {
      marcha.fecha = req.body.fecha;
    }

    res.marcha = marcha;
    const updated = await res.marcha.save();
    res.json(updated);

    //checar
  } catch (err) {
    res.status(400).json({ message: err.message });
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

    marcha.imgs.push(req.body.img);
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
      lat: req.body.lat,
      lng: req.body.lng,
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
