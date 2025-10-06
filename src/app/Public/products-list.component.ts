import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
import { CartService } from '../Core/Services/cart.service';
import { AccountService } from '../Core/Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private account: AccountService,
    private router: Router
  ) {}

  productsList: Product[] = [];

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.productsList = products;
    });
    this.productService.getProducts().subscribe();
  }

  addToCart(product: Product) {
    this.cart.add(product, 1);
  }

  signOut() {
    this.account.logout();
    this.router.navigateByUrl('/account/login');
  }
}
