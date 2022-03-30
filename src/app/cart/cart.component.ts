import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService, Product_URL } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartList: any = [];
  grandTotal: number=0;

  constructor(private http: HttpClient, private prodService: ProductsService) {}

  ngOnInit(): void {
    this.getCartInfo();
  }

  getCartInfo() {
    this.cartList = JSON.parse(localStorage.getItem('cart') || '""') || [];
    this.cartList.forEach((cartObj: any) => {
      let detailURL = Product_URL.detail;
      detailURL = detailURL.replace('__productId__', cartObj.id);
      detailURL = detailURL.replace('__shopId__', cartObj.shopId);
      this.prodService.getProducts(detailURL).subscribe((product: any) => {
        let productDetail = this.prodService.mapProduct(product, 'data');
        cartObj.productDetail = productDetail;
        this.grandTotal=this.grandTotal + ((productDetail.price || 0 ) * cartObj.quantity)
      });
    });
  }

  totalfn(){
    this.grandTotal=0;
    this.cartList.forEach((cartDetail: any)=>{
      this.grandTotal=this.grandTotal + ((cartDetail.productDetail.price || 0 ) * cartDetail.quantity)
    });
  }

  totalPricefn(){
    var numVal1 =this.grandTotal;
    var numVal2 =0.1;
    var totalValue = numVal1 - (numVal1 * numVal2);
    return totalValue.toFixed(0);
  }

  removefn(id: string) {
    let newcartList=[];
    newcartList= this.cartList.filter((cart: any) => 
      cart.id !== id
    );
    this.cartList=newcartList;
    localStorage.setItem('cart', JSON.stringify(newcartList));
    this.totalfn();
  }
  addfn(id: string) {
    this.cartList.forEach((cartDetail: any) => {
      if (cartDetail.id == id) {
        cartDetail.quantity = cartDetail.quantity + 1;
        localStorage.setItem('cart', JSON.stringify(this.cartList));
        return;
      }
    });

    this.totalfn();
  }

  delfn(id: string) {
    this.cartList.forEach((cartDetail: any) => {
      if (cartDetail.id == id) {
        cartDetail.quantity = cartDetail.quantity - 1;
        localStorage.setItem('cart', JSON.stringify(this.cartList));
        return;
      }
    });
    this.totalfn();
  }
//   [
//     {
//         userid: loginuser.id;
//         orderid: cartlist.length+1;
//         product: {
//             id:        
//             price:
//             quantity:    
//            }         ---------------> products:[
//                                                {
//                                                    id:        
//                                                   price:
//                                                   quantity             
//                                                 }
//                                                     ]
        
//         totalprice: 
//     }
// ]
  checkOutList(){

    const d=new Date();
    let date=d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    let time=d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();;
    //1
    let user=JSON.parse(localStorage.getItem('logInUser') || '""') || {};
    if(user.id==undefined)
    return ;
    let userid=user.id;
    //2
    let cartList=JSON.parse(localStorage.getItem('cartList') || '""') || [];
    let orderid=cartList.length + 1;
    //3 comes from this.cartList
    let productList=this.cartList;
    //4 {{totalprice}}
    let totalprice= this.totalPricefn();
    //pushing for checkout
    cartList.push({userid,orderid,productList,totalprice,date,time});
    
    localStorage.setItem('checkoutList', JSON.stringify(cartList));
    //5 empty the cart
    localStorage.setItem('cart', JSON.stringify(''));
    this.getCartInfo();




  }
  
}
// first check length of cartlist and if it is more than 0 then iterate on loop
