import styles from './CartPizzaBlock.module.scss';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, removeStack } from '../../../../redux/slices/cartSlice';

import Counter from '../../../common/Counter';

type CartPizzaBlockType = {
  name: string,
  type: string,
  size: number,
  price: number,
  keyword: string,
  count: number,
}

function CartPizzaBlock({ name, type, size, price, keyword, count }: CartPizzaBlockType) {
  const dispatch = useDispatch();

  const plusCounterHandler: () => void = () => {
    dispatch(addItem({ keyword }));
  }

  const minusCounterHandler: () => void = () => {
    dispatch(removeItem({ keyword }));
  }

  const removeStackHandler: () => void = () => {
    dispatch(removeStack({ keyword }));
  }

  return (
    <div className={styles.root}>
      <div className={styles.itemInfo}>
        <figure className={styles.itemImage}>
          <img className={styles.itemImg} src="https://i.imgur.com/a9I9WHm.jpeg" />
        </figure>
        <div>
          <h2 className={styles.itemTitle}>{name}</h2>
          <span className={styles.itemDescription}>{type}, {size} см.</span>
        </div>
      </div>
      <div className={styles.itemResult}>
        <Counter minusClick={minusCounterHandler} count={count} plusClick={plusCounterHandler} />
        <span className={styles.itemPrice}>{price} ₽</span>
        <button className={styles.itemDelete} type="button" onClick={removeStackHandler}></button>
      </div>
    </div>
  )
}

export default CartPizzaBlock