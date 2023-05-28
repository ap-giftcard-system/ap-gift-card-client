'use client';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';
import { ApToast } from '@/components/common/ApToast';
import { useRouter } from 'next/navigation';
import ApInputField from '../common/ApInputField';
import ApSmallLoader from '../common/ApSmallLoader';
import { generateAccessToken } from '@/api/auth-api';
import { ChangeEvent, FormEvent, useState } from 'react';

const LoginForm = () => {
  // local state
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, setLoginFormdata] = useState({
    adminUsername: '',
    adminPassword: '',
  });

  const handleOnFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // prevent reloading
    e.preventDefault();

    // turn isSubmitting on
    setIsSubmitting(true);

    // invoke generateAccessToken API
    const res = await generateAccessToken(loginFormData);

    // handle error
    if (res.error) {
      let errMsg = '';
      switch (res.error.key) {
        case '!BAD_REQUEST':
          errMsg = 'Invalid form input.';
          break;
        case '!UNAUTHORIZED':
          errMsg = 'Invalid credentials.';
          break;
        default:
          errMsg = 'Unknown server error. Call Logan!!!!';
      }
      ApToast('error', errMsg);
    } else {
      setLoginFormdata({ adminUsername: '', adminPassword: '' });
      Cookies.set('SESSIONID', res.accessToken as string);
      Cookies.set('_isAuth', 'true');
      router.push('/sell');
      router.refresh();
    }

    // turn isSubmitting off
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 sm:w-96'>
        {/* Admin */}
        <ApInputField
          id='adminUsername'
          title='Admin'
          type='text'
          value={loginFormData.adminUsername}
          handleOnFieldChange={handleOnFieldChange}
          placeholder=''
        />

        <div className='flex flex-col gap-1'>
          {/* Password */}
          <ApInputField
            id='adminPassword'
            title='Password'
            type={showPassword ? 'text' : 'password'}
            value={loginFormData.adminPassword}
            handleOnFieldChange={handleOnFieldChange}
            placeholder=''
          />

          {/* show password */}
          <small
            onClick={() => setShowPassword((prev) => !prev)}
            className='w-fit underline hover:underline hover:cursor-pointer ml-auto'
          >
            {showPassword ? 'hide password' : 'show password'}
          </small>
        </div>

        {/* Submit button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-3 px-5 py-2 text-lg border-1 transition ease-in-out duration-300 border-amber-400 hover:bg-amber-400 rounded-lg text-black hover:text-white font-bold shadow-lg'
        >
          {isSubmitting ? (
            <div className='flex gap-2 justify-center items-center'>
              <p>Processing...</p>
              <ApSmallLoader />
            </div>
          ) : (
            'Sing In'
          )}
        </button>

        {/* Toaster */}
        <Toaster />
      </form>
    </>
  );
};

export default LoginForm;
