import React from 'react';
import '../../scss/style.scss';
import styles from './Sort.module.scss';

import CheckMark from '../Icons/CheckMark';

// * 6) REDUX. Импортируем useSelector, useDispatch
import { useSelector, useDispatch } from 'react-redux'
// * 7) REDUX. Импортируем методы из слайсов
import { setSortValue } from '../../redux/slices/sortSlice';
import { setSortDir } from '../../redux/slices/sortSlice';

function Sort() {

  // * 8) REDUX. Достаём значение из слайса
  const { sortValue, sortDir } = useSelector((state) => state.sort);
  // * 9) REDUX. Получаем доступ к dispatch
  const dispatch = useDispatch();

  let sortTypes = [
    { sortName: 'По цене', sortType: 'price' },
    { sortName: 'По популярности', sortType: 'rating' },
    { sortName: 'По алфавиту', sortType: 'name' },
  ];

  const sortItemClassName = (item) => {
    return sortValue.sortType === item.sortType ? styles.captionItem_active : styles.captionItem
  }

  const sortItemOnClick = (item) => {
    dispatch(setSortValue(item));
    item.sortName === sortValue.sortName ? dispatch(setSortDir(!sortDir)) : dispatch(setSortDir(false));
  }

  return (
    <section className={styles.root}>

      <div className={`${styles.container} base-container`}>
        <div className={styles.caption}>

          <span className={styles.captionInfo}>Сортировка по:</span>
          <span className={styles.captionContent}>{sortValue.sortName}</span>

          <ul className={styles.captionList}>

            {sortTypes.map((item, index) => (
              <li className={sortItemClassName(item)} onClick={() => { sortItemOnClick(item) }} key={index}>
                {item.sortName}
                <CheckMark />
              </li>
            ))}

          </ul>
        </div>
      </div>
    </section>
  )
}

export default Sort