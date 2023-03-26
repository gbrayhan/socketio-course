

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
      this.io.on('connection', (socket) => {
          console.log('device connected con socket id: ', socket.id);
          socket.emit('welcome', {
              from: 'Admin', text: 'Bienvenido a la aplicación', createdAt: new Date().getTime(), socketID: socket.id
          })
          socket.on('disconnect', () => {
              console.log('dispositivo desconectado');
          });

          setTimeout(() => {
              socket.emit('newMessage', {
                  from: 'Random', text: 'Random message after 3 seconds', createdAt: new Date().getTime()
              });
          }, 3000);

          socket.on('clientMessage', (data) => {
              console.log('Mensaje del cliente: ', data);
              // importante que sea io y no socket para que se envíe a todos los clientes conectados
              this.io.emit("serverMessage", {
                  from: 'Server', textMessage: data.textMessage, date: new Date().getTime(), socketID: socket.id
              });
          });
      });



  }
}

module.exports = Sockets;