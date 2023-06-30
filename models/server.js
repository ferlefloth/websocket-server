const express = require('express');
const cors =require('cors');
const { socketController } = require('../sockets/controller')

//its a good model to create a first server
class Server{ // ESTE ES EL PATRON SINGLETON
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server) //io son los sockets que están conectados, acá esta toda la info de los clientes
        this.paths={};
    

        //middlewares
        this.middlewares();
        //rutas de mi aplicación
        this.routes();
        //Sockets
        this.sockets()
    }

    routes(){
         
    //      this.app.use( this.paths.auth,       require('../routes/auth')) // import routes

    }

    sockets(){

        this.io.on('connection',socketController ) // el THIS.IO es cuando el servidor lo envía

    }

    listen(){
        this.server.listen( this.port ,()=>{
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