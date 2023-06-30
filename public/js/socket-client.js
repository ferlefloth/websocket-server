//Referencias del html
const lblOnline  = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const btnEnviar = document.querySelector('#btnEnviar')
const txtMensaje =  document.querySelector('#txtMensaje')

const socket = io();

socket.on('connect',()=>{
    console.log('Conectado')
    lblOffline.style.display= 'none'
    lblOnline.style.display= ''
})

socket.on('disconnect',()=>{
    console.log('Desconectado del servidor')
    lblOffline.style.display= ''
    lblOnline.style.display= 'none'
})

socket.on('enviar-mensaje',(payload)=>{
    console.log('el payload que me mandó el servidor: ' + JSON.stringify(payload))
})


btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;
    const payload = {
        message: mensaje,
        uid: "123",
        date : new Date()
    }
    socket.emit('enviar-mensaje',payload, ( id )=>{ //se puede mandar un trercer callback
        console.log('desde el server', id)
    })



})