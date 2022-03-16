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
  createdAt?: string;
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
  date: string;
  products: Record<string, any>[];
  files: string[];
  customer: ICustomer;
  totalAmount: number;
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

export interface IPaymentParams {
  amount: number;
  currency: string;
  email: string;
  reference: string;
  channel?: string[];
  first_name?: string;
  last_name?: string;
  callback_url?: string;
}
