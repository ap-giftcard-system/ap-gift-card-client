'use client';

import { Toaster } from 'react-hot-toast';
import { ApToast } from '@/common/ApToast';
import ApInputField from './utils/ApInputField';
import { ApGiftHolder } from '@/utils/interfaces';
import ApSmallLoader from './utils/ApSmallLoader';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

const SellForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputRef = useRef<any>();
  const emailInputRef = useRef<any>();
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

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // prevent reloading
    e.preventDefault();

    let isPhoneValid = true;
    let isEmailvalid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const e164Regex = /^\+?\d{6,15}$/;
    const formattedValue = apGiftHolder.holderPhone.replace(/\D/g, '');

    // @logic execute contact purposes logic
    if (apGiftHolder.holderPhone === '' && apGiftHolder.holderEmail === '') {
      phoneInputRef.current.focus();
      phoneInputRef.current.style.borderColor = 'red';
      emailInputRef.current.style.borderColor = 'red';
      ApToast(
        'error',
        'Must provide at least phone or email for contact purposes.'
      );
      return;
    } else if (
      apGiftHolder.holderPhone !== '' &&
      apGiftHolder.holderEmail === ''
    ) {
      isPhoneValid = e164Regex.test(formattedValue);
    } else if (
      apGiftHolder.holderPhone === '' &&
      apGiftHolder.holderEmail !== ''
    ) {
      isEmailvalid = emailRegex.test(apGiftHolder.holderEmail);
    } else {
      isPhoneValid = e164Regex.test(formattedValue);
      isEmailvalid = emailRegex.test(apGiftHolder.holderEmail);
    }

    // show error
    if (!isPhoneValid) {
      phoneInputRef.current.focus();
      phoneInputRef.current.style.borderColor = 'red';
      ApToast('error', 'Invalid phone number.');
      return;
    } else {
      phoneInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
    }

    if (!isEmailvalid) {
      emailInputRef.current.focus();
      emailInputRef.current.style.borderColor = 'red';
      ApToast('error', 'Invalid email.');
      return;
    } else {
      emailInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
    }

    // turn isSubmitting on
    setIsSubmitting(true);

    // turn isSubmitting off
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (apGiftHolder.holderPhone === '' || apGiftHolder.holderEmail === '') {
      phoneInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
      emailInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
    }
  }, [apGiftHolder.holderPhone, apGiftHolder.holderEmail]);

  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 sm:w-96'>
      {/* barcode */}
      <ApInputField
        id='barCode'
        title='Barcode'
        type='text'
        value={apGiftHolder.barCode}
        handleOnFieldChange={handleOnFieldChange}
        placeholder='Barcode...'
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
        inputRef={phoneInputRef}
        title='Holder Phone'
        type='text'
        value={apGiftHolder.holderPhone}
        handleOnFieldChange={handleOnFieldChange}
        placeholder='(319)-883-2322 or 3198832322'
        note={true}
      />

      {/* holderEmail */}
      <ApInputField
        id='holderEmail'
        inputRef={emailInputRef}
        title='Holder Email'
        type='text'
        value={apGiftHolder.holderEmail}
        handleOnFieldChange={handleOnFieldChange}
        placeholder="Gift holder's email"
        note={true}
      />

      {/* Submit button */}
      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-3 px-5 py-2 text-lg border-1 transition ease-in-out duration-300 border-teal-400 hover:bg-green-400 rounded-lg text-black hover:text-white font-bold shadow-lg'
      >
        {isSubmitting ? (
          <div className='flex gap-2 justify-center items-center'>
            <p>Processing...</p>
            <ApSmallLoader />
          </div>
        ) : (
          'Submit'
        )}
      </button>

      {/* Toaster */}
      <Toaster reverseOrder={false} />
    </form>
  );
};
export default SellForm;
