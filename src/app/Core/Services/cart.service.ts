import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../Shared/Models/CartItem';
import { Product } from '../../Shared/Models/Product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);

  get cart$() {
    return this.items$.asObservable();
  }

  add(product: Product, quantity = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.emit();
  }

  increment(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.emit();
    }
  }

  decrement(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (!item) return;
    item.quantity -= 1;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.product.id !== productId);
    }
    this.emit();
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.emit();
  }

  clear() {
    this.items = [];
    this.emit();
  }

  private emit() {
    // emit a new array instance to trigger change detection
    this.items$.next(this.items.map(i => ({ ...i })));
  }
}
