import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import '../../../scss/style.scss';
import styles from './Search.module.scss';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchValue } from '../../../redux/slices/searchSlice';

import Clean from '../../Icons/Clean';
import SearchIcon from '../../Icons/SearchIcon';

function Search() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const [localSearch, setLocalSearch] = useState('');

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500), []
  )

  const onChangeInput = (e) => {
    setLocalSearch(e.target.value);
    updateSearchValue(e.target.value);
  }

  const onCleanInput = () => {
    setLocalSearch('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  }

  return (
    <>
      {location.pathname.substring(1) !== 'cart' && <div className={styles.searchBlock}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={localSearch}
          onChange={(e) => { onChangeInput(e) }}
          ref={inputRef}
        />
        {localSearch && <Clean className={styles.searchClean} onClickClean={() => { onCleanInput() }} />}
      </div>}
    </>
  )
}

export default Search