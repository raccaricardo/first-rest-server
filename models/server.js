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
    
    //Lectora y parseo del body(sirve para evitar que ingresen scripts maliciosos a nuestro servidor)
    this.app.use(express.json());
    //PUBLIC DIRECTORY
    this.app.use(express.static("public"));
  }
  routes() {
    //ES UN MIDDLEWARE CONDICIONAL. ES DECIR, CUANDO PASE POR UNA RUTA, SUCEDE ALGO
    //THIS.USERSPATH CONDICIONA LAS RUTAS DEL USERS.ROUTES, ES DECIR, TODAS LAS REQ PASAN POR
    // THIS.USERSPATH SIN IMPORTAR LO QUE DIGA USERS.ROUTES(SOLO TOMA EN CUENTA LOS GET/POST) 
    this.app.use( this.usersPath, require("../routes/users.routes")); //aqui llamamos a todas las rutas de users
    
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
