const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl()


const socketController = (socket) =>{ 
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    //console.log('acá los ultimos cuatro: ' + JSON.stringify(ticketControl.ultimosCuatro))
    socket.emit('estado-actual', ticketControl.ultimosCuatro)

    socket.on('disconnect', ()=>{ // el SOCKET.ON es cuando el cliente lo envía y yo lo escucho
    //    console.log('cliente desconectado ',socket.id);
    })

    socket.on('siguiente-ticket',(payload, callback)=>{ // Acá escuchamos desde el back , lo que está en el scoket-client en los add event listeners. El payload es el mensaje que viene desde la función del addListener del socket-cliente
        const siguiente = ticketControl.siguiente();
        callback(siguiente)

        //TODO: Notificar que hay un ticket pendiente par aasignar
    })

    socket.on('atender-ticket',({ escritorio }, callback)=>{ // hace descontructing del payload y lo deja como {escritorio}
        if( !escritorio ){
            return callback({
                ok: false,
                message: 'El escritorio es obligatorio'
            })
        }
        
        const ticket = ticketControl.atenderTicket(escritorio)
        socket.broadcast.emit('estado-actual', ticketControl.ultimosCuatro)
        console.log('el ticket acá: ' + ticket)
        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        }else{
            callback({
                ok: true,
                ticket
            })
        }
    })

 }


module.exports = {
    socketController
}

/*

    console.log('Cliente comnectado ', socket.id); // cada socket tiene un ID


socket.on('enviar-mensaje',(payload, callback)=>{ // Acá escuchamos desde el back , lo que está en el scoket-client en los add event listeners. El payload es el mensaje que viene desde la función del addListener del socket-cliente
    
        const id = 12345678
        callback(id) // esto retroalimenta y le devuleve al cliente el id del mensaje que el envió
        socket.broadcast.emit('enviar-mensaje', payload) //broadcast hace que le mande un mensaje a todos
    })


*/