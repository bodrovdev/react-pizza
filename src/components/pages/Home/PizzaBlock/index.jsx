import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../../../redux/slices/cartSlice';
import '../../../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Counter from '../../../common/Counter';

const pizzaTypes = ['Тонкая', 'Традиционная'];

function PizzaBlock({ id, imageUrl, name, types, sizes, price }) {
  const dispatch = useDispatch();

  const pizzasCart = useSelector((state) => state.cart.items);

  const [activeType, setActiveType] = useState(pizzaTypes[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const pizzaObj = {
    id,
    imageUrl,
    name,
    type: activeType,
    size: activeSize,
    price,
    keyword: `${name.split('').filter(item => !['-', ' '].includes(item)).join('')}${activeType}${activeSize}`,
  };

  const existedInCartPizza = pizzasCart.find(item => item.keyword === pizzaObj.keyword);

  const handleActiveOptions = (state, item) => {
    return state === item ? `${styles.descOptionsItem} ${styles.descOptionsItem__active}` : styles.descOptionsItem;
  }

  const handleItemAddToCart = (obj) => {
    dispatch(addItem(obj));
  }

  const handleItemRemoveFromCart = (obj) => {
    dispatch(removeItem(obj));
  };

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <figure className={styles.image}>
          <img className={styles.img} src={imageUrl} alt="#" />
        </figure>
        <h2 className={styles.descTitle}>{name}</h2>
      </div>
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
          <span className={styles.descInfoPrice}>от {price} ₽</span>

          {existedInCartPizza ?

            <Counter
              count={existedInCartPizza.count}
              onPlusClick={() => { handleItemAddToCart(pizzaObj) }}
              onMinusClick={() => { handleItemRemoveFromCart(pizzaObj) }}
            />

            :

            <button className={styles.descInfoButton} onClick={() => { handleItemAddToCart(pizzaObj) }}>Добавить</button>}

        </div>
      </div>
    </div>
  )
}

export default PizzaBlock