import { PaymentDetails, CardBrands } from '../types/requests';
import { parse, format } from 'date-fns';

const getCardBrandIndex = (brand: CardBrands) => {
  switch (brand) {
    case 'VISA':
      return 0;
    case 'MASTER':
      return 1;
    case 'AMEX':
      return 2;
    case 'MOBILEBANKING':
      return 3;
    default:
      return 4;
  }
};

export const monkeyPatch = (details: PaymentDetails): PaymentDetails => ({
  ...details,
  tran_date: format(parse(details.tran_date, 'yyyy-MM-dd HH:mm:ss', Date.now()), 'dd MMM, yyyy'),
  card_type: details.card_type.split('-')[1],
  card_brand_index: getCardBrandIndex(details.card_brand),
});
