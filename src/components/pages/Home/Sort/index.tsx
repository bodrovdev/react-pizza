import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import '../../../../scss/style.scss';
import styles from './Sort.module.scss';

import Arrow from '../../../Icons/Arrow';

import { useDispatch, useSelector } from 'react-redux';
import { setSortDir, setSortValue, selectSort } from '../../../../redux/slices/sortSlice';

type SortType = {
  sortName: string,
  sortType: string,
}

export const sortTypes: SortType[] = [
  { sortName: 'По цене', sortType: 'price' },
  { sortName: 'По популярности', sortType: 'rating' },
  { sortName: 'По алфавиту', sortType: 'name' },
];

function Sort() {
  const dispatch = useDispatch();
  const { sortValue, sortDir } = useSelector(selectSort);

  const [isVisibleSort, setVisibleSort] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const handleSortItemClassName: (item: SortType) => string = (item) => {
    return sortValue.sortType === item.sortType ? `${styles.captionItem} ${styles.captionItem_active}` : styles.captionItem;
  }

  const handleSortListClassName: () => string = () => {
    return isVisibleSort ? `${styles.captionList} ${styles.captionList_active}` : styles.captionList;
  }

  const handleSortChange: (item: SortType) => void = (item) => {
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

          <ul className={handleSortListClassName()}>
            {sortTypes.map((item, index) => (
              <li className={handleSortItemClassName(item)} onClick={() => { handleSortChange(item) }} key={index}>
                {item.sortName}
                <Arrow arrowClassName={`${styles.sortArrow} ${!sortDir && styles.sortArrow_down}`} />
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}

export default Sort