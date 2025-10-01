import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Product } from '../../Shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>(this.seed());
  products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(p: Omit<Product, 'id'> & Partial<Pick<Product, 'id'>>) {
    const current = this.productsSubject.value;
    const nextId = (current.at(-1)?.id ?? 0) + 1;
    const item: Product = { id: p.id ?? nextId, ...p } as Product;
    this.productsSubject.next([...current, item]);
  }

  private seed(): Product[] {
    return Array.from({ length: 10 }).map((_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Product ${id}`,
        price: +(Math.random() * 100 + 10).toFixed(2),
        imageUrl: `https://picsum.photos/seed/product-${id}/200/150`,
        active: true,
      } as Product;
    });
  }
}
