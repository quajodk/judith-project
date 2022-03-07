export interface IProduct {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  description: string;
  isAvailable: boolean;
  color?: string; // optional, changes it promotion tag
  tags?: string[];
  currency?: string;
  productFile?: string;
  category?: ICategory[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  id: string;
  date: string;
  products: ICartItem[];
  totalPrice: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICheckoutOrder {
  id: string;
  data: string;
  products: Record<string, any>[];
  customer: ICustomer;
  totalPrice: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  orderStatus: string;
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
}
