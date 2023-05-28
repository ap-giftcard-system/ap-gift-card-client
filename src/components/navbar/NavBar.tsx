import Link from 'next/link';
import NavLinks from './utils/NavLink';

const NavBar = () => {
  return (
    <nav
      className='w-full mt-3 flex justify-between items-center text-base px-3
                sm:mt-0 sm:h-12 sm:gap-0 sm:text-lg sm:px-6
                md:text-xl md:px-9'
    >
      {/* Logo */}
      <Link href='/'>
        <span className='orange_gradient text-center font-bold'>
          {' '}
          AP Nail Art{' '}
        </span>
      </Link>

      {/* navigation links*/}
      <NavLinks />
    </nav>
  );
};

export default NavBar;
