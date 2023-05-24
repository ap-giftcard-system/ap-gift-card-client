import Link from 'next/link';
import { NAV_LINKS } from '@/utils/constants';

const NavBar = () => {
  return (
    <nav
      className='w-full mt-3 flex gap-3 justify-between items-center text-base
                sm:mt-0 sm:h-12 sm:gap-0 sm:text-lg
                md:text-xl'
    >
      {/* Logo */}
      <Link href='/'>
        <span className='orange_gradient text-center font-bold'>
          {' '}
          AP Nail Art{' '}
        </span>
      </Link>
      {/* navigations */}
      <div className='flex gap-1 sm:gap-3 md:gap-9 tracking-tight'>
        {NAV_LINKS.map((item) => (
          <Link
            className='w-16 sm:w-28 border-1 transition duration-200 border-transparent hover:border-amber-500 flex justify-center rounded-lg hover:text-amber-500'
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
