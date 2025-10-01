import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { SharedModule } from './Shared/shared.module';
import { ProductsListComponent } from './Public/products-list.component';
import { ProductsDetailsComponent } from './Public/products-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './Public/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './Public/cart.component';
import { CheckoutComponent } from './Public/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
  OrdersComponent,
  CartComponent,
  CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgbModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
