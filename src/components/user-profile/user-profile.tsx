import {Component,h,Host,State} from '@stencil/core'

@Component({
    tag: 'user-profile',
    styleUrl: 'user-profile.css',
    shadow: true,
})
export class UserProfile {
    @State() bookingsloaded: boolean = false;
    user=null;
    bookings=[]
    componentWillLoad() {
        let user = JSON.parse(localStorage.getItem('loginUser'));
        this.user = user;
        console.log(user);
        this.setBookings(user)
    }
    setBookings(user) {
        let bookings = JSON.parse(localStorage.getItem('bookings'))
        bookings = bookings.filter((booking) => {
            console.log(booking.user.uname,user.uname);
            console.log(booking.user);
            if(booking.user.uname == user.uname) {
                return booking
            }
        })
        console.log(bookings);
        this.bookings = bookings;
        this.bookingsloaded = true;
    }
    render() {
        return (
            <Host>
                <nav-bar></nav-bar>
                <div class="grid-container">
                    <div class="griditem1">
                        <h2>My account</h2>
                        <div>
                            <div>
                                {this.user.uname}
                            </div>
                            <div>
                                <p>{this.user.email}</p>
                                <p>{this.user.mno}</p>
                            </div>
                            <div>
                                <a href="/userhome" class="startbtn">Start Booking</a>
                                {/* <a class="editbtn">Edit</a> */}
                            </div>
                        </div>
                    </div>
                    {this.bookingsloaded ? 
                    <div class="griditem2">
                        <h2>My Bookings</h2>
                        <div class="bookings">
                        {this.bookings.map((booking) => {
                            return (
                                <div class="booking">
                                    <div class="booking-title">
                                        <h3 class="boards">{booking.bus.source}</h3>
                                        <h6>To</h6>
                                        <h3 class="stops">{booking.bus.destination}</h3>
                                    </div>
                                    <div class="booking-details">
                                        <div class="booking-detail">
                                            <h4>PNR: </h4>
                                            <h3>{booking.pnr}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Bus No: </h4>
                                            <h3>{booking.bus.id}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Travels Name: </h4>
                                            <h3>{booking.bus.name}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Seat Nos: </h4>
                                            <h3>{booking.seatsbooked}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Cost: </h4>
                                            <h3>{booking.price}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    : <div class="griditem2">
                        <h4>Loading bookings...</h4>
                      </div>}        
                </div>
            </Host>
        )
    }
}