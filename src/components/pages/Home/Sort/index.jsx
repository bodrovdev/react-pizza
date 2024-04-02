import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import '../../../../scss/style.scss';
import styles from './Sort.module.scss';

import Arrow from '../../../icons/Arrow';

import { useDispatch, useSelector } from 'react-redux';
import { setSortDir, setSortValue } from '../../../../redux/slices/sortSlice';

export const sortTypes = [
  { sortName: 'По цене', sortType: 'price' },
  { sortName: 'По популярности', sortType: 'rating' },
  { sortName: 'По алфавиту', sortType: 'name' },
];

function Sort() {
  const [isVisibleSort, setVisibleSort] = useState(false);
  const sortRef = useRef(null);

  const { sortValue, sortDir } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const sortItemClassName = (item) => {
    return sortValue.sortType === item.sortType ? styles.captionItem_active : styles.captionItem
  }

  const sortChangeHandler = (item) => {
    dispatch(setSortValue(item));
    item.sortName === sortValue.sortName ? dispatch(setSortDir(!sortDir)) : dispatch(setSortDir(false));
    setVisibleSort(!isVisibleSort);
  }

  useOnClickOutside(sortRef, () => {
    setVisibleSort(false);
  })

  return (
    <section className={styles.root}>

      <div className={`${styles.container} base-container`}>
        <div className={styles.caption} ref={sortRef} onClick={() => {
          setVisibleSort(!isVisibleSort);
        }}>

          <div className={styles.captionContainer} >
            <span className={styles.captionInfo}>Сортировка по:</span>
            <span className={styles.captionContent}>{sortValue.sortName}</span>
            <Arrow arrowClassName={`${styles.sortArrow} ${!sortDir && styles.sortArrow_down}`} />
          </div>

          {isVisibleSort && <ul className={styles.captionList}>
            {sortTypes.map((item, index) => (
              <li className={sortItemClassName(item)} onClick={() => { sortChangeHandler(item) }} key={index}>
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