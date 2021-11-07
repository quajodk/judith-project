export interface IProduct {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  description: string;
  isAvailable: boolean;
  color?: string; // optional, changes it promotion tag
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
