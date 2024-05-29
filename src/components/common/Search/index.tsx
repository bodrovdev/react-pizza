import debounce from 'lodash.debounce';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchValue, setLocalSearchValue, selectSort } from '../../../redux/slices/sortSlice';
import '../../../scss/style.scss';
import styles from './Search.module.scss';

import Clean from '../../Icons/Clean';
import SearchIcon from '../../Icons/SearchIcon';

function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { localSearchValue } = useSelector(selectSort);

  const handleUpdateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 500), []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLocalSearchValue(e.target.value));
    handleUpdateSearchValue(e.target.value);
  }

  const handleInputClean = (): void => {
    dispatch(setLocalSearchValue(''))
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  }

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className={styles.searchBlock}>
      <SearchIcon className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Поиск"
        value={localSearchValue}
        onChange={(e) => { handleInputChange(e) }}
        ref={inputRef}
      />
      {Boolean(localSearchValue) && <Clean className={styles.searchClean} onClickClean={() => { handleInputClean() }} />}
    </div>
  )
}

export default Search