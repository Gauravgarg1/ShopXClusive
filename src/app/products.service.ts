import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  shopId?: string;
  rating?: string;
  description?: string; // ? this means it is not mandatory
  // colourOption?: Array<string>;
  // size?: Array<string>;
  variations?: any;
  images?: Array<string>;
  discount?: string;
  bdisprice?: number;
  totalPrice?: number;
  ShopLocation?: string;
  sold?: number;
  brand?: string;
  attributes?: any;
}

export interface Category {
  name?: string;
  count?: string;
}

export interface Brand {
  name?: string;
}
export const Product_URL = {
  list: 'https://shopee.in/api/v4/search/search_items?by=relevancy&keyword=__searchKeyword__&limit=__limit__&newest=__page__&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2',
  detail:
    'https://shopee.in/api/v4/item/get?itemid=__productId__&shopid=__shopId__',
  category:
    'https://shopee.in/api/v4/search/search_filter_config?keyword=__searchKeyword__&page_type=search',
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(url: string) {
    return this.http.get(url);
  }
  mapProducts(products: any, productObj: string) {
    let _products: Array<Product> = [];
    products.items.map((product: any) => {
      _products.push(this.mapProduct(product, 'item_basic'));
    });
    return _products;
  }
  mapProduct(product: any, productObj: string) {
    let _product: Product = {};
    _product.id = product[productObj].itemid;
    _product.ShopLocation=product[productObj].shop_location;
    _product.sold = product[productObj].sold;
    _product.title = product[productObj].name;
    _product.price = product[productObj].price / 100000;
    _product.image = product[productObj].image;
    _product.shopId = product[productObj].shopid;
    _product.rating =parseFloat( product[productObj].item_rating.rating_star ).toFixed(1);

    _product.description = product[productObj].description;
    if (productObj == 'data') {
      _product.brand = product[productObj].brand;
      _product.attributes = product[productObj].attributes;
      _product.variations=[];
      product[productObj].tier_variations.map((variation: any)=>{
        let varObj: any={};
        varObj.name= variation.name;
        varObj.options= variation.options;
        _product.variations.push(varObj);
      })

    //   if(product[productObj].tier_variations[0]){
    //   _product.colourOption = product[productObj].tier_variations[0].options;
    //   }
    //   if(product[productObj].tier_variations[1]){
    //   _product.size = product[productObj].tier_variations[1].options;
    // }
    }
    _product.images = product[productObj].images;
    _product.discount = product[productObj].discount;
    _product.bdisprice = product[productObj].price_min_before_discount / 100000;

    return _product;
  }

  mapCategories(categories: any = []) {
    let _categories: Array<Category> = [];

    categories.forEach((category: any = {}) => {
      let _category: Category = {};
      _category.name = category.category.display_name;
      _category.count = category.count;
      _categories.push(_category);
    });
    return _categories;
  }

  mapBrands(brands: any = []) {
    let _brands: Array<Brand> = [];

    brands.forEach((brand: any = {}) => {
      let _brand: Brand = {};
      _brand.name = brand.name;

      _brands.push(_brand);
    });
    return _brands;
  }
}
