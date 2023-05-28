import { OFFICIAL_AP_BACKEND_BASEPATH } from '@/utils/constants';
import { ApBackendObject } from '@/utils/interfaces';
import Cookies from 'js-cookie';

/**
 * @dev get a list of all holders
 */
export const getAllHolders = async () => {
  try {
    // prepare auth token
    const authToken = Cookies.get('SESSIONID');

    // fetch find-gift-holders API
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/gift/holder/find-gift-holders`,
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
