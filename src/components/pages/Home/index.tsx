import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFilter, setSorting } from '../../../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../../../redux/slices/pizzasSlice';
import '../../../scss/style.scss';
import { pizzaCategories } from './Categories';
import styles from './Home.module.scss';

import Preloader from '../../common/Preloader';
import Categories from './Categories';
import PizzaBlock from './PizzaBlock';
import Sort, { sortTypes } from './Sort';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFiltered = useRef(false);
  const isMounted = useRef(false);

  const { categoryValue, sortValue, sortDir, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const getPizzas = () => {
    // @ts-ignore
    dispatch(fetchPizzas({
      category: categoryValue ? categoryValue : '',
      sortBy: sortValue.sortType,
      order: sortDir === false ? 'desc' : 'asc',
      name: searchValue,
    }));
  }

  // & проверка на наличие параметров в URL, записываем полученные параметры в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortStartValue = sortTypes.find(obj => obj.sortType === params.sort)

      dispatch(setSorting({ ...params, sortStartValue }));

      isFiltered.current = true;
    }
  }, [])

  // & получаем все айтемы, если параметров в URL нет
  useEffect(() => {
    if (!isFiltered.current) {
      getPizzas();
    }

    isFiltered.current = false;

  }, [categoryValue, sortValue, sortDir, searchValue]);

  // & проверка на первый рендер, записываем параметры из редакса в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryValue,
        sort: sortValue.sortType,
        order: sortDir === false ? 'desc' : 'asc',
        name: searchValue,
      })
      navigate(`?${queryString}`);
    }
    isMounted.current = true;

  }, [categoryValue, sortValue, sortDir, searchValue])

  if (status === 'error') {
    return (
      <div className={`${styles.homeContainer} base-container`}>
        Ошибка загрузки данных 😔
      </div>
    )
  }

  return (
    <>
      <div>

        <Categories />

        <Sort />

      </div>

      <div className={styles.root}>
        <div className={`${styles.homeContainer} base-container`}>
          <h2 className='section-title'>{pizzaCategories[categoryValue]}</h2>
          {status === 'loading' ?
            <div className={styles.preloaderWrapper}>
              <Preloader />
            </div>
            :
            <div className={styles.wrapper}>
              {items.map((item: any, index: any) => (
                <PizzaBlock category={item.category} id={item.id} imageUrl={item.imageUrl} key={index} name={item.name} price={item.price} sizes={item.sizes} types={item.types} rating={item.rating} />
              ))}
            </div>
          }
        </div>
      </div >
    </>
  )
}
export default Home