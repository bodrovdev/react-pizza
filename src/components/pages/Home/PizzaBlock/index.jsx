import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../../../redux/slices/cartSlice';
import '../../../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Counter from '../../../common/Counter';

const pizzaTypes = ['Тонкая', 'Традиционная'];

function PizzaBlock({ id, imageUrl, name, types, sizes, price }) {
  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));

  const dispatch = useDispatch();
  const pizzasCart = useSelector((state) => state.cart.items);

  const [activeType, setActiveType] = useState(selectedTypes[0]);
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

  const handleAddToCart = (obj) => {
    dispatch(addItem(obj));
  }

  const handleRemoveFromCart = (obj) => {
    dispatch(removeItem(obj));
  };

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <img className={styles.img} src={imageUrl} alt="#" />
        <h2 className={styles.title}>{name}</h2>
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
          <span className={styles.descInfoPrice}>от <span>{price}</span> ₽</span>

          {existedInCartPizza ?

            <Counter
              minusClick={() => { handleRemoveFromCart(pizzaObj) }}
              count={existedInCartPizza.count}
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