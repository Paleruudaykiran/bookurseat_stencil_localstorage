import { Component,h,State,Host,} from "@stencil/core";
import { buses } from "../data";
@Component({
    tag:'admin-home',
    styleUrl:'admin-home.css',
    shadow: true,
})
export class AdminHome {
    @State() ssrc: String = "";
    @State() sdst: String = "";
    @State() buses;
    @State() addbusform: boolean = false;

    @State() bid:String ="";
    @State() btravelsName:String = "";
    @State() bboards:String = "";
    @State() bstops:String = "";
    @State() bseats:String = "";
    @State() bprice:String = "";

    handlebIdInput(e) {
        this.bid = e.target.value;
    }
    handlebTravelsInput(e) {
        this.btravelsName = e.target.value;
    }
    handlebBoardsInput(e) {
        this.bboards = e.target.value;
    }
    handlebStopsInput(e) {
        this.bstops = e.target.value;
    }
    handlebSeatsInput(e) {
        this.bseats = e.target.value;
    }
    handlebPriceInput(e) {
        this.bprice = e.target.value;
    }
    componentWillLoad() {
        localStorage.setItem('buses',JSON.stringify(buses));
        this.buses = buses;
    }
    handleSearch(e) {
        e.preventDefault();
        let lbuses = JSON.parse(localStorage.getItem('buses'));
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
    handleDelete(e,id) {
        console.log(e);
       let fbuses = this.buses.filter((bus) => {
            if(bus.id != id) return bus;
       })
       localStorage.setItem('buses',JSON.stringify(fbuses));
       this.buses = [...fbuses];
    }
    handleBusAdd(e) {
      e.preventDefault();
       console.log(e)
    //    let id = (document.querySelector("#bid") as HTMLInputElement).value
    //    let travelsName = (document.getElementById("btravelsname") as HTMLInputElement).value
    //    let boards = (document.getElementById("bboards") as HTMLInputElement).value
    //    let stops = (document.getElementById("bstops") as HTMLInputElement).value
    //    let seats = (document.getElementById("bseats") as HTMLInputElement).value
    //    let price = (document.getElementById("bprice") as HTMLInputElement).value
        let buses = JSON.parse(localStorage.getItem('buses'))
        let bus = {
            id: this.bid,
            name: this.btravelsName,
            source: this.bboards,
            destination: this.bstops,
            seats: this.bseats,
            price: this.bprice,
        }
        buses.push(bus);
        localStorage.setItem('buses',JSON.stringify(buses));
        this.buses = buses;
        console.log(this.btravelsName);
        this.addbusform = false;
    }
    handleEdit(e,idx) {
        console.log(e);
        let buses = JSON.parse(localStorage.getItem("buses"))
        let fbuses = [];
        for(let i=0;i<buses.length;i++) {
            if(buses[i].id == idx) {
                this.bid = buses[i].id;
                this.btravelsName = buses[i].name;
                this.bboards = buses[i].source;
                this.bstops = buses[i].destination;
                this.bseats = buses[i].seats;
                this.bprice = buses[i].price;
            }else {
            fbuses.push(buses[i])
            }
        }
        this.addbusform = true;
        localStorage.setItem('buses',JSON.stringify(fbuses));
    }
    render() {
        return (
            <Host>
                <nav>
            <div>
               <div class="nav-firstcol">
                    {/* <div class="nav-logo"><i class="fa-solid fa-bus"></i></div> */}
                    <h2>Book Your Seat</h2>
                </div>
            </div>
            <ul class="items"> 
                    <div class="items">
                        <li class="item"><a  href="#">Admin</a></li>
                        <li class="item"><a href="#" onClick={()=>location.href="/"}>logout</a></li>
                    </div>
            </ul>
        </nav>
                <div>
                <div class="split">
			<h3>Welcome Admin</h3>
			<button class="add-btn icon" onClick={() => this.addbusform = !this.addbusform}>Add Bus</button>
		</div>
        {
            this.addbusform ? 
            <div class="container">
            <div class="title">Enter Bus Details</div>
                <div class="content">
                    <form action="" onSubmit={(e) => this.handleBusAdd(e)}>
                    <div class="user-details">
                        <div class="input-box">
                            <span class="details">Id</span>
                            <input id="bid" type="number" placeholder="Enter Id" required value={this.bid as string} onChange={(e) => this.handlebIdInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Travels Name</span>
                            <input id="btravlesname" type="text" placeholder="Enter Travels Name" required value={this.btravelsName as string} onChange={(e) => this.handlebTravelsInput(e)} />
                        </div>
                        <div class="input-box">
                            <span class="details">Boards At</span>
                            <input id="bboards" type="text" placeholder="Enter Boarding point" required value={this.bboards as string} onChange={(e) => this.handlebBoardsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Stops At</span>
                            <input id="bstops" type="text" placeholder="Enter Stoping point" required value={this.bstops as string} onChange={(e) => this.handlebStopsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Total Seats</span>
                            <input id="bseats" type="number" placeholder="Enter Toatal seats" value={this.bseats as string} onChange={(e) => this.handlebSeatsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Price</span>
                            <input id="bprice" type="number" placeholder="Enter price" required value={this.bprice as string} onChange={(e) => this.handlebPriceInput(e)} />
                        </div>
                        <div class="button">
                            <input type="submit" value="Confirm Details" />
                         </div>
                    </div>
                     </form>
                </div>
            </div>
            : <div>
		<div class="form-group search">
			<form method="get" action="#">
				<input type="text" id="ssource" placeholder="Boarding point"
					name="ssource" onChange={(e) => this.handleSsource(e)}/> 
                <input type="text" id="sdestination"
					placeholder="Stop Point" name="sdestination"  onChange={(e) => this.handleSdestination(e)} /> 
                <button class="btn" value="Search" onClick={(e) => this.handleSearch(e)}>Search</button>
			</form>
            </div>
                <table id="bavil">
						<thead>
							<th>Id</th>
							<th>Travels</th>
							<th>Boarding At</th>
							<th>Stops At</th>
							<th>Total Seats</th>
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
									<td><button key={bus.id} onClick={(e) => this.handleDelete(e,bus.id)}
										class="icon icon-delete btn"> Delete</button> 
                                        <button key={bus.id} onClick={(e) => this.handleEdit(e,bus.id)}
										class="icon icon-edit btn">Edit</button></td>
                                </tr>
                                )
                            }) }
                        </tbody>
                </table>
    
                </div>
    }
                </div>
            </Host>
        )
    }
}