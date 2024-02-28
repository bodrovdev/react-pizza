import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../scss/style.scss';
import styles from './Home.module.scss';

import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Sort from '../../components/Sort';

import { useSelector } from 'react-redux';

function Home() {
  const { categoryValue, sortValue, sortDir } = useSelector((state) => state.sort);
  const searchValue = useSelector((state) => state.search.value);

  //* pizza items
  const [pizzasItems, setPizzasItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // * url
  const getCategory = categoryValue === 0 ? `` : `category=${categoryValue}`;
  const getSort = `&sortBy=${sortValue.sortType}&order=${sortDir === false ? 'desc' : 'asc'}`;
  const getSearch = searchValue && `&search=${searchValue}`;

  useEffect(() => {

    setLoading(true);
    let url = `https://653e4e07f52310ee6a9acea3.mockapi.io/items?${getCategory}${getSearch}${getSort}`;

    axios.get(url)
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
  }, [categoryValue, sortValue, searchValue]);

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