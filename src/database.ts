import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Connexion establecida con la base de datos"))
  .catch((err) => console.log(err));
