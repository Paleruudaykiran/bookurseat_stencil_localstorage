import { Component,h } from "@stencil/core";

@Component({
    tag: 'confirm-booking',
    styleUrl: 'confirm-booking.css',
    shadow: true,
})
export class ConfirmBooking {
    bid = "";
    bname = "";
    bsource = "";
    bdestination = "";
    bseats = "";
    bprice = "";
    name = "";
    email = "";
    mno = "";
    uname = "";
    uemail = "";
    upass = "";
    umno = "";
    selectedSeats = "";
    tprice:number = 0;
    componentWillLoad() {
        let bus = JSON.parse(localStorage.getItem('bookingbus'))
        let user = JSON.parse(localStorage.getItem('loginUser'))
        let selectedSeats:[] = JSON.parse(localStorage.getItem('seatsbooked'))
        this.uname = user.uname;
        this.uemail = user.email;
        this.umno = user.mno;
        this.bid = bus.id;
        this.bname = bus.name;
        this.bsource = bus.source;
        this.bdestination = bus.destination;
        this.bseats = bus.seats;
        this.bprice = bus.price;
        this.selectedSeats = selectedSeats.join(" ");
        console.log(selectedSeats);
        console.log(selectedSeats.length);
        let ct:number = selectedSeats.length 
        this.tprice = ct * (this.bprice as unknown as number);
        let booking = {
            pnr:Math.floor(Math.random()*100),
            user,
            bus,
            seatsbooked: this.selectedSeats,
            price:this.tprice
        }
        let bookings = JSON.parse(localStorage.getItem('bookings'))
        bookings.push(booking);
        localStorage.setItem('bookings',JSON.stringify(bookings));
    }
    render(){
        return (
            <section>
            <nav-bar></nav-bar>
            <div class="container">
                <h1 class="title">Your booking is confirmed</h1>
            <div class="content">
                 <div id="busdetails" style={{margin:"10px auto;"}}>
                     <div class="litem">
                     <div class="ditem">
                         <p class="">PNR no: </p>
                         <p id="pnr">{Math.floor(Math.random()*100000)}</p>
                     </div>
                     <div class="ditem">
                         <p>Bus Id: </p>
                         <p id="tid">{this.bid}</p>
                     </div>
                     
                     <div class="ditem">
                         <p>Travels Name: </p>
                         <p id="tname" >{this.bname}</p>
                     </div>
                     <div class="ditem">
                         <p>Boarding At: </p>
                         <p id="boards">{this.bsource}</p>
                     </div>
                     <div class="ditem">
                         <p>Stops At: </p>
                         <p id="stops" >{this.bdestination}</p>
                     </div>
                     <div class="ditem title">
                         <p>Total Price: </p>
                         <p id="tprice" >{this.tprice}</p>
                     </div>
                     <div class="ditem title">
                         <p>Your Seats: </p>
                         <p id="yseats" >{this.selectedSeats}</p>
                     </div>
                     </div>
                     <div class="litem">
                         <div class="ditem">
                             <p>Name: </p>
                             <p id="cname" >{this.uname}</p>
                         </div>
                         <div class="ditem">
                             <p>Email: </p>
                             <p id="email" >{this.uemail}</p>
                         </div>
                         <div class="ditem">
                             <p>Mobile no: </p>
                             <p id="mno">{this.umno}</p>
                         </div>
                     </div>
                 </div>
            </div>
            </div>
         </section>
         
        )
    }
}