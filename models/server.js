const express = require('express');
const cors =require('cors');

//its a good model to create a first server
class Server{ // ESTE ES EL PATRON SINGLETON
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.paths={}
    

        //middlewares
        this.middlewares();
        //rutas de mi aplicación
        this.routes();
    }

    routes(){
         
    //      this.app.use( this.paths.auth,       require('../routes/auth')) // import routes

    }

    listen(){
        this.app.listen( this.port ,()=>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }

    async connectDb (){
        await dbConnection();
    }

    middlewares(){ // los middlewares son la primer capa en la que los request se chocan con nuestra app
        //CORS
        this.app.use( cors() )
        //directorio público
        this.app.use( express.static('public') )
     
        //Lectura y parseo 
        this.app.use( express.json() ) // middleware para aceptar json cuando haces una petición
    }

}

module.exports = Server;