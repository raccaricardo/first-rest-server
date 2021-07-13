const express = require("express");
const cors = require("cors");
require("dotenv").config();
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //routes path
    this.usersPath = "/api/users";

    //middlewares
    this.middlewares();
    //rutas de aplicacion
    this.routes();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //PUBLIC DIRECTORY
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes")); //aqui llamamos a todas las rutas de users
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
