import { Component,h,State } from "@stencil/core";
@Component({
    tag: 'registration-form',
    styleUrl: 'registration-form.css',
    shadow: true
})

export class registrationForm {
    @State() uname: string;
    @State() email:  string;
    @State() mno:  string;
    @State() pass:  string;
    @State() cpass: string;

    @State() unameError: String;
    @State() emailError: String;
    @State() cpassError: String;
    @State() success: boolean = false;
    handleSubmit(e) {
        e.preventDefault();
        this.success = true;
        let user = 
          {
            uname: this.uname,
            email: this.email,
            mno: this.mno,
            pass: this.pass,
          }
        if(localStorage.getItem('users') != null && localStorage.getItem('users') != undefined){
          let users = JSON.parse(localStorage.getItem('users'))
          users.push(user) 
          localStorage.setItem('users',JSON.stringify(users));
        }else {
          let users = [user]
          localStorage.setItem('users',JSON.stringify(users));
        }
        setTimeout(() => (location.href = '/login'), 1000);
    }
    handleUserInput(e) {
        this.uname = e.target.value;
        if(this.uname.length < 3) {
            this.unameError="must have a minimum 3 Characters"
        }else {
            this.unameError="";
        }
    }
    handleEmailInput(e) {
        this.email = e.target.value;
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(regex.test(this.email)) {
            this.emailError="";
        }else{
            this.emailError="Please provide a valid email address";
        }
    }
    handleCpassInput(e) {
        this.cpass = e.target.value;
       if(this.cpass != this.pass) {
        this.cpassError = "password must match."
       }else {
        this.cpassError = "";
       }
    }
    handlePassInput(e) {
        this.pass = e.target.value;
    }
    handleMnoInput(e) {
      this.mno = e.target.value;
  }
    render() {
        return (
            <div>
                <nav-bar></nav-bar>
               <div class="container">
                 {
        this.success ? <div class="success-card">Successful</div> : ''
    }
    <div class="title">Registration form</div>
    <div class="content">
      <form action="" onSubmit={(e) => this.handleSubmit(e)}>
        <div class="user-details">
          <div class="input-box">
            <span class="details">Username</span>
            <input type="text" placeholder="Enter your username" required  onChange={(e)=> this.handleUserInput(e)}/>
            <p class="error">{this.unameError}</p>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" placeholder="Enter your email" required onChange={(e) => this.handleEmailInput(e)}/>
            <p class="error">{this.emailError}</p>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" placeholder="Enter your number" required  onChange={(e) => this.handleMnoInput(e)}/>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="text" placeholder="Enter your password" required onChange={(e) => this.handlePassInput(e)}/>
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="text" placeholder="Confirm your password" required onChange={(e) => this.handleCpassInput(e)}/>
            <p class="error">{this.cpassError}</p>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  </div>
  </div>
        );
    }
}