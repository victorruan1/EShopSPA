import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../Core/Services/cart.service';
import { CartItem } from '../Shared/Models/CartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  sub?: Subscription;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(\d{2})$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  });

  constructor(private fb: FormBuilder, private cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.cart.cart$.subscribe(items => this.items = items);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Normally send to backend; for demo just clear cart
    this.cart.clear();
    alert('Purchase complete!');
    this.form.reset();
  }
}
