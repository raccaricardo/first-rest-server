const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';
        // this.rolePath = '/api/role';
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body para recibir siempre un json en lugar de un script  
        this.app.use( express.json() );
        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require( '../routes/users.routes') );
        this.app.use(this.authPath, require( '../routes/auth.routes') );

    }
    async connectDB(){
      await dbConnection();
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log("todo ok");
        });
    }

}




module.exports = Server;
