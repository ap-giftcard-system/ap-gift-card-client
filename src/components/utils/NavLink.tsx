'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const NavLinks = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const isAuthGranted = Cookies.get('_isAuth');

  const handleLogOut = () => {
    Cookies.remove('SESSIONID');
    Cookies.remove('_isAuth');
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    if (isAuthGranted) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuthGranted]);
  return (
    <>
      {isAuth && (
        <div className='flex gap-1 sm:gap-3 md:gap-9 tracking-tight font-semibold'>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.title}
              className='w-16 sm:w-24 border-1 transition duration-200 border-transparent hover:border-amber-500 flex justify-center rounded-lg hover:text-amber-500'
              href={item.url}
            >
              {item.title}
            </Link>
          ))}
          <button
            onClick={handleLogOut}
            className='w-16 sm:w-24 border-1 transition duration-200 border-transparent hover:border-red-500 flex justify-center rounded-lg hover:text-red-500'
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default NavLinks;
