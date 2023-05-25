'use client';

import { ChangeEvent, useState } from 'react';
import { ApGiftHolder } from '@/utils/interfaces';
import ApInputField from './utils/ApInputField';

const SellForm = () => {
  const [apGiftHolder, setApGiftHolder] = useState<ApGiftHolder>({
    giftHolderId: '',
    barCode: '',
    holderName: '',
    holderPhone: '',
    holderEmail: '',
    giftAmount: 0,
    createdAt: '',
    updatedAt: '',
  });

  const handleOnFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApGiftHolder((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <form className='flex flex-col gap-6 sm:w-96'>
      {/* barcode */}
      <ApInputField
        id='barCode'
        title='Barcode'
        type='text'
        value={apGiftHolder.barCode}
        handleOnFieldChange={handleOnFieldChange}
        placeholder='Barcode...'
      />

      {/* holderName */}
      <ApInputField
        id='holderName'
        title='Holder Name'
        type='text'
        value={apGiftHolder.holderName}
        handleOnFieldChange={handleOnFieldChange}
        placeholder="Gift holder's name..."
      />

      {/* holderPhone */}
      <ApInputField
        id='holderPhone'
        title='Holder Phone'
        type='text'
        value={apGiftHolder.holderPhone}
        handleOnFieldChange={handleOnFieldChange}
        placeholder="Gift holder's phone..."
        note={true}
      />

      {/* holderEmail */}
      <ApInputField
        id='holderEmail'
        title='Holder Email'
        type='text'
        value={apGiftHolder.holderEmail}
        handleOnFieldChange={handleOnFieldChange}
        placeholder="Gift holder's email"
        note={true}
      />

      {/* giftAmount */}
      <ApInputField
        id='giftAmount'
        title='Gift Amount'
        type='number'
        value={apGiftHolder.giftAmount}
        handleOnFieldChange={handleOnFieldChange}
        placeholder=''
      />
    </form>
  );
};
export default SellForm;
