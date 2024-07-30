import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../../../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Counter from '../../../common/Counter';
import Preloader from '../../../common/Preloader';
import Modal from '../Modal';

import { addItem } from '../../../../redux/Cart/slice';
import { FetchedPizzaItem, ToCartPizzaItem } from '../../../common/Types/PizzaItem.type';

const pizzaTypes: string[] = ['Тонкая', 'Традиционная'];

type PizzaBlockProps = FetchedPizzaItem;

function PizzaBlock({ category, id, imageUrl, name, price, sizes, types, rating }: PizzaBlockProps) {
  const dispatch = useDispatch();

  const itemHeadingRef = useRef<HTMLDivElement>(null);
  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(selectedTypes[0]);
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [isVisibleModal, setModalVisibility] = useState<boolean>(false);
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
    setPreloadVisibility(true);

    setTimeout(() => {
      setPreloadVisibility(false);
      setModalVisibility(false);

      dispatch(addItem(obj));
    }, 2000);
  };

  const descOptions = <div className={styles.descOptions}>
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
  </div>;

  const addToCartButton = <button className={styles.descInfoButton} type="button" onClick={() => { handleAddToCart(pizzaObj) }} disabled={isVisiblePreload ? true : false}>
    {isVisiblePreload ? <Preloader /> : 'В корзину'}
  </button>

  return (
    <div className={styles.root}>
      <div className={styles.heading} onClick={() => { setModalVisibility(true) }} ref={itemHeadingRef}>
        <img className={styles.img} src={imageUrl} alt="#" />
        <h2 className={styles.title}>{name}</h2>
      </div>
      <div className={styles.desc}>
        {descOptions}
        <div className={styles.descInfo}>
          <div className={styles.descInfoWrapper}>
            <span className={styles.descInfoPrice}>{price * pizzaObj.count} ₽</span>
            <Counter
              minusClick={() => { handleDecreaseAddingNumber() }}
              count={pizzaObj.count}
              plusClick={() => { handleIncreaseAddingNumber() }}
            />
          </div>
          {addToCartButton}
        </div>
      </div>
      <Modal
        addToCartButton={addToCartButton}
        closeModal={() => { setModalVisibility(false) }}
        descOptions={descOptions}
        isVisibleModal={isVisibleModal}
        pizzaObj={pizzaObj}
        rating={rating}
      />
    </div>
  )
}
export default PizzaBlock