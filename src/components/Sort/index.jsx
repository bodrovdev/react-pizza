import { useState } from 'react';
import '../../scss/style.scss';
import styles from './Sort.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setSortDir, setSortValue } from '../../redux/slices/sortSlice';

export const sortTypes = [
  { sortName: 'По цене', sortType: 'price' },
  { sortName: 'По популярности', sortType: 'rating' },
  { sortName: 'По алфавиту', sortType: 'name' },
];

function Sort() {
  const [isVisibleSort, setVisibleSort] = useState(false);

  const { sortValue, sortDir } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const sortItemClassName = (item) => {
    return sortValue.sortType === item.sortType ? styles.captionItem_active : styles.captionItem
  }

  const sortItemOnClick = (item) => {
    dispatch(setSortValue(item));
    item.sortName === sortValue.sortName ? dispatch(setSortDir(!sortDir)) : dispatch(setSortDir(false));
    setVisibleSort(!isVisibleSort)
  }

  return (
    <section className={styles.root}>

      <div className={`${styles.container} base-container`}>
        <div className={styles.caption}>

          <div className={styles.captionContainer} onClick={() => { setVisibleSort(!isVisibleSort) }}>
            <span className={styles.captionInfo}>Сортировка по:</span>
            <span className={styles.captionContent}>{sortValue.sortName}</span>
          </div>

          {isVisibleSort && <ul className={styles.captionList}>

            {sortTypes.map((item, index) => (
              <li className={sortItemClassName(item)} onClick={() => { sortItemOnClick(item) }} key={index}>
                {item.sortName}

                {/* ВАЖНО */}
                <img className={`${styles.sortArrow} ${!sortDir && styles.sortArrow_down}`} src="assets/img/arrow.svg" />
                {/* ВАЖНО */}

              </li>
            ))}

          </ul>}

        </div>
      </div>
    </section>
  )
}

export default Sort