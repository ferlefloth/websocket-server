//Referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
//const lblEscritorio = document.querySelector('h1')



const searchParams = new URLSearchParams( window.location.search ); //los params que viajan en la URL

if( !searchParams.has('escritorio')){
    console.log('adentro')
    window.location ='index.html'
    throw new Error('El escritorio es obligatorio')
}

// let escritorio2 =searchParams.get("escritorio") 
// let escritorio = escritorio2;
const escritorio = searchParams.get("escritorio") 
lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;


});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});


socket.on('ultimo-ticket',(ultimoTicket)=>{
  //  lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
})

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket',{ escritorio }, ( {ok, ticket, msg} )=>{
        console.log('el ticket: ' + ticket)
        if( !ok ){
            lblTicket.innerText = 'Nadie'
            return divAlerta.style.display = ''
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`
    })
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //      lblNuevoTicket.innerText = ticket;
    // });

});