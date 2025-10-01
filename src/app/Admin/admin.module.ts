import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './admin-orders.component';
import { AdminUsersComponent } from './admin-users.component';
import { AdminLoginComponent } from './admin-login.component';
import { AdminAddProductComponent } from './admin-add-product.component';

@NgModule({
  declarations: [AdminOrdersComponent, AdminUsersComponent, AdminLoginComponent, AdminAddProductComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
