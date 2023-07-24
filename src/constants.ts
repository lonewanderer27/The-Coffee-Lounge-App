import {
  BranchType,
  CategoryType,
  DeliveryAddressType,
  ProductType,
  VoucherType,
} from "./types";

export const CardImages = [
  {
    cardType: "visa",
    image: "https://img.icons8.com/color/100/000000/visa.png",
  },
  {
    cardType: "mastercard",
    image: "https://img.icons8.com/color/100/000000/mastercard.png",
  },
  {
    cardType: "amex",
    image: "https://img.icons8.com/color/100/000000/amex.png",
  },
  {
    cardType: "discover",
    image: "https://img.icons8.com/color/100/000000/discover.png",
  },
  {
    cardType: "jcb",
    image: "https://img.icons8.com/color/100/000000/jcb.png",
  },
  {
    cardType: "dinersclub",
    image: "https://img.icons8.com/color/100/000000/diners-club.png",
  },
  {
    cardType: "unionpay",
    image: "https://img.icons8.com/color/100/000000/unionpay.png",
  },
  {
    cardType: "maestro",
    image: "https://img.icons8.com/color/100/000000/maestro.png",
  },
  {
    cardType: "mir",
    image: "https://img.icons8.com/color/100/000000/mir.png",
  },
  {
    cardType: "hipercard",
    image: "https://img.icons8.com/color/100/000000/hipercard.png",
  },
  {
    cardType: "laser",
    image: "https://img.icons8.com/color/100/000000/laser.png",
  },
  {
    cardType: "troy",
    image: "https://img.icons8.com/color/100/000000/troy.png",
  },
  {
    cardType: "unknown",
    image: "https://img.icons8.com/?size=512&id=53859&format=png",
  },
];

export const Branches: BranchType[] = [
  {
    name: "The Coffee Lounge - Main Branch",
    address: {
      barangay: "Bangkal",
      unit_number: "1",
      street_number: "1760",
      street_name: "Evangelista",
      city: "Makati",
      region: "National Capital Region",
      phone_number: "09123456789",
      type: "work",
    },
    main: true,
  },
  {
    name: "The Coffee Lounge - Laguna Branch",
    address: {
      barangay: "Gulod",
      unit_number: "B3",
      street_name: "St. Joseph Village 7 Phase 5A",
      city: "San Pablo",
      province: "Laguna",
      phone_number: "+1 234 567 890",
      type: "work",
    },
    main: false,
  },
];

export const Addresses: DeliveryAddressType[] = [
  {
    name: "Jane Smith",
    user_uid: "5678",
    barangay: "Greenhills",
    city: "San Juan",
    region: "Metro Manila",
    province: "NCR",
    postal_code: 1503,
    phone_number: "+639123456789",
    type: "work",
  },
  {
    name: "Juan Dela Cruz",
    user_uid: "9012",
    barangay: "Brgy. 1",
    city: "Laoag City",
    region: "Ilocos Region",
    province: "Ilocos Norte",
    postal_code: 2900,
    phone_number: "+639098765432",
    type: "home",
  },
  {
    name: "Maria Garcia",
    user_uid: "3456",
    barangay: "Brgy. 2",
    city: "Vigan City",
    region: "Ilocos Region",
    province: "Ilocos Sur",
    postal_code: 2700,
    phone_number: "+639876543210",
    type: "work",
  },
  {
    name: "Pedro Santos",
    user_uid: "7890",
    barangay: "Brgy. 3",
    city: "Bacarra",
    region: "Ilocos Region",
    province: "Ilocos Norte",
    postal_code: 2916,
    phone_number: "+639456789012",
    type: "home",
  },
];

export const ProductLoading: ProductType = {
  id: "loading",
  name: "Loading...",
  description: "Loading...",
  price: 0,
  image: "/logo.png",
  category: "Loading...",
  sales: 0,
};

export const CategoryLoading: CategoryType = {
  id: "loading",
  name: "Loading...",
  description: "Loading...",
  altName: "Loading",
};
