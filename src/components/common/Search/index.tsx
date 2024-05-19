import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useRef } from 'react';
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

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 500), []
  );

  const onChangeInput: (e: ChangeEvent) => void = (e) => {
    dispatch(setLocalSearchValue((e.target as HTMLInputElement)?.value));
    updateSearchValue((e.target as HTMLInputElement)?.value);
  }

  const onCleanInput: () => void = () => {
    if (inputRef.current) {
      dispatch(setLocalSearchValue(''))
      dispatch(setSearchValue(''));
      inputRef.current.focus();
    }
  }

  if (location.pathname === '/cart') {
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
        onChange={(e) => { onChangeInput(e) }}
        ref={inputRef}
      />
      {Boolean(localSearchValue) && <Clean className={styles.searchClean} onClickClean={() => { onCleanInput() }} />}
    </div>
  )
}

export default Search