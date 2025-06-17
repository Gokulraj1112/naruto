export interface Product {
  id: number;
  name: string;
  nameJapanese: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: number;
  features: string[];
  specifications: { [key: string]: string };
  images: string[];
  tags: string[];
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
  addedDate: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: WishlistItem[];
}