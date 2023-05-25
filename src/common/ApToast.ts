import { toast } from 'react-hot-toast';

/**
 * @dev handle toastings
 */
export const ApToast = (mode: 'success' | 'error', message: string) => {
  switch (mode) {
    case 'error':
      toast.error(message);
      break;
    default:
      toast.success(message);
  }
};
