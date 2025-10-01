import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order, OrderItem, OrderStatus } from '../../Shared/Models/Order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = this.seed();

  getOrdersForUser(userId: number): Observable<Order[]> {
    return of(this.orders.filter(o => o.customerId === userId));
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  updateStatus(orderId: number, status: OrderStatus): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId);
    if (order) order.status = status;
    return of(order);
  }

  // Stub for invoice generation/email
  sendInvoiceEmail(orderId: number): Observable<boolean> {
    console.log('Sending invoice for order', orderId);
    return of(true);
  }

  private seed(): Order[] {
    const items = (pidStart: number): OrderItem[] => [
      { product: { id: pidStart, name: `Product ${pidStart}`, price: 19.99, imageUrl: '' }, price: 19.99, quantity: 1 },
      { product: { id: pidStart + 1, name: `Product ${pidStart + 1}`, price: 29.99, imageUrl: '' }, price: 29.99, quantity: 2 },
    ];
    return [
      { id: 1, customerId: 1, customerName: 'Jane Customer', totalAmount: 79.97, status: 'Pending', createdAt: new Date().toISOString(), items: items(1) },
      { id: 2, customerId: 2, customerName: 'Adam Admin', totalAmount: 49.98, status: 'Completed', createdAt: new Date().toISOString(), items: items(3) },
    ];
  }
}
