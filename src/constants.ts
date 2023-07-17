import { BranchType } from "./types";

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
      unit_number: "Room 204",
      street_number: "3853",
      street_name: "Macabulos",
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
