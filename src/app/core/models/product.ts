import { Category } from './index';

export interface Product {
  _id: string;
  category: Category;
  name: string;
  price: string;
  description: string;
}
