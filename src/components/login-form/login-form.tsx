import { Component,h,State} from "@stencil/core";

@Component({
    tag: 'login-form',
    styleUrl: 'login-form.css',
    shadow: true,
})
export class LoginForm {
    @State() uname: String;
    @State() pass: String;
    @State() success:boolean = false;

    @State() passError: String;
    @State() unameError: String;
    handleSubmit(e) {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users'));
        let loginUser = null;
        let admin = JSON.parse(localStorage.getItem('admin'));
        if(admin.name == this.uname && admin.pass == this.pass) {
            this.success = true;
            setTimeout(() => {location.href = '/adminhome'},1000);
        }else {
        for(let i=0;i<users.length;i++) {
            if(users[i].uname == this.uname && users[i].pass == this.pass) {
                this.success = true;
                loginUser = users[i];
            }
        }
        if(loginUser != null) {
        localStorage.setItem('loginUser',JSON.stringify(loginUser));
        setTimeout(() => {location.href = '/userhome'},1000);
        }}
    }
    handleUserInput(e) {
        this.uname = e.target.value;
        let f = 0
        let users = JSON.parse(localStorage.getItem('users'));
        let admin = JSON.parse(localStorage.getItem('admin'));
        for(let i=0; i<users.length; i++) {
            let user = users[i];
            // user = JSON.parse(user);
            if(user.uname === this.uname || admin.name === this.uname) {
                f = 1;
            }
        }
        if(f == 0) {
            this.unameError = "Not a valid Username..."
        }else {
            this.unameError = "";
        }
    }
    handlePassInput(e) {
        this.pass = e.target.value;
        let f = 0
        let users = JSON.parse(localStorage.getItem('users'));
        let admin = JSON.parse(localStorage.getItem('admin'));
        console.log(typeof users)
        for(let i=0; i<users.length; i++) {
            let user = users[i];
            // user = JSON.parse(user);
            if(user.pass === this.pass || admin.pass === this.pass) {
                f = 1;
            }
        }
        if(f == 0) {
            this.passError = "Not a valid password..."
        }else {
            this.passError = "";
        }
    }
    render() {
        return (
            <div>
            <nav-bar></nav-bar>
           <div class="container">
             {
    this.success ? <div class="success-card">Successfully logedIn. redirecting...</div> : ''
}
<div class="title">Login form</div>
<div class="content">
  <form action="test.php" onSubmit={(e) => this.handleSubmit(e)}>
    <div class="user-details">
      <div class="input-box">
        <span class="details">Username</span>
        <input type="text" placeholder="Enter your username" required  onChange={(e)=> this.handleUserInput(e)}/>
        <p class="error">{this.unameError}</p>
      </div>
      <div class="input-box">
        <span class="details">Password</span>
        <input type="password" placeholder="Enter your password" required onChange={(e) => this.handlePassInput(e)}/>
        <p class="error">{this.passError}</p>
      </div>
      <div class="button">
          <input type="submit" value="Register" />
        </div>
      </div>
      </form>
      </div>
      </div>
      </div>
        )
    }
}