import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService, Product_URL } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    // rating: {},
  };

  cartExist: boolean = this.checkProduct();

  constructor(private _activeRoute: ActivatedRoute, private http: HttpClient,private prodService: ProductsService) {}

  ngOnInit(): void {
    let id = this._activeRoute.snapshot.paramMap.get('id') || '""';
  
    let shopId = this._activeRoute.snapshot.paramMap.get('shopId') || '""';
   // console.log(this.product.id,this.product.shopId);
    //console.log(this._activeRoute.snapshot.paramMap);
    let detailURL = Product_URL.detail;
    detailURL = detailURL.replace('__productId__', id);
    detailURL = detailURL.replace('__shopId__', shopId);
    // this.http
    //   .get(detailURL)
    //   .subscribe((product: any) => {
      
    //     this.product = this.prodService.mapProducts(product,'data');
        
    //   });
      this.prodService.getProducts(detailURL).subscribe((product: any) =>{
        this.product=this.prodService.mapProduct(product,'data')
      });
  }

  addTofn() {
   // console.log('hey');
    let cart = JSON.parse(localStorage.getItem('cart') || '""') || []; // []
   // console.log(cart);
   let cartDetail={
     id: '',
     shopId: '',
     quantity: 1
   };
   cartDetail.id=this.product.id;
   cartDetail.shopId=this.product.shopId;

    cart.push(cartDetail);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  checkProduct() {
    let cart = JSON.parse(localStorage.getItem('cart') || '""') || [];
    let productexist = cart.filter((cartObj: any) => {
      return cartObj.id === this.product.id;
    });
  //  console.log(productexist.length, productexist.length > 0);
    return productexist.length > 0;
  }
}
