'use client';
import { useEffect, useMemo, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { getAllHolders } from '@/api/holders-api';
import { ApGiftHolder } from '@/utils/interfaces';
import { ApToast } from '@/components/common/ApToast';
import SearchBar from '@/components/holders/SearchBar';
import SmallHolderCard from '@/components/holders/SmallHolderCard';

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

  // search logics
  const filteredHolders = useMemo(
    () =>
      apGiftHolders.filter(
        (item) =>
          item.barCode
            .toLocaleLowerCase()
            .includes(debouncedSearchVal.toLocaleLowerCase()) ||
          item.holderName
            .toLocaleLowerCase()
            .includes(debouncedSearchVal.toLocaleLowerCase()) ||
          item.holderEmail
            .toLocaleLowerCase()
            .includes(debouncedSearchVal.toLocaleLowerCase()) ||
          item.holderPhone
            .toLocaleLowerCase()
            .includes(
              debouncedSearchVal
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '')
            )
      ),
    [debouncedSearchVal, apGiftHolders]
  );

  return (
    <section className='w-full flex flex-col gap-3 mt-9 mb-16 sm:mb-24 sm:gap-9 sm:mt-16'>
      {/* header */}
      <h1 className='head_text orange_gradient text-center'>Gift Holders</h1>

      {/* search bar */}
      <div className='flex flex-col gap-1'>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <small className='w-fit text-sm font-semibold ml-auto pr-1'>
          {filteredHolders.length} / {apGiftHolders.length} holders
        </small>
      </div>

      {/* list of holders */}
      <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6'>
        {apGiftHolders &&
          filteredHolders.map((holder) => (
            <li key={holder.barCode}>
              <SmallHolderCard holder={holder} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default GiftHoldersPage;
