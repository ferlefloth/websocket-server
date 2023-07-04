const path = require('path');
const fs = require('fs');


class Ticket{
    
    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    
    }   

}


class TicketContol {

    constructor(){
        this.ultimo        = 0; //último ticket
        this.hoy           = new Date().getDate(); // tira el día con el 
        this.tickets       = [];
        this.ultimosCuatro = [];
        this.init()
    }

    get toJson(){ // get para traerme el json de la db
        return{
            ultimo:        this.ultimo,        
            hoy:           this.hoy,
            tickets:       this.tickets,       
            ultimosCuatro: this.ultimosCuatro 
        }
    }

    init(){
        const data = require('../db/data.json')
        const {ultimo, hoy , tickets, ultimosCuatro} = data;

        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimosCuatro = ultimosCuatro;
        }else{
            this.guardarDB();
        }


    }

    guardarDB(){
        
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJson ))
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDB();
        return 'Ticket ' + ticket.numero
    }

    atenderTicket(escritorio){
        //no tenemos tickets
        console.log('el escritorio: ' + escritorio)
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift(); //borra el primero y lo guarda en la varialbe


        ticket.escritorio = escritorio;
        this.ultimosCuatro.unshift(ticket) //lo agrega al primer

        if(this.ultimosCuatro > 4){
            this.ultimosCuatro.splice(-1,1)
        }
        this.guardarDB()

        return ticket
    }


}

module.exports = TicketContol;