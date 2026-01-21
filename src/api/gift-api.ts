import { OFFICIAL_AP_BACKEND_BASEPATH } from '@/utils/constants';
import { ApBackendObject, ApGiftHolder } from '@/utils/interfaces';
import Cookies from 'js-cookie';

export const registerGiftHolder = async (apGiftHolder: ApGiftHolder) => {
  try {
    // prepare authToken
    const authToken = Cookies.get('SESSIONID');

    // prepare post body
    const body = {
      barcode: apGiftHolder.barCode,
      holderName: apGiftHolder.holderName,
      holderPhone: apGiftHolder.holderPhone
        ? '+1' + apGiftHolder.holderPhone.replace(/\D/g, '')
        : '',
      holderEmail: apGiftHolder.holderEmail,
      giftAmount: Number(apGiftHolder.giftAmount),
      giftedBy: apGiftHolder.giftedBy || '',
    };

    // fetch registerAPI in the backend
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/register`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};
