import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
import { CartService } from '../Core/Services/cart.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  product?: Product;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.products.getProducts().subscribe(list => {
      this.product = list.find(p => p.id === id);
    });
  }

  addToCart() {
    if (!this.product) return;
    this.cart.add(this.product, this.qty);
  }

  inc() { this.qty++; }
  dec() { if (this.qty > 1) this.qty--; }
}
