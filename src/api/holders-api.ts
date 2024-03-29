import Cookies from 'js-cookie';
import { OFFICIAL_AP_BACKEND_BASEPATH } from '@/utils/constants';
import { ApBackendObject, ApGiftHolder } from '@/utils/interfaces';

/**
 * @dev get a list of all holders
 *
 * @param barcode?: string - if none => retrieve all else retrieve single
 */
export const getApGiftHolders = async (barcode?: string) => {
  try {
    // prepare auth token
    const authToken = Cookies.get('SESSIONID');

    // fetch find-gift-holders API
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/find-gift-holders${
        barcode ? `?barCode=${barcode}` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};

/**
 * @dev update gift holder
 *
 * @param updatedHolder ApGiftHolder
 */
export const updateApGiftHolder = async (updatedHolder: ApGiftHolder) => {
  try {
    // prepare auth token
    const authToken = Cookies.get('SESSIONID');

    // path update holder API
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/update`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedHolder),
        method: 'PATCH',
      }
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};

/**
 * @dev remove/delete holder by holderId
 *
 * @param holderId string
 */
export const removeApGiftHolder = async (holderId: string) => {
  try {
    // prepare auth token
    const authToken = Cookies.get('SESSIONID');

    // fetch find-gift-holders API
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/delete?holderId=${holderId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: 'DELETE',
      }
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};
