import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem, selectCart } from '../../../../redux/slices/cartSlice';
import '../../../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Counter from '../../../common/Counter';

const pizzaTypes: string[] = ['Тонкая', 'Традиционная'];

type PizzaBlock = {
  id: number,
  imageUrl: string,
  name: string,
  price: number,
}

type PizzaBlockProps = PizzaBlock & {
  types: number[],
  sizes: number[],
}

function PizzaBlock({ id, imageUrl, name, types, sizes, price }: PizzaBlockProps) {
  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));

  const dispatch = useDispatch();
  const { itemsInCart } = useSelector(selectCart);

  const [activeType, setActiveType] = useState(selectedTypes[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  type PizzaObj = PizzaBlock & {
    type: string,
    size: number,
    keyword: string,
  }

  const pizzaObj: PizzaObj = {
    id,
    imageUrl,
    name,
    type: activeType,
    size: activeSize,
    price,
    keyword: `${name.split('').filter(item => !['-', ' '].includes(item)).join('')}${activeType}${activeSize}`,
  };

  const itemInCart: PizzaObj & { count: number } = itemsInCart.find((item: PizzaObj) => item.keyword === pizzaObj.keyword);

  const handleActiveOptions = (state: string | number, item: string | number): string => {
    return state === item ? `${styles.descOptionsItem} ${styles.descOptionsItem__active}` : styles.descOptionsItem;
  };

  const handleAddToCart = (obj: PizzaObj): void => {
    dispatch(addItem(obj));
  };

  const handleRemoveFromCart = (obj: PizzaObj): void => {
    dispatch(removeItem(obj));
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
          <span className={styles.descInfoPrice}>от <span>{price}</span> ₽</span>

          {itemInCart ?

            <Counter
              minusClick={() => { handleRemoveFromCart(pizzaObj) }}
              count={itemInCart.count}
              plusClick={() => { handleAddToCart(pizzaObj) }}
            />

            :

            <button className={styles.descInfoButton} onClick={() => { handleAddToCart(pizzaObj) }}>Добавить</button>}

        </div>
      </div>
    </div>
  )
}

export default PizzaBlock