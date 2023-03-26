const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require("path");
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);

        this.io = socketio(this.server, { /* configuraciones */});
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    sockets() {
        new Sockets(this.io);
    }

    execute() {
        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.sockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        });
    }

}

module.exports = Server;