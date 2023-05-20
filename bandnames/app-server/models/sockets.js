const BandList = require("./band-list");


class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('device connected con socket id: ', socket.id);

            // emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            // vote-band
            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // add-band
            socket.on('add-band', (name) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // delete-band
            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //change-band-name
            socket.on('change-band-name', ({id, name}) => {
                console.log('change-band-name', id, name)
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

        });

    }
}

module.exports = Sockets;