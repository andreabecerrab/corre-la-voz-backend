const mongoose = require("mongoose");

//key, cambiar
const url =
  "mongodb+srv://new-user-corre-la-voz:correoVozLAA@cluster-corre-la-voz-oz0oz.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("DB succesfully connected...");
    console.log("DB ready 4 operations");
  })
  .catch((err) => {
    console.log("Error at DB" + err);
  });
