import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'detail/:id/:shopId', component: ProductDetailsComponent },
  { path: 'list', component: ProductListComponent},
  { path: 'list/:catId/:catName', component: ProductListComponent, runGuardsAndResolvers: 'always'},
  { path: 'authentication', component: AuthenticationComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '', redirectTo: '/authentication' ,pathMatch: 'full'},
  { path: '**', component: ProductListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
