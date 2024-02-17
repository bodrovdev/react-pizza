import '../../scss/style.scss';
import styles from './Search.module.scss';

import Clean from '../Icons/Clean';
import SearchIcon from '../Icons/SearchIcon';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';

function Search() {

  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchBlock}>
      <SearchIcon className={styles.searchIcon} />

      <input className={styles.searchInput} onChange={(e) => { dispatch(setSearchValue(e.target.value)) }} value={searchValue} type="text" placeholder="Поиск" />

      {searchValue && <Clean className={styles.searchClean} onClickClean={() => { dispatch(setSearchValue('')) }} />}
    </div>
  )
}

export default Search