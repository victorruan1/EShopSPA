import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './Public/products-list.component';
import { ProductsDetailsComponent } from './Public/products-details.component';
import { OrdersComponent } from './Public/orders.component';
import { CartComponent } from './Public/cart.component';
import { CheckoutComponent } from './Public/checkout.component';
import { AdminGuard } from './Core/Guards/admin.guard';
import { AuthGuard } from './Core/Guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account/login' },
  { path: 'home', component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: 'Details/:id', component: ProductsDetailsComponent, canActivate: [AuthGuard] },
  { path: 'Orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'Cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'Checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    loadChildren: () =>
      import('./Account/account.module').then((m) => m.AccountModule),
  },
  // legacy redirects
  { path: 'Login', redirectTo: 'account/login' },
  { path: 'Register', redirectTo: 'account/register' },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () =>
      import('./Admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
