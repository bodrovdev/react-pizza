import { useState, useRef, useCallback } from 'react';
import '../../scss/style.scss';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';

import Clean from '../Icons/Clean';
import SearchIcon from '../Icons/SearchIcon';

function Search() {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState('');

  const updateSearchValue = useCallback(
    debounce((localSearchValue) => {
      dispatch(setSearchValue(localSearchValue));
    }, 500), []
  )

  const onChangeInput = (e) => {
    setLocalSearch(e.target.value);
    updateSearchValue(localSearch);
  }

  const onClean = () => {
    setLocalSearch('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  }

  return (
    <div className={styles.searchBlock}>
      <SearchIcon className={styles.searchIcon} />

      <input
        className={styles.searchInput}
        type="text"
        placeholder="Поиск"
        value={localSearch}
        onChange={(e) => { onChangeInput(e) }}
        ref={inputRef}
      />

      {localSearch && <Clean className={styles.searchClean} onClickClean={() => { onClean() }} />}
    </div>
  )
}

export default Search