import { Component,h,State} from "@stencil/core";

@Component({
    tag: 'user-home',
    styleUrl: 'user-home.css',
    shadow: true,
})
export class UserHome {
    @State() buses = [];
    @State() ssrc = "";
    @State() sdst = "";
    componentWillLoad() {
        this.buses = JSON.parse(localStorage.getItem('buses'));
    }
    handleSearch(e) {
        e.preventDefault();
        let lbuses = JSON.parse(localStorage.getItem('buses'));
        this.buses = [...lbuses];
        let sbuses = lbuses.filter((bus) => {
            if(this.ssrc == "" && this.sdst == ""){
                return bus;
            }
            if(bus.source == this.ssrc || bus.destination == this.sdst) {
                return bus;
            } 
        })
        this.buses = [...sbuses];
    }
    handleSsource(e) {
        this.ssrc = e.target.value;
    }
    handleSdestination(e) {
        this.sdst = e.target.value;
    }
    handleBooking(e,idx) {
        console.log(e);
        let bus = {};
        let lbuses = JSON.parse(localStorage.getItem('buses'));
        for(let i=0;i<lbuses.length;i++) {
            if(lbuses[i].id == idx) {
                bus = lbuses[i];
                break;
            }
        }
        localStorage.setItem('bookingbus',JSON.stringify(bus));
        location.href = "/booking";
    }
    render() {
        return (
            <div>
                <nav-bar />
                <div class="bg-container">
        <div class="bg">
            <h1 class="bg-content">
                The <span class="special">journey</span> of a thousand miles begins with a single step.
            </h1>
        </div>
    </div>
    <div id="bys" class="twocollayout">
        <div class="firstcol">
            Make Your <span class="special">Journey</span> Special, Choose right thing in right time
        </div>
        <div class="secondcol">
         <form action="#" onSubmit={(e) => this.handleSearch(e)}>
                <label htmlFor="start">From</label>
                <input value={this.ssrc as string} class="sinput" type="text" placeholder="Onboarding point" id="start" name="start" onChange={(e) => this.handleSsource(e)} />
                <label htmlFor="end">To</label>
                <input value={this.sdst as string} class="sinput" type="text" placeholder="Droping point" id="end" name="end" onChange={(e) => this.handleSdestination(e)}/ >
                <button class="btn" type="submit">Submit</button>
         </form>
        </div>
    </div>
    <div>
        <h2 class="header">Make Your Own Choice</h2>
        <table id="bavil">
            <thead>
                <th>Id</th>
                <th>Travels</th>
                <th>Boarding At</th>
                <th>Stops At</th>
                <th>Seats Available</th>
                <th>Cost</th>
                <th>Actions</th>
            </thead>
            <tbody>
            { this.buses.map((bus) => {
                                return ( 
                                    <tr key={bus.id}>
                                    <td>{bus.id}</td>
									<td>{bus.name}</td>
									<td>{bus.source}</td>
									<td>{bus.destination}</td>
									<td>{bus.seats}</td>
									<td>{bus.price}</td>
                                    <td>
                                        <button key={bus.id} class="btn" onClick={(e) => this.handleBooking(e,bus.id)}>Book</button>
                                    </td>
                                </tr>
                                )
                            }) }
            </tbody>
        </table>
    </div>
            </div>
        )
    }
}