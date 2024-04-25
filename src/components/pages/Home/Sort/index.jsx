import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import '../../../../scss/style.scss';
import styles from './Sort.module.scss';

import Arrow from '../../../Icons/Arrow';

import { useDispatch, useSelector } from 'react-redux';
import { setSortDir, setSortValue } from '../../../../redux/slices/sortSlice';

export const sortTypes = [
  { sortName: 'По цене', sortType: 'price' },
  { sortName: 'По популярности', sortType: 'rating' },
  { sortName: 'По алфавиту', sortType: 'name' },
];

function Sort() {
  const dispatch = useDispatch();
  const { sortValue, sortDir } = useSelector((state) => state.sort);

  const [isVisibleSort, setVisibleSort] = useState(false);
  const sortRef = useRef(null);

  const handleSortItemClassName = (item) => {
    return sortValue.sortType === item.sortType ? `${styles.captionItem} ${styles.captionItem_active}` : styles.captionItem;
  }

  const handleSortListClassName = () => {
    return isVisibleSort ? `${styles.captionList} ${styles.captionList_active}` : styles.captionList;
  }

  const handleSortChange = (item) => {
    dispatch(setSortValue(item));
    item.sortName === sortValue.sortName ? dispatch(setSortDir(!sortDir)) : dispatch(setSortDir(false));
    setVisibleSort(!isVisibleSort);
  }

  useOnClickOutside(sortRef, () => {
    setVisibleSort(false);
  })

  return (
    <section className={styles.root}>

      <div className="base-container">
        <div className={styles.caption} ref={sortRef} onClick={() => { setVisibleSort(!isVisibleSort) }}>

          <span className={styles.captionInfo}>Сортировка по:</span>
          <span className={styles.captionContent}>{sortValue.sortName}</span>
          <Arrow arrowClassName={`${styles.sortArrow} ${!sortDir && styles.sortArrow_down}`} />

          {isVisibleSort && <ul className={styles.captionList}>
            {sortTypes.map((item, index) => (
              <li className={handleSortItemClassName(item)} onClick={() => { handleSortChange(item) }} key={index}>
                {item.sortName}
                <Arrow arrowClassName={`${styles.sortArrow} ${!sortDir && styles.sortArrow_down}`} />
              </li>
            ))}
          </ul>}

        </div>
      </div>
    </section>
  )
}

export default Sort