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
