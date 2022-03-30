import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
  Product,
  ProductsService,
  Product_URL,
  Category,
  Brand,
} from '../products.service';
interface ProductOptions {
  name?: string;
  limit: number;
  page: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Array<Product> = [];
  totalCount: number = 0;
  categories: Array<Category> = [];
  brands: Array<Brand> = [];
  productOption: ProductOptions = {
    name: '',
    limit: 50,
    page: 1,
  };
  navigationSubscription: any;
  categoriesInfo: any;
  categoryName: string= '';


  /////////////////////////////////////////////////////////////
  constructor(private _activeRoute: ActivatedRoute, private http: HttpClient, private prodService: ProductsService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  
  ngOnInit() {

  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.http.get('assets/categories.json').subscribe(data => {
      this.categoriesInfo = data;
    });
    this.getProducts();
  }
  getProducts() {

    

    let listURL = Product_URL.list;
    let detailURL = Product_URL.category;
    let catId = this._activeRoute.snapshot.paramMap.get('catId') || '';
    this.categoryName = this._activeRoute.snapshot.paramMap.get('catName') || '';
    if (catId != '') {
      listURL = listURL + '&match_id=' + catId;
      listURL = listURL.replace(
        '__searchKeyword__',
        this.productOption.name || ''
      );

      detailURL = detailURL + '&match_id=' + catId;
      detailURL = detailURL.replace(
        '__searchKeyword__',
        this.productOption.name || ''
      );

      console.log(this.productOption.name)

    }
    //Get Cat id and name
    /*
    listURL = listURL + '&match_id=' + catID
    */
    else {
      listURL = listURL.replace(
        '__searchKeyword__',
        this.productOption.name || 'shirt'
      );

      detailURL = detailURL.replace(
        '__searchKeyword__',
        this.productOption.name || 'shirt'
      );
    }
    listURL = listURL.replace(
      '__limit__',
      (this.productOption.limit || 0).toString()
    );
    listURL = listURL.replace(
      '__page__',
      (this.productOption.page || 0).toString()
    );
    this.prodService.getProducts(listURL).subscribe((products: any) => {
      this.totalCount = products.total_count;
      this.products = this.prodService.mapProducts(products, 'item_basic');
    });
    ////////////////////////////////////////////////////////////////////////////



    this.http.get(detailURL).subscribe((categories: any) => {
      let _categories: Array<Category> = [];
      _categories = this.prodService.mapCategories(
        categories.data.filter_configuration.dynamic_filter_group_data.facets
      );
      this.categories = _categories;
    });
    /////////////////////////////////////////////////////
    this.http.get(detailURL).subscribe((brands: any) => {
      let _brands: Array<Brand> = [];
      _brands = this.prodService.mapBrands(
        brands.data.filter_configuration.dynamic_filter_group_data.brands
      );
      this.brands = _brands;
    });
  }

  nextPage() {
    this.productOption.page =
      (this.productOption.limit || 0) + (this.productOption.page || 0);
    this.getProducts();
  }
  previousPage() {
    this.productOption.page =
      (this.productOption.page || 0) - (this.productOption.limit || 0);
    this.getProducts();
  }
  updateProductOption() {
    this.productOption.page = 1;
    this.getProducts();
  }

  encodefn(urlstr: string){
    return urlstr.replace(/ /gi,'__');
  }

  decodefn(urlstr: string){
    return urlstr.replace(/__/gi,' ');
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}


