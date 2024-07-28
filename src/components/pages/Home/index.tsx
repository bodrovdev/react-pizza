import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../scss/style.scss';
import styles from './Home.module.scss';

import Preloader from '../../common/Preloader';
import Categories from './Categories';
import PizzaBlock from './PizzaBlock';

import { selectFilter } from '../../../redux/Filter/selectors';
import { setSorting } from '../../../redux/Filter/slice';
import { FilterSliceState } from '../../../redux/Filter/types';
import { selectPizzas } from '../../../redux/Pizza/selectors';
import { fetchPizzas } from '../../../redux/Pizza/slice';
import { ParamsType, Status } from '../../../redux/Pizza/types';
import { useAppDispatch } from '../../common/Types/Hooks.type';
import { pizzaCategories } from './Categories';
import Sort, { SortType, sortTypes } from './Sort';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = useRef<Boolean>(false);
  const isFiltered = useRef<Boolean>(false);

  const { category, sort, order, search } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const getPizzas = () => {

    const paramsObj: ParamsType = {
      category: category ? String(category) : '',
      sortBy: sort.sortBy,
      order: order === false ? 'desc' : 'asc',
      name: search,
    }

    dispatch(fetchPizzas({ ...paramsObj }));
  }

  // & проверка на наличие параметров в URL, записываем полученные параметры в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortStartValue = sortTypes.find(obj => obj.sortBy === params.sortBy);

      // (._.)
      const setSortingObj: FilterSliceState = {
        category: params.category as string,
        sort: (sortStartValue || { name: 'По цене', sortBy: 'price' }) as SortType,
        order: params.order === 'desc' ? false : true as boolean,
        search: params.name as string,
        localSearch: params.name as string,
      }

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

  }, [category, sort, order, search]);

  // & проверка на первый рендер, записываем параметры из редакса в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category,
        sortBy: sort.sortBy,
        order: order === false ? 'desc' : 'asc',
        name: search,
      })
      navigate(`?${queryString}`);
    }

    isMounted.current = true;

  }, [category, sort, order, search])

  if (status === Status.ERROR) {
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
          <h2 className='section-title'>{pizzaCategories[Number(category)]}</h2>
          {status === Status.LOADING ?
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