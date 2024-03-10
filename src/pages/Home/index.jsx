import axios from 'axios';
import qs from 'qs';
import { useEffect, useState } from 'react';
import '../../scss/style.scss';
import styles from './Home.module.scss';

import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Sort, { sortTypes } from '../../components/Sort';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSorting } from '../../redux/slices/sortSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { categoryValue, sortValue, sortDir } = useSelector((state) => state.sort);
  const searchValue = useSelector((state) => state.search.value);

  //* pizza items
  const [pizzasItems, setPizzasItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortStartValue = sortTypes.find(obj => obj.sortType === params.sort)

      dispatch(setSorting({
        ...params, sortStartValue,
      }));
    }
  }, [])

  useEffect(() => {
    setLoading(true);

    // * url
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

  }, [categoryValue, sortValue, sortDir, searchValue]);

  useEffect(() => {
    const queryString = qs.stringify({
      category: categoryValue,
      sort: sortValue.sortType,
      order: sortDir === false ? 'desc' : 'asc',
    })

    navigate(`?${queryString}`);
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
            </div>}
        </div>
      </div>
    </>
  )
}
export default Home   