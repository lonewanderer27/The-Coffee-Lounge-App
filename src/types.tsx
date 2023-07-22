import { FieldValue, Timestamp } from "firebase/firestore";

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
  nickname: string;
  gender: string;
  favorites?: string[];
};

export type CartItemType = {
  index: number;
  product_id: string;
  quantity: number;
  size: Size;
  milk: Milk;
  syrup: Syrup;
  additives: Additive[];
  ice: Ice;
  name?: string;
};

export type OrderType = {
  id?: string;
  created_at: Timestamp | FieldValue;
  products: CartItemType[];
  total_price: number;
  user_uid: string;
  branch: BranchType;
  payment_status: PaymentStatusType;
  payment_at?: Timestamp | FieldValue;
  payment_option: PaymentOptionType;
  delivery_at?: Timestamp | FieldValue;
  delivery_status: DeliveryStatusType;
  delivery_option: DeliveryOptionType;
  delivery_address_id?: string;
  delivery_fee?: number;
};

export enum DeliveryStatusType {
  Pending = "Pending",
  Preparing = "Preparing",
  OnTheWay = "On the Way",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

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

export enum DeliveryOptionType {
  Pickup = "Pickup",
  Delivery = "Delivery",
}

export enum PaymentStatusType {
  Paid = "paid",
  Pending = "pending",
}

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

export type AddOn = {
  name: string;
  price: number;
};

export const Sizes: AddOn[] = [
  {
    name: "Tall",
    price: 0,
  },
  {
    name: "Grande",
    price: 17.99,
  },
  {
    name: "Venti",
    price: 22.99,
  },
];

export const Milks: AddOn[] = [
  {
    name: "Cow's",
    price: 2.9,
  },
  {
    name: "Lactose-Free",
    price: 5.0,
  },
  {
    name: "Skimmed",
    price: 2.9,
  },
  {
    name: "Vegetable",
    price: 7.9,
  },
];

export const Syrups: AddOn[] = [
  {
    name: "Amaretto",
    price: 3.75,
  },
  {
    name: "Caramel",
    price: 2.9,
  },
  {
    name: "Hazelnut",
    price: 3.75,
  },
  {
    name: "Irish Cream",
    price: 3.75,
  },
  {
    name: "Vanilla",
    price: 2.9,
  },
];

export const Additives: AddOn[] = [
  {
    name: "Ceylon Cinnamon",
    price: 1.25,
  },
  {
    name: "Grated Chocolate",
    price: 2.9,
  },
  {
    name: "Liquid Chocolate",
    price: 2.9,
  },
  {
    name: "Marshmallow",
    price: 1.25,
  },
  {
    name: "Whipped Cream",
    price: 2.9,
  },
  {
    name: "Nutmeg",
    price: 1.25,
  },
  {
    name: "Ice Cream",
    price: 5.0,
  },
];

export enum Size {
  None = "None",
  Tall = "Tall",
  Grande = "Grande",
  Venti = "Venti",
}

export enum Milk {
  None = "None",
  Cow_s = "Cow's",
  Lactose_Free = "Lactose-Free",
  Skimmed = "Skimmed",
  Vegetable = "Vegetable",
}

export enum Syrup {
  None = "None",
  Amaretto = "Amaretto",
  Caramel = "Caramel",
  Hazelnut = "Hazelnut",
  Irish_Cream = "Irish Cream",
  Vanilla = "Vanilla",
}

export enum Additive {
  Ceylon_Cinnamon = "Ceylon Cinnamon",
  Grated_Chocolate = "Grated Chocolate",
  Liquid_Chocolate = "Liquid Chocolate",
  Marshmallow = "Marshmallow",
  Whipped_Cream = "Whipped Cream",
  Nutmeg = "Nutmeg",
  Ice_Cream = "Ice Cream",
}

export enum Ice {
  None = "None",
  Light = "Light",
  Normal = "Normal",
  Extra = "Extra",
}

export interface ProductConfig {
  size: Size;
  quantity: number;
  milk: Milk;
  syrup: Syrup;
  additives: [];
  ice: Ice;
  name?: string;
}

export interface VoucherType {
  id?: string;
  code: string;
  discount: number;
  min_spend: number;
  max_discount: number;
  start_date: Timestamp;
  end_date: Timestamp;
  active: boolean;
  type: "percent" | "fixed";
  created_at: Timestamp;
  updated_at: Timestamp;
}