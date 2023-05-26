import { ApBackendObject } from '@/utils/interfaces';
import { OFFICIAL_AP_BACKEND_BASEPATH } from '@/utils/constants';

export const generateAccessToken = async (loginFormData: {
  adminUsername: string;
  adminPassword: string;
}) => {
  try {
    // prepare post body
    const body = {
      'admin-username': loginFormData.adminUsername,
      'admin-password': loginFormData.adminPassword,
    };

    // fetch registerAPI in the backend
    const res = await fetch(
      `${OFFICIAL_AP_BACKEND_BASEPATH}/auth/generate-access-token`,
      { method: 'POST', body: JSON.stringify(body) }
    );

    return (await res.json()) as ApBackendObject;
  } catch (error) {
    console.error(error);
    return { error } as ApBackendObject;
  }
};
