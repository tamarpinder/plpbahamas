// Test Credit Card Data for Development and Testing
// These are standard test card numbers that don't process real payments

export const TEST_CARDS = {
  visa: {
    number: '4242424242424242',
    type: 'visa',
    brand: 'Visa',
    icon: '💳',
    displayName: 'Visa Test Card'
  },
  mastercard: {
    number: '5555555555554444',
    type: 'mastercard', 
    brand: 'Mastercard',
    icon: '💳',
    displayName: 'Mastercard Test Card'
  },
  amex: {
    number: '378282246310005',
    type: 'amex',
    brand: 'American Express',
    icon: '💳',
    displayName: 'AmEx Test Card'
  },
  discover: {
    number: '6011111111111117',
    type: 'discover',
    brand: 'Discover',
    icon: '💳',
    displayName: 'Discover Test Card'
  }
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const cleanValue = value.replace(/\s/g, '');
  const matches = cleanValue.match(/(\d{1,4})/g);
  return matches ? matches.join(' ') : cleanValue;
};

// Format expiry date as MM/YY
export const formatExpiryDate = (value) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
  }
  return cleanValue;
};

// Detect card type from number
export const detectCardType = (number) => {
  const cleanNumber = number.replace(/\s/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^6011/.test(cleanNumber)) return 'discover';
  
  return 'unknown';
};

// Get card type info
export const getCardTypeInfo = (type) => {
  switch (type) {
    case 'visa':
      return { name: 'Visa', icon: '💳', color: '#1A1F71' };
    case 'mastercard':
      return { name: 'Mastercard', icon: '💳', color: '#EB001B' };
    case 'amex':
      return { name: 'American Express', icon: '💳', color: '#006FCF' };
    case 'discover':
      return { name: 'Discover', icon: '💳', color: '#FF6000' };
    default:
      return { name: 'Unknown', icon: '💳', color: '#666666' };
  }
};

// Generate future expiry date
export const generateFutureExpiryDate = () => {
  const now = new Date();
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1; // 1-5 years in future
  const month = Math.floor(Math.random() * 12) + 1; // 1-12
  
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedYear = futureYear.toString().slice(-2);
  
  return `${formattedMonth}/${formattedYear}`;
};

// Generate random CVV
export const generateCVV = (cardType = 'visa') => {
  const length = cardType === 'amex' ? 4 : 3;
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};

// Common test names
export const TEST_NAMES = [
  'John Doe',
  'Jane Smith',
  'Test User',
  'Demo Account',
  'Sample Customer'
];

// Generate random test name
export const generateTestName = () => {
  return TEST_NAMES[Math.floor(Math.random() * TEST_NAMES.length)];
};

// Validate card number using basic Luhn algorithm
export const isValidCardNumber = (number) => {
  const cleanNumber = number.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleanNumber)) return false;
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
  
  // Luhn algorithm check
  let sum = 0;
  let alternate = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  return (sum % 10) === 0;
};

// Create payment method object from form data
export const createPaymentMethodFromCard = (cardData) => {
  const cardType = detectCardType(cardData.number);
  const typeInfo = getCardTypeInfo(cardType);
  const lastFour = cardData.number.replace(/\s/g, '').slice(-4);
  
  return {
    type: 'card',
    cardType: cardType,
    displayName: `${typeInfo.name} ending in ${lastFour}`,
    lastFour: lastFour,
    expiryMonth: cardData.expiry.split('/')[0],
    expiryYear: '20' + cardData.expiry.split('/')[1],
    nameOnCard: cardData.name,
    isDefault: false
  };
};