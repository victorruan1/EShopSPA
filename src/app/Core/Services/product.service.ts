import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../../Shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Use dev proxy path to avoid CORS; proxy injects subscription header. In prod, point to APIM host via environment file.
  private readonly base = '/apigw';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  constructor(private http: HttpClient) {}

  // GET /api/Product/GetListProducts?page=1&pageSize=20
  getProducts(page = 1, pageSize = 20): Observable<Product[]> {
    const url = `${this.base}/api/Product/GetListProducts`;
    return this.http
      .get<{ items: any[]; page: number; pageSize: number; total: number }>(
        url,
        { params: { page: String(page), pageSize: String(pageSize) } as any }
      )
      .pipe(
        map((res) =>
          (res.items || []).map((it) => this.mapApiItemToProduct(it))
        ),
        tap((list) => this.productsSubject.next(list))
      );
  }

  // POST /api/Product/Save
  addProduct(input: {
    name: string;
    description: string;
    categoryId: number;
    price: number;
    qty: number;
    productImage: string;
    sku: string;
    active: boolean;
    variationValueIds: any;
  }): Observable<any> {
    const url = `${this.base}/api/Product/Save`;
    return this.http.post(url, input).pipe(
      tap(() => {
        // After saving, refresh the list
        this.getProducts().subscribe();
      })
    );
  }

  private mapApiItemToProduct(it: any): Product {
    return {
      id: it.id,
      name: it.name,
      price: it.price,
      imageUrl:
        it.productImage || 'https://via.placeholder.com/200x150?text=Product',
      active: it.active,
      description: it.description,
      category: it.categoryName,
      subCategory: it.subCategoryName,
      variation: undefined,
      variationValue: undefined,
    } as Product;
  }
}
