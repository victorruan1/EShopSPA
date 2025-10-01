import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders.component';
import { AdminUsersComponent } from './admin-users.component';
import { AdminLoginComponent } from './admin-login.component';
import { AdminAddProductComponent } from './admin-add-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'orders' },
  { path: 'login', component: AdminLoginComponent },
  { path: 'orders', component: AdminOrdersComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'products/new', component: AdminAddProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
