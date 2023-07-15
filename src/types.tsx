export type Product = {
  id: string;
  category: string;
  coffee_type?: string;
  image?: string;
  name: string;
  description?: string;
  price: number;
  sales: number;
};

export type Category = {
  id: string;
  name: string;
  altName?: string;
  description: string;
};

export type CoffeeType = {
  id: string;
  name: string;
};

export type DeliveryAddress = {
  id: string;
  address_line2: string;
  barangay: string;
  city: string;
  name: string;
  phone_number: string;
  postal_code: number;
  user_uid: string;
};

export type User = {
  id: string;
  default_address: string;
  first_name: string;
  last_name: string;
  nickname: string;
  gender: string;
};
