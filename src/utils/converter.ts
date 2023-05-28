/**
 * @dev beautify giftAmount to USD currency format
 *
 * @param giftAmount - number
 *
 * @return string
 */
export const beautifyUSD = (giftAmount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(giftAmount);
};

/**
 * @dev beautify e.164 phoneNumber
 *
 * @param phoneNumber
 *
 * @returns string
 */
export const beautifyE164PhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
  const countryCode = cleanedNumber.slice(0, 2); // Extract country code
  const areaCode = cleanedNumber.slice(2, 5); // Extract area code
  const mainNumber = cleanedNumber.slice(5); // Extract main number

  return `+${countryCode} (${areaCode}) ${mainNumber}`;
};

/**
 * @dev convert dates
 *
 * @param date string
 *
 * @returns string
 */
export const ConvertDateString = (date: string) => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString();
};

export default ConvertDateString;
