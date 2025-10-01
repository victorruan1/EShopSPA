import { Injectable } from '@angular/core';

export interface CategoryNode {
  name: string;
  subCategories: Array<{
    name: string;
    variations: Array<{ name: string; values: string[] }>;
  }>;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private data: CategoryNode[] = [
    {
      name: 'Clothing',
      subCategories: [
        {
          name: 'Shirts',
          variations: [
            { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] },
            { name: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'] },
          ],
        },
        {
          name: 'Pants',
          variations: [
            { name: 'Waist', values: ['28', '30', '32', '34', '36'] },
            { name: 'Length', values: ['30', '32', '34'] },
          ],
        },
      ],
    },
    {
      name: 'Electronics',
      subCategories: [
        {
          name: 'Phones',
          variations: [
            { name: 'Storage', values: ['64GB', '128GB', '256GB'] },
            { name: 'Color', values: ['Black', 'Silver', 'Gold'] },
          ],
        },
        {
          name: 'Laptops',
          variations: [
            { name: 'RAM', values: ['8GB', '16GB', '32GB'] },
            { name: 'Storage', values: ['256GB', '512GB', '1TB'] },
          ],
        },
      ],
    },
  ];

  getCategories(): string[] {
    return this.data.map((c) => c.name);
  }
  getSubCategories(category?: string): string[] {
    const cat = this.data.find((c) => c.name === category);
    return cat ? cat.subCategories.map((s) => s.name) : [];
  }
  getVariations(category?: string, subCategory?: string): string[] {
    const sc = this.data
      .find((c) => c.name === category)?.subCategories
      .find((s) => s.name === subCategory);
    return sc ? sc.variations.map((v) => v.name) : [];
  }
  getVariationValues(
    category?: string,
    subCategory?: string,
    variation?: string
  ): string[] {
    const v = this.data
      .find((c) => c.name === category)?.subCategories
      .find((s) => s.name === subCategory)?.variations
      .find((x) => x.name === variation);
    return v ? v.values : [];
  }
}
