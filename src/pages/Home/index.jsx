import { useEffect, useState } from 'react';
import '../../scss/style.scss';
import styles from './Home.module.scss';

import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Sort from '../../components/Sort';

import { useSelector } from 'react-redux';

function Home() {

  const categoryValue = useSelector((state) => state.sort.categoryValue);
  const sortValue = useSelector((state) => state.sort.sortValue);
  const sortDir = useSelector((state) => state.sort.sortDir);
  const searchValue = useSelector((state) => state.search.value);

  //* pizza items
  const [pizzasItems, setPizzasItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // * url
  const getCategory = categoryValue === 0 ? `` : `category=${categoryValue}`;
  const getSort = `&sortBy=${sortValue.sortType}&order=${sortDir === false ? 'desc' : 'asc'}`;

  useEffect(() => {
    setLoading(true);

    let url = `https://653e4e07f52310ee6a9acea3.mockapi.io/items?${getCategory}${getSort}`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setPizzasItems(data);
        setLoading(false);
      });
  }, [categoryValue, sortValue]);

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
            </div> :
            <div className={styles.wrapper}>

              {pizzasItems.filter(item => (item.name.toLowerCase().includes(searchValue.toLowerCase()))).map((item, index) => (

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