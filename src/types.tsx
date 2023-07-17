import { FieldValue, Timestamp } from "firebase/firestore";

import { Size } from "./pages/Product";

export type ProductType = {
  id: string;
  category: string;
  coffee_type?: CoffeeType;
  image?: string;
  name: string;
  description?: string;
  price: number;
  sales: number;
};

export type CategoryType = {
  id: string;
  name: string;
  altName?: string;
  description: string;
};

export type CoffeeType = "Hot Coffee" | "Cold Coffee" | "Hot Chocolate";

export interface AddressType {
  id?: string;
  unit_number?: string;
  street_number?: string;
  street_name?: string;
  barangay: string;
  city: string;
  province?: string;
  region?: string;
  postal_code?: number;
  address_line2?: string;
  phone_number?: string;
  tel_number?: string;
  type: "home" | "work";
}

export interface DeliveryAddressType extends AddressType {
  name: string;
  user_uid: string;
}

export type UserType = {
  id: string;
  default_address: string;
  first_name: string;
  last_name: string;
  nickname: string;
  gender: string;
};

export type CartItemType = {
  index: number;
  product_id: string;
  quantity: number;
  size?: Size;
};

export type OrderType = {
  id?: string;
  created_at: Timestamp | FieldValue;
  delivery_address_id?: string;
  products: OrderProductType[];
  payment_status: PaymentStatusType;
  total_price: number;
  user_uid: string;
  delivery_fee?: number;
  delivery_option?: DeliveryOptionType;
};

export type OrderProductType = {
  product_id: string;
  quantity: number;
  size?: Size;
};

export enum PaymentOptionType {
  OverTheCounter = "Over the Counter",
  GCash = "GCash",
  LazadaPay = "Lazada Wallet",
  ShopeePay = "Shopee Pay",
  PayMaya = "PayMaya",
  CoinsPH = "Coins.ph",
  GooglePay = "Google Pay",
  ApplePay = "Apple Pay",
  CreditCard = "Credit Card",
  DebitCard = "Debit Card",
}

export type DeliveryOptionType = "pickup" | "delivery";

export type PaymentStatusType = "paid" | "pending";

export type BranchType = {
  id?: string;
  name?: string;
  address: AddressType;
  main: boolean;
};

export type CardItemType = {
  id?: string;
  cardNumber: string;
  cardHolder: string;
  cardType?: string;
  expiryDate?: string;
  cvc?: string;
  default?: boolean;
};
