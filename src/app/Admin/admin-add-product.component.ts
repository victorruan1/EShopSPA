import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../Core/Services/product.service';
import { CategoryService } from '../Core/Services/category.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  categories: string[] = [];
  subCategories: string[] = [];
  variations: string[] = [];
  variationValues: string[] = [];

  form = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
    description: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    category: this.fb.control<string | null>(null, [Validators.required]),
    subCategory: this.fb.control<string | null>(null, [Validators.required]),
    variation: this.fb.control<string | null>(null, [Validators.required]),
    variationValue: this.fb.control<string | null>(null, [Validators.required]),
    price: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
    imageUrl: this.fb.control('', [Validators.required, Validators.pattern(/^https?:\/\//)]),
    active: this.fb.control(true, [Validators.required]),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();

    this.form.get('category')!.valueChanges.subscribe((cat) => {
      this.subCategories = this.categoryService.getSubCategories(cat ?? undefined);
      this.form.patchValue({ subCategory: null, variation: null, variationValue: null });
      this.variations = [];
      this.variationValues = [];
    });

    this.form.get('subCategory')!.valueChanges.subscribe((sub) => {
      const cat = this.form.get('category')!.value ?? undefined;
      this.variations = this.categoryService.getVariations(cat, sub ?? undefined);
      this.form.patchValue({ variation: null, variationValue: null });
      this.variationValues = [];
    });

    this.form.get('variation')!.valueChanges.subscribe((variation) => {
      const cat = this.form.get('category')!.value ?? undefined;
      const sub = this.form.get('subCategory')!.value ?? undefined;
      this.variationValues = this.categoryService.getVariationValues(cat, sub, variation ?? undefined);
      this.form.patchValue({ variationValue: null });
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const payload = {
      name: v.name!,
      description: v.description!,
      categoryId: 0, // TODO: map selected category to real ID once CategoryService is API-backed
      price: v.price!,
      qty: 0,
      productImage: v.imageUrl!,
      sku: `SKU-${(v.name || 'NEW').toUpperCase().replace(/\s+/g, '-')}-${Date.now()}`,
      active: !!v.active,
      variationValueIds: [], // TODO: map variation selection to real IDs when available
    };
    this.productService.addProduct(payload).subscribe({
      next: () => this.router.navigateByUrl('/admin/products'),
    });
  }
}
