import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface user {
  id?: number;
  // name?: string;
  email?: string;
  password?: string;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  registerUser: user = {};
  loginUser: user = {};
  error: string = '';
  regError: string = '';

  constructor(private route: Router) { }

  ngOnInit(): void { }
  registerUserfn() {
    this.error = '';
    let users = JSON.parse(localStorage.getItem('users') || '""') || [];
    this.registerUser.id = users.length + 1;
    let selectedUser = users.filter((userobj: any) => {
      return userobj.email === this.registerUser.email;
    });
    if (selectedUser.length === 1) {
      this.regError = 'Already Registered !!';
    } else {
      users.push(this.registerUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('logInUser', JSON.stringify(this.registerUser));

      this.route.navigate(['/list']);
      this.regError = 'Registeration Successfull ';
    }
  }
  
  loginUserfn() {
    this.error = '';
    let usersList: Array<user> = JSON.parse(localStorage.getItem('users') || '') || [];
    let selectedUser = usersList.filter((userobj: any) => {
      if(userobj.email === this.loginUser.email &&userobj.password === this.loginUser.password)
      this.loginUser.id=userobj.id;
      return (userobj.email === this.loginUser.email &&userobj.password === this.loginUser.password);

    });
    if (selectedUser.length === 0) {
      this.error = 'Inavlid username or password!';
    } else {
      localStorage.setItem('logInUser', JSON.stringify(this.loginUser));
      this.route.navigate(['/list']);
    }

    console.log(selectedUser);
  }
}
