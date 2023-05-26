import { OFFICIAL_AP_BACKEND_BASEPATH } from '@/utils/constants';
import { ApBackendObject, ApGiftHolder } from '@/utils/interfaces';

export const registerGiftHolder = async (apGiftHolder: ApGiftHolder) => {
  try {
    // prepare post body
    const body = {
      barcode: apGiftHolder.barCode,
      holderName: apGiftHolder.holderName,
      holderPhone: '+1' + apGiftHolder.holderPhone.replace(/\D/g, ''),
      holderEmail: apGiftHolder.holderEmail,
      giftAmount: Number(apGiftHolder.giftAmount),
    };

    // fetch registerAPI in the backend
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/register`,
      { method: 'POST', body: JSON.stringify(body) }
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};
