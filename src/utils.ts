import {
  AddressType,
  CartItemType,
  DeliveryAddressType,
  Ice,
  Milk,
  Size,
  Syrup,
} from "./types";

/**
 * Returns a string describing the order based on the provided CartItemType.
 * @param props - The CartItemType to describe.
 * @returns A string describing the order.
 */
export default function OrderDescription(props: CartItemType) {
  // The function takes in a CartItemType object as a parameter, which contains information about the order.
  // It then constructs an array of strings based on the properties of the CartItemType object.
  // If a property is not set (e.g. size is Size.None), it is excluded from the array.
  // The array is then filtered to remove any falsy values (e.g. false, undefined, null, 0, ""), and joined into a single string with commas.
  return [
    props.size !== Size.None ? "Size " + props.size : false,
    props.milk !== Milk.None ? props.milk : false,
    props.syrup !== Syrup.None ? props.syrup : false,
    props.ice !== Ice.None ? props.ice + " Ice" : false,
    props.additives && props.additives.length != 0
      ? props.additives.join(", ")
      : false,
  ]
    .filter(Boolean)
    .join(", ");
}

export function LocationDescription(props: DeliveryAddressType | AddressType) {
  return [
    props.unit_number !== "" ? props.unit_number : false,
    props.street_name !== "" ? props.street_name : false,
    props.barangay !== "" ? props.barangay : false,
    props.city !== "" ? props.city : false,
    props.province !== "" ? props.province : false,
    props.region !== "" ? props.region : false,
    props.postal_code?.toString().length != 0 ? props.postal_code : false,
  ]
    .filter(Boolean)
    .join(", ");
}
