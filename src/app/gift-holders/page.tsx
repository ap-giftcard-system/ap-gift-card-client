'use client';
import { getAllHolders } from '@/api/holders-api';
import { ApToast } from '@/components/common/ApToast';
import SearchBar from '@/components/holders/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import { ApGiftHolder } from '@/utils/interfaces';
import { SetStateAction, useEffect, useState } from 'react';

const GiftHoldersPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [apGiftHolders, setApGiftHolders] = useState<ApGiftHolder[]>([]);
  const debouncedSearchVal = useDebounce(searchValue, 300);

  // fetch holders
  useEffect(() => {
    (async () => {
      const res = await getAllHolders();

      // handle error
      if (res.error) {
        let errMsg = '';
        switch (res.error?.key) {
          case '!ACCESS_TOKEN':
            if (res.error.msg === 'Cannot parse auth JWT.') {
              errMsg =
                'Authorization expired. Try logging out and log back in.';
            }
            break;
          default:
            errMsg = 'Unknown server error. Call Logan!!!!';
        }
        ApToast('error', errMsg);
      } else {
        setApGiftHolders(res.apGiftHolder as ApGiftHolder[]);
      }
    })();
  }, []);

  return (
    <section className='w-full flex flex-col gap-3 mt-9 mb-16 sm:mb-24 sm:gap-9 sm:mt-16'>
      {/* header */}
      <h1 className='head_text orange_gradient text-center'>Gift Holders</h1>

      {/* search bar */}
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      {/* list of holders */}
    </section>
  );
};

export default GiftHoldersPage;
