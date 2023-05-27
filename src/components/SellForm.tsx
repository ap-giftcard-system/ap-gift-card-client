'use client';

import { Toaster } from 'react-hot-toast';
import { ApToast } from '@/common/ApToast';
import ApInputField from './utils/ApInputField';
import { ApGiftHolder } from '@/utils/interfaces';
import ApSmallLoader from './utils/ApSmallLoader';
import { registerGiftHolder } from '@/api/gift-api';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

const SellForm = () => {
  const phoneInputRef = useRef<any>();
  const emailInputRef = useRef<any>();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // invoke registerGiftHolder API
    const res = await registerGiftHolder(apGiftHolder);
    if (res.error !== null) {
      // prepare error message
      let errMsg = '';
      switch (res.error.key) {
        case '!DOCUMENT_CONFLICT':
          errMsg = 'A holder is already registered with this barcode.';
          break;
        case '!BAD_REQUEST':
          errMsg = 'Invalid form input.';
          break;
        case '!INTERNAL_SERVER':
        default:
          errMsg = 'Unknown server error. Call Logan!!!!';
      }
      ApToast('error', errMsg);
    } else {
      setIsSuccessful(true);
      setApGiftHolder({
        giftHolderId: '',
        barCode: '',
        holderName: '',
        holderPhone: '',
        holderEmail: '',
        giftAmount: 0,
        createdAt: '',
        updatedAt: '',
      });
    }

    // turn isSubmitting off
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (phoneInputRef.current && emailInputRef.current) {
      if (apGiftHolder.holderPhone === '' || apGiftHolder.holderEmail === '') {
        phoneInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
        emailInputRef.current.style.borderColor = '#e5e7eb'; // gray-200
      }
    }
  }, [apGiftHolder.holderPhone, apGiftHolder.holderEmail]);

  return (
    <>
      {isSuccessful ? (
        <div className='flex flex-col justify-center items-center'>
          <p className='text-xl font-semibold'>
            New Gift Holder successfully registered.
          </p>
          <button
            type='submit'
            onClick={() => setIsSuccessful(false)}
            className='mt-3 px-5 py-2 text-lg border-1 transition ease-in-out duration-300 border-amber-400 hover:bg-amber-400 rounded-lg text-black hover:text-white font-semibold shadow-lg'
          >
            Acknowledge.
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
};
export default SellForm;
