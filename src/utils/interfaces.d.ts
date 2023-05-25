/**
 * @notice interface contains information related to Ap Gift Holder
 *
 * @param giftHolderId - string
 *
 * @param barCode - string
 *
 * @param holderName - string
 *
 * @param holderPhone - string
 *
 * @param holderEmail - string
 *
 * @param giftAmount - number
 *
 * @param createdAt - string
 *
 * @param updatedAt - string
 */
export interface ApGiftHolder {
  giftHolderId: string;
  barCode: string;
  holderName: string;
  holderPhone: string;
  holderEmail: string;
  giftAmount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * @notice interface contains information related to Error object from backend server
 */
export interface ApBackendError {
  error: null | { key: string; msg: string };
}
