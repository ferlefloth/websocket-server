const socketController = (socket) =>{ 
    console.log('Cliente comnectado ', socket.id); // cada socket tiene un ID

    socket.on('disconnect', ()=>{ // el SOCKET.ON es cuando el cliente lo envía y yo lo escucho
    //    console.log('cliente desconectado ',socket.id);
    })

    socket.on('enviar-mensaje',(payload, callback)=>{ // Acá escuchamos desde el back , lo que está en el scoket-client en los add event listeners. El payload es el mensaje que viene desde la función del addListener del socket-cliente
    
        const id = 12345678
        callback(id) // esto retroalimenta y le devuleve al cliente el id del mensaje que el envió
        socket.broadcast.emit('enviar-mensaje', payload) //broadcast hace que le mande un mensaje a todos
    })



 }


module.exports = {
    socketController
}