import { PaymentSummary, ShippingAddress } from "../app/models/order";


export default function currencyFormat(amount: number) {
  return "£" + (amount / 100).toFixed(2);
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, x]) => x !== "" && x !== null && x !== undefined && x.length !== 0
    )
  );
}

export function addressString(address: ShippingAddress) {
  return `${address.name}
  ${address?.line1}
  ${address?.line2}
  ${address?.city}
  ${address?.state}
  ${address?.country}
  ${address?.postal_code}`
  };

export function paymentString(paymentSummary: PaymentSummary) {

  return `${paymentSummary?.brand?.toUpperCase()}, **** **** **** ${paymentSummary?.last4}\nExp: ${paymentSummary?.exp_month}/${paymentSummary?.exp_year}`
};