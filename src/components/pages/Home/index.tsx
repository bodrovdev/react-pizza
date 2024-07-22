import qs from 'qs';
import { fetchPizzas, selectPizzas } from '../../../redux/slices/pizzasSlice';
import { pizzaCategories } from './Categories';
import { selectFilter, setSorting } from '../../../redux/slices/filterSlice';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Home.module.scss';
import '../../../scss/style.scss';

import { useAppDispatch } from '../../common/Types/Hooks.type';

import Categories from './Categories';
import PizzaBlock from './PizzaBlock';
import Preloader from '../../common/Preloader';
import Sort, { SortType, sortTypes } from './Sort';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = useRef<Boolean>(false);
  const isFiltered = useRef<Boolean>(false);

  const { categoryValue, searchValue, sortDir, sortValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const getPizzas = () => {

    dispatch(fetchPizzas({
      category: categoryValue ? String(categoryValue) : '',
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

      const setSortingObj = {
        categoryValue: params.category as string,
        sortValue: sortStartValue as SortType,
        sortDir: params.order === 'desc' ? false : true as boolean,
        searchValue: params.name as string,
        localSearchValue: params.name as string,
      }

      // dispatch(setSorting({ ...params, sortStartValue }));
      dispatch(setSorting(setSortingObj));

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
          <h2 className='section-title'>{pizzaCategories[Number(categoryValue)]}</h2>
          {status === 'loading' ?
            <div className={styles.preloaderWrapper}>
              <Preloader />
            </div>
            :
            <div className={styles.wrapper}>
              {items.map((item, index: number) => (
                <PizzaBlock
                  category={item.category}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  key={index}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  sizes={item.sizes}
                  types={item.types}
                />
              ))}
            </div>
          }
        </div>
      </div >
    </>
  )
}
export default Home