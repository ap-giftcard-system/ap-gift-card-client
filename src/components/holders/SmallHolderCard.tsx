import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineMail } from 'react-icons/hi';
import { RiUserSmileLine } from 'react-icons/ri';
import { ApGiftHolder } from '@/utils/interfaces';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import ConvertDateString, {
  beautifyE164PhoneNumber,
  beautifyUSD,
} from '@/utils/converter';

const SmallHolderCard = ({ holder }: { holder: ApGiftHolder }) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    if (window && (e.metaKey || e.ctrlKey)) {
      window.open(`/gift-holders/${holder.barCode}`);
    } else {
      router.push(`/gift-holders/${holder.barCode}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='border-1 border-gray-300 rounded-lg bg-white p-2 shadow-lg flex flex-col gap-3 transition-all transform hover:-translate-y-1 hover:cursor-pointer
                h-[12rem]'
    >
      {/* barcode */}
      <div className='flex justify-between items-center'>
        <p className='text-lg font-bold text-center whitespace-nowrap overflow-hidden overflow-ellipsis text-amber-500'>
          {holder.barCode}
        </p>

        {/* gift amount */}
        <p className='text-lg font-bold text-center whitespace-nowrap overflow-hidden overflow-ellipsis'>
          {beautifyUSD(holder.giftAmount)}
        </p>
      </div>
      <hr className='bg-[rgba(256,256,256,0.3)]' />

      {/* contact information */}
      <div className='flex flex-col font-bold'>
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
              onClick={(e) => e.stopPropagation()}
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
            <Link
              href={`mailto:${holder.holderEmail}`}
              onClick={(e) => e.stopPropagation()}
              className='hover:underline'
            >
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
