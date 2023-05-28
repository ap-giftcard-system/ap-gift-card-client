'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApGiftHolder } from '@/utils/interfaces';
import { getApGiftHolders } from '@/api/holders-api';
import { ApToast } from '@/components/common/ApToast';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import ConvertDateString, {
  beautifyE164PhoneNumber,
  beautifyUSD,
} from '@/utils/converter';

interface PageProps {
  params: {
    barcode: string;
  };
}

const GiftHolder = ({ params: { barcode } }: PageProps) => {
  // local states
  const [mounted, setMoutned] = useState(false);
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

  // fetch gift holder by barcode
  useEffect(() => {
    (async () => {
      const res = await getApGiftHolders();

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
        {/* header - barcode */}
        <h2 className='pt-6 text-3xl font-bold leading-[1.15] text-black sm:text-4xl text-center'>
          {barcode}
        </h2>
        <hr className='bg-[rgba(256,256,256,0.3)]' />

        {/* price actions*/}
        <div className='flex flex-col gap-3'>
          {/* price */}
          <p className='text-2xl sm:text-4xl font-semibold text-center whitespace-nowrap overflow-hidden overflow-ellipsis'>
            {beautifyUSD(holder.giftAmount)}
          </p>

          {/* actions */}
          <div className='flex gap-3 justify-center items-center text-lg font-semibold'>
            <button className='flex w-32 gap-1 items-center px-2 border-1 transition duration-200 border-red-500 justify-center rounded-lg text-red-500 hover:bg-red-400 hover:text-white'>
              Decrease <AiOutlineArrowDown />
            </button>
            <button className='flex w-32 gap-1 items-center px-2 border-1 transition duration-200 border-amber-500 justify-center rounded-lg text-amber-500 hover:bg-amber-400 hover:text-white'>
              Increase <AiOutlineArrowUp />
            </button>
          </div>
        </div>
        <hr className='bg-[rgba(256,256,256,0.3)]' />

        {/* contact information */}
        <div className='pb-6 flex flex-col font-semibold text-lg justify-center'>
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
      </div>
    </section>
  );
};

export default GiftHolder;
