const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.connectDB();
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users.routes'));
    }
    async connectDB(){
      await dbConnection();
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
            
        });
    }

}




module.exports = Server;
