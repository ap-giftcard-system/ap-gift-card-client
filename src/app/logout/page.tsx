'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove('SESSIONID');
    Cookies.remove('_isAuth');
    router.push('/');
    router.refresh();
  }, [router]);

  return (
    <div className='pt-40 text-lg font-semibold'>
      Logging out and redirecting to login page...
      <br />
      Still here? refresh the page.
    </div>
  );
};

export default Logout;
