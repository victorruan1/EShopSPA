import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Order } from '../Shared/Models/Order';
import { AccountService } from '../Core/Services/account.service';
import { OrderService } from '../Core/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  sub?: Subscription;

  constructor(
    private account: AccountService,
    private ordersService: OrderService
  ) {}

  ngOnInit(): void {
    this.sub = this.account.currentUser$
      .pipe(switchMap((user) => this.ordersService.getAllOrders()))
      .subscribe((orders) => (this.orders = orders));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
