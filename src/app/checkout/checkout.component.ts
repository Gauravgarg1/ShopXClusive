import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutList: any=[];

  constructor() { }

  ngOnInit(): void {

   this.checkoutList= JSON.parse(localStorage.getItem('checkoutList') || '""') || [];

  }

}
