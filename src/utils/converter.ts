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
  const countryCode = phoneNumber.slice(0, 2); // Extract country code
  const areaCode = phoneNumber.slice(2, 5); // Extract area code
  const mainNumberA = phoneNumber.slice(5, 8); // Extract main number
  const mainNumberB = phoneNumber.slice(8); // Extract main number

  return `${countryCode} (${areaCode})-${mainNumberA}${
    mainNumberB ? `-${mainNumberB}` : ``
  }`;
};

/**
 * @dev convert dates
 *
 * @param date string
 *
 * @returns string
 */
export const ConvertDateString = (date: string, mode?: 'long' | 'short') => {
  const dateObject = new Date(date);

  return mode === 'long'
    ? dateObject.toLocaleString()
    : dateObject.toLocaleDateString();
};

export default ConvertDateString;
