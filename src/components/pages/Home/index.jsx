import axios from 'axios';
import qs from 'qs';
import { useEffect, useState, useRef } from 'react';
import '../../../scss/style.scss';
import styles from './Home.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSorting } from '../../../redux/slices/sortSlice';

import Categories from './Categories';
import PizzaBlock from './PizzaBlock';
import Sort, { sortTypes } from './Sort';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFiltered = useRef(false);
  const isMounted = useRef(false);

  const { categoryValue, sortValue, sortDir } = useSelector((state) => state.sort);
  const searchValue = useSelector((state) => state.search.value);

  const [pizzasItems, setPizzasItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPizzas = () => {
    setLoading(true);
    let url = `https://653e4e07f52310ee6a9acea3.mockapi.io/items`;
    axios.get(url, {
      params: {
        category: categoryValue ? categoryValue : '',
        sortBy: sortValue.sortType,
        order: sortDir === false ? 'desc' : 'asc',
        search: searchValue,
      }
    })
      .then((res) => {
        setPizzasItems(res.data);
      })
      .catch((error) => {
        setPizzasItems([]);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
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
      fetchPizzas();
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
      })
      navigate(`?${queryString}`);
    }
    isMounted.current = true;

  }, [categoryValue, sortValue, sortDir])

  return (
    <>
      <Categories />

      <Sort />

      <div className={styles.root}>
        <div className={`${styles.container} base-container`}>
          <h1 className={styles.title}>Все пиццы</h1>
          {loading ?
            <div className={styles.preloader}>
              <div className={styles.preloaderCircle}></div>
            </div>
            :
            <div className={styles.wrapper}>
              {pizzasItems.map((item, index) => (
                <PizzaBlock imageUrl={item.imageUrl} name={item.name} types={item.types} sizes={item.sizes} price={item.price} key={index} />
              ))}
            </div>
          }
        </div>
      </div>
    </>
  )
}
export default Home   