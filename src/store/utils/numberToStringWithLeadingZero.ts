export function numberToStringWithLeadingZero(
  number: number,
  digitsCount: number
): string {
  // Convert the number to a string
  let numberString = number.toString();

  // Calculate the number of leading zeros needed
  const leadingZeros = digitsCount - numberString.length;

  // Add leading zeros if necessary
  if (leadingZeros > 0) {
    numberString = "0".repeat(leadingZeros) + numberString;
  }

  return numberString;
}
