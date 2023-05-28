import Link from 'next/link';
import { ApGiftHolder } from '@/utils/interfaces';
import ConvertDateString, {
  beautifyE164PhoneNumber,
  beautifyUSD,
} from '@/utils/converter';
import { RiUserSmileLine } from 'react-icons/ri';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';

const SmallHolderCard = ({ holder }: { holder: ApGiftHolder }) => {
  return (
    <div
      className='border-1 border-gray-300 rounded-lg bg-white p-2 shadow-lg flex flex-col gap-3
                h-[12rem]'
    >
      {/* barcode */}
      <div className='flex justify-between items-center'>
        <p className='text-lg font-bold text-center whitespace-nowrap overflow-hidden overflow-ellipsis'>
          {holder.barCode}
        </p>

        {/* gift amount */}
        <p className='text-lg font-semibold text-center whitespace-nowrap overflow-hidden overflow-ellipsis'>
          {beautifyUSD(holder.giftAmount)}
        </p>
      </div>
      <hr className='bg-[rgba(256,256,256,0.3)]' />

      {/* contact information */}
      <div className='flex flex-col font-semibold'>
        {/* name */}
        <div className='flex gap-1 items-center'>
          <RiUserSmileLine size={20} />
          <p className='text-base'>{holder.holderName}</p>
        </div>

        {/* phone */}
        {holder.holderPhone && (
          <div className='flex gap-1 items-center'>
            <HiOutlineDevicePhoneMobile size={20} />
            <Link
              href={`tel:${holder.holderPhone}`}
              className='hover:underline'
            >
              {beautifyE164PhoneNumber(holder.holderPhone)}
            </Link>
          </div>
        )}

        {/* email */}
        {holder.holderEmail && (
          <div className='flex gap-1 items-center'>
            <HiOutlineMail size={20} />
            <Link href={`mailto:${holder.holderEmail}`}>
              {holder.holderEmail}
            </Link>
          </div>
        )}
      </div>
      <hr className='bg-[rgba(256,256,256,0.3)]' />

      {/* date added */}
      <div>Date added: {ConvertDateString(holder.createdAt)}</div>
    </div>
  );
};

export default SmallHolderCard;
