import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import '../../../../scss/style.scss';
import styles from './Sort.module.scss';

import Arrow from '../../../Icons/Arrow';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setOrder, setSort } from '../../../../redux/slices/filterSlice';

export type SortType = {
  name: 'По цене' | 'По алфавиту' | 'По популярности',
  sortBy: 'price' | 'name' | 'rating'
}

export const sortTypes: SortType[] = [
  { name: 'По цене', sortBy: 'price' },
  { name: 'По алфавиту', sortBy: 'name' },
  { name: 'По популярности', sortBy: 'rating' },
];

function Sort() {
  const dispatch = useDispatch();
  const { sort, order } = useSelector(selectFilter);

  const [isVisibleSort, setVisibleSort] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sortRef, () => {
    setVisibleSort(false);
  })

  const handleSortItemClassName = (item: SortType): string => {
    return sort.sortBy === item.sortBy ? `${styles.captionItem} ${styles.captionItem_active}` : styles.captionItem;
  }

  const handleSortListClassName = (): string => {
    return isVisibleSort ? `${styles.captionList} ${styles.captionList_active}` : styles.captionList;
  }

  const handleSortChange = (item: SortType): void => {
    dispatch(setSort(item));
    item.name === sort.name ? dispatch(setOrder(!order)) : dispatch(setOrder(false));
    setVisibleSort(!isVisibleSort);
  }

  return (
    <section className={styles.root}>
      <div className="base-container">
        <div className={styles.caption} ref={sortRef} onClick={() => { setVisibleSort(!isVisibleSort) }}>
          <span className={styles.captionInfo}>Сортировка по:</span>
          <span className={styles.captionContent}>{sort.name}</span>

          <Arrow arrowClassName={`${styles.sortArrow} ${!order && styles.sortArrow_down}`} />

          <ul className={handleSortListClassName()}>
            {sortTypes.map((item, index) => (
              <li className={handleSortItemClassName(item)} onClick={() => { handleSortChange(item) }} key={index}>
                {item.name}
                <Arrow arrowClassName={`${styles.sortArrow} ${!order && styles.sortArrow_down}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Sort