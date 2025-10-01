import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../Shared/Models/Order';
import { OrderService } from '../Core/Services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  statuses: OrderStatus[] = ['Pending', 'Completed', 'Cancelled'];

  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe(o => this.orders = o);
  }

  setCompleted(id: number) {
    this.ordersService.updateStatus(id, 'Completed').subscribe(() => {
      this.ordersService.sendInvoiceEmail(id).subscribe();
    });
  }
}
