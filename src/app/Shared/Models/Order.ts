import { Product } from './Product';

export type OrderStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface OrderItem {
  product: Product;
  price: number; // unit price at time of order
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO string
  items: OrderItem[];
}
