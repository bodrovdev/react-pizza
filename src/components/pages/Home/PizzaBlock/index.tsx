import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FetchedPizzaItem, ToCartPizzaItem } from '../../../common/Types/PizzaItem.type';
import styles from './PizzaBlock.module.scss';
import Preloader from '../../../common/Preloader';
import Counter from '../../../common/Counter';
import '../../../../scss/style.scss';

const pizzaTypes: string[] = ['Тонкая', 'Традиционная'];

type PizzaBlockProps = Omit<FetchedPizzaItem, 'rating'>

function PizzaBlock({ category, id, imageUrl, name, price, sizes, types }: PizzaBlockProps) {

  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));

  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(selectedTypes[0]);
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [isVisiblePreload, setPreloadVisibility] = useState<boolean>(false);

  const pizzaObj: ToCartPizzaItem = {
    category,
    count: currentCount,
    id,
    imageUrl,
    keyword: `${name.split('').filter(item => !['-', ' '].includes(item)).join('')}${activeType}${activeSize}`,
    name,
    price,
    size: activeSize,
    type: activeType,
  };

  const handleActiveOptions = (state: string | number, item: string | number): string => {
    return state === item ? `${styles.descOptionsItem} ${styles.descOptionsItem__active}` : styles.descOptionsItem;
  };

  const handleIncreaseAddingNumber = (): void => {
    setCurrentCount(currentCount + 1);
  }

  const handleDecreaseAddingNumber = (): void => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    }
  }

  const handleAddToCart = (obj: ToCartPizzaItem): void => {
    dispatch(addItem(obj));
    setPreloadVisibility(true);
    setTimeout(() => { setPreloadVisibility(false) }, 500);
  };

  return (
    <div className={styles.root}>
      <Link className={styles.heading} to={`/pizza/${id}`} >
        <img className={styles.img} src={imageUrl} alt="#" />
        <h2 className={styles.title}>{name}</h2>
      </Link>
      <div className={styles.desc}>
        <div className={styles.descOptions}>

          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__feature}`}>
            {types.map((item, index) => (
              <li className={handleActiveOptions(activeType, pizzaTypes[item])} onClick={() => { setActiveType(pizzaTypes[item]) }} key={index}>{pizzaTypes[item]}</li>
            ))}
          </ul>

          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__price}`}>
            {sizes.map((item, index) => (
              <li className={handleActiveOptions(activeSize, item)} onClick={() => { setActiveSize(item) }} key={index}>{item} см.</li>
            ))}
          </ul>

        </div>
        <div className={styles.descInfo}>
          <div className={styles.descInfoWrapper}>
            <span className={styles.descInfoPrice}>{price * pizzaObj.count} ₽</span>
            <Counter
              minusClick={() => { handleDecreaseAddingNumber() }}
              count={pizzaObj.count}
              plusClick={() => { handleIncreaseAddingNumber() }}
            />
          </div>
          <button className={styles.descInfoButton} onClick={() => { handleAddToCart(pizzaObj) }}>

            {isVisiblePreload ? <Preloader width={20} height={20} /> : 'В корзину'}

          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock