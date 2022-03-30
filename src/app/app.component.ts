import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  logInUser: any={


  };


  ngOnInit(): void {


  }

  logInfn(){
    this.logInUser = JSON.parse(localStorage.getItem('logInUser') || '""') || {};
    //console.log(this.logInUser.id);
    if(this.logInUser.id==undefined)
    return "Login | Signup";
    else
      return this.logInUser.email;
  }

  logOutfn(){
    this.logInUser={};
    localStorage.setItem('logInUser', JSON.stringify({}));
    this.logInfn();
  }

  getCartCount() {
    let cartlist = JSON.parse(localStorage.getItem('cart') || '""') || [];
    return cartlist.length;
  }
}
