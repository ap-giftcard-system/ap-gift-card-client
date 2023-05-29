'use client';

import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { ApToast } from '@/components/common/ApToast';
import ApInputField from '@/components/common/ApInputField';
import { ApBackendObject, ApGiftHolder } from '@/utils/interfaces';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { getApGiftHolders, updateApGiftHolder } from '@/api/holders-api';
import ConvertDateString, {
  beautifyE164PhoneNumber,
  beautifyUSD,
} from '@/utils/converter';

interface PageProps {
  params: {
    barCodeParam: string;
  };
}

const GiftHolder = ({ params: { barCodeParam } }: PageProps) => {
  // local states
  const [mounted, setMoutned] = useState(false);
  const updatedAmountRef = useRef<any>();
  const [isLoading, setIsLoading] = useState({
    decrease: false,
    increase: false,
  });
  const [newAmount, setNewAmount] = useState('');
  const [priceActions, setPriceActions] = useState(false);
  const [holder, setHolders] = useState<ApGiftHolder>({
    giftHolderId: '',
    barCode: '',
    holderName: '',
    holderPhone: '',
    holderEmail: '',
    giftAmount: 0,
    createdAt: '',
    updatedAt: '',
  });

  // handle amount update submit
  const handleUpdateAmountSubmit = async (mode: 'increase' | 'decrease') => {
    // ApToast error if newAmount is empty
    if ((newAmount === '' || newAmount === '0') && updatedAmountRef) {
      ApToast('error', 'Please enter a new gift amount.');
      updatedAmountRef.current.focus();
      return;
    }

    // prepare api response
    let res: ApBackendObject = {} as ApBackendObject;

    // round newAmount to 2 decimals
    const roundedAmount = Number(Number(newAmount).toFixed(2));

    if (mode === 'increase') {
      // turn isLoading.increase on
      setIsLoading((prev) => ({ ...prev, increase: true }));

      // prepare new updatedAmount
      const updatedAmount = holder.giftAmount + roundedAmount;

      // invoke udpate gift holder api
      res = await updateApGiftHolder({
        ...holder,
        giftAmount: updatedAmount,
      });

      // turn isLoading.increase off
      setIsLoading((prev) => ({ ...prev, increase: false }));
    } else {
      // handle insufficient input
      if (roundedAmount > holder.giftAmount) {
        ApToast('error', 'Insufficient amount to decrease.');
        return;
      }

      // turn isLoading.decrease on
      setIsLoading((prev) => ({ ...prev, decrease: true }));

      // prepare new updatedAmount
      const updatedAmount = holder.giftAmount - roundedAmount;

      // invoke udpate gift holder api
      res = await updateApGiftHolder({
        ...holder,
        giftAmount: updatedAmount,
      });

      // turn isLoading.decrease off
      setIsLoading((prev) => ({ ...prev, decrease: false }));
    }

    // handle error
    if (res.error) {
      let errMsg = '';
      switch (res.error.key) {
        case '!BAD_REQUEST':
          errMsg = 'Invalid form input.';
          break;
        case '!ACCESS_TOKEN':
          if (res.error.msg === 'Cannot parse auth JWT.') {
            errMsg = 'Authorization expired. Try logging out and log back in.';
          }
          break;
        default:
          errMsg = 'Unknown server error. Call Logan!!!!';
      }
      // toast error
      ApToast('error', errMsg);
    } else {
      // toast success
      ApToast('success', 'Successfully updated new gift amount.');

      // update holder
      if (res.updatedApGiftHolder) {
        setHolders(res.updatedApGiftHolder);
      }

      // reset newAmount data
      setNewAmount('');

      // turn udpate off
      setPriceActions(false);
    }
  };

  // fetch gift holder by barCodeParam
  useEffect(() => {
    (async () => {
      const res = await getApGiftHolders(barCodeParam);

      // handle error
      if (res.error) {
        let errMsg = '';
        switch (res.error?.key) {
          case '!ACCESS_TOKEN':
            if (res.error.msg === 'Cannot parse auth JWT.') {
              errMsg =
                'Authorization expired. Try logging out and log back in.';
            }
            break;
          default:
            errMsg = 'Unknown server error. Call Logan!!!!';
        }
        ApToast('error', errMsg);
      } else {
        setHolders(res.apGiftHolder![0] as ApGiftHolder);
      }
    })();
    setMoutned(true);
  }, []);

  if (!mounted)
    return (
      <section className='w-full sm:w-[27rem] mt-20 mb-16 sm:mb-24 sm:gap-9 sm:mt-32'>
        <h3 className='pt-3 text-3xl font-bold leading-[1.15] text-black sm:text-4xl text-center'>
          Loading holder...
        </h3>
      </section>
    );

  return (
    <section className='w-full h-screen flex justify-center items-center sm:w-[27rem]'>
      {/* wrapper */}
      <div className='w-full flex flex-col gap-9 border-1 border-gray-300 rounded-lg bg-white p-2 shadow-lg'>
        {/* header - barCodeParam */}
        <h2 className='pt-6 text-3xl font-bold leading-[1.15] text-black sm:text-4xl text-center'>
          {barCodeParam}
        </h2>
        <hr className='bg-[rgba(256,256,256,0.3)]' />

        {/* price actions*/}
        <div className='flex flex-col gap-3'>
          {/* price */}
          <p className='text-2xl sm:text-4xl font-semibold text-center whitespace-nowrap overflow-hidden overflow-ellipsis'>
            {beautifyUSD(holder.giftAmount)}
          </p>

          {/* actions */}
          {priceActions ? (
            <div className='flex justify-center flex-col items-center gap-3'>
              {/* update price input box */}
              <ApInputField
                id={'update'}
                type={'number'}
                value={newAmount}
                handleOnFieldChange={(e) => setNewAmount(e.target.value)}
                placeholder={'$0.00'}
                lightShadow={true}
                inputRef={updatedAmountRef}
              />
              <div className='flex gap-3 justify-center items-center text-lg font-semibold'>
                {/* Decrease */}
                <button
                  onClick={() => handleUpdateAmountSubmit('decrease')}
                  className='flex w-32 gap-1 items-center px-2 border-1 transition duration-200 border-indigo-400 justify-center rounded-lg text-indigo-400 hover:bg-indigo-400 hover:text-white'
                >
                  Decrease
                  <div>
                    {isLoading.decrease ? (
                      <div
                        className={`animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400`}
                      />
                    ) : (
                      <AiOutlineArrowDown />
                    )}
                  </div>
                </button>

                {/* Increase */}
                <button
                  onClick={() => handleUpdateAmountSubmit('increase')}
                  className='flex w-32 gap-1 items-center px-2 border-1 transition duration-200 border-green-400 justify-center rounded-lg text-green-400 hover:bg-green-400 hover:text-white'
                >
                  Increase{' '}
                  {isLoading.increase ? (
                    <div
                      className={`animate-spin rounded-full h-4 w-4 border-b-2 border-green-400`}
                    />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>

              {/* Cancle */}
              <div className='text-lg font-semibold'>
                <button
                  onClick={() => setPriceActions(false)}
                  className='flex w-32 gap-1 items-center px-2 border-1 transition duration-200 border-amber-400 justify-center rounded-lg text-amber-500 hover:bg-amber-400 hover:text-white'
                >
                  Cancle
                </button>
              </div>
            </div>
          ) : (
            // start update action button
            <div className='mx-auto'>
              <button
                onClick={() => setPriceActions(true)}
                className='flex gap-1 text-lg font-semibold items-center px-3 py-1 border-1 transition duration-200 border-amber-400 justify-center rounded-lg text-amber-500 hover:bg-amber-400 hover:text-white'
              >
                Update Gift Amount
              </button>
            </div>
          )}
        </div>
        <hr className='bg-[rgba(256,256,256,0.3)]' />

        {/* contact information */}
        <div className='flex flex-col font-semibold text-lg justify-center'>
          {/* name */}
          <div className='flex justify-between'>
            <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
              Name:{' '}
            </p>
            <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
              {holder.holderName}
            </p>
          </div>

          {/* phone */}
          {holder.holderPhone && (
            <div className='flex justify-between'>
              <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                Phone:
              </p>
              <Link
                href={`tel:${holder.holderPhone}`}
                className='hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis'
              >
                {beautifyE164PhoneNumber(holder.holderPhone)}
              </Link>
            </div>
          )}

          {/* email */}
          {holder.holderEmail && (
            <div className='flex justify-between'>
              <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                Email:{' '}
              </p>
              <Link
                href={`mailto:${holder.holderEmail}`}
                className='hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis'
              >
                {holder.holderEmail}
              </Link>
            </div>
          )}

          {/* date added */}
          <div className='flex justify-between'>
            <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
              Date added:
            </p>{' '}
            <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
              {ConvertDateString(holder.createdAt, 'long')}
            </p>
          </div>
        </div>
        <hr className='bg-[rgba(256,256,256,0.3)]' />

        {/* delete holder */}
        <div className='mx-auto pb-6'>
          <button className='flex gap-1 text-lg font-bold items-center px-3 py-1 border-1 transition duration-200 border-red-500 justify-center rounded-lg text-red-500 hover:bg-red-400 hover:text-white'>
            Remove Holder
          </button>
        </div>
      </div>

      {/* toaster */}
      <Toaster />
    </section>
  );
};

export default GiftHolder;
