import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../Core/Services/cart.service';
import { CartItem } from '../Shared/Models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  sub?: Subscription;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.cart.cart$.subscribe((items) => (this.items = items));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  inc(id: number) {
    this.cart.increment(id);
  }
  dec(id: number) {
    this.cart.decrement(id);
  }
  remove(id: number) {
    this.cart.remove(id);
  }
  clear() {
    this.cart.clear();
  }
}
