import { Dispatch, SetStateAction } from 'react';
import ApInputField from '../common/ApInputField';

interface PageProps {
  searchValue?: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchValue, setSearchValue }: PageProps) => {
  return (
    <div>
      <ApInputField
        id={'searchBar'}
        title={''}
        type={'text'}
        value={searchValue as string}
        handleOnFieldChange={(e) => setSearchValue!(e.target.value)}
        placeholder={'Search gift holder by bar code...'}
      />

      {/* @TODO: add search by name or search by email or search by phone feature */}
    </div>
  );
};

export default SearchBar;
