import '../../../scss/style.scss';
import useFetchOnCondition from '../../../utils/hooks/useFetchOnCondition';
import styles from './Home.module.scss';

import Preloader from '../../common/Preloader';
import Categories, { pizzaCategories } from './Categories';
import PizzaBlock from './PizzaBlock';
import Sort from './Sort';

import { Status } from '../../../redux/Pizza/types';

function Home() {

  const { items, status, category } = useFetchOnCondition();

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