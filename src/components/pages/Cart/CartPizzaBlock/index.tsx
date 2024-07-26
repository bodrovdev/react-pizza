import { useDispatch } from 'react-redux';
import { increaseItem, decreaseItem, removeStack } from '../../../../redux/slices/cartSlice';
import { ToCartPizzaItem } from '../../../common/Types/PizzaItem.type';
import styles from './CartPizzaBlock.module.scss';

import Counter from '../../../common/Counter';

type CartPizzaBlockProps = Omit<ToCartPizzaItem, 'id' | 'category'>;

function CartPizzaBlock({ count, imageUrl, keyword, name, price, size, type }: CartPizzaBlockProps) {

  const dispatch = useDispatch();

  const handlePlusCounter = (): void => {
    dispatch(increaseItem({ keyword, count: 1 }));
  }

  const handleMinusCounter = (): void => {
    dispatch(decreaseItem({ keyword, count: 1 }));
  }

  const handleRemoveStack = (): void => {
    dispatch(removeStack({ keyword }));
  }

  return (
    <div className={styles.root}>
      <div className={styles.itemInfo}>
        <figure className={styles.itemImage}>
          <img className={styles.itemImg} src={imageUrl} />
        </figure>
        <div>
          <h2 className={styles.itemTitle}>{name}</h2>
          <span className={styles.itemDescription}>{type}, {size} см.</span>
        </div>
      </div>
      <div className={styles.itemResult}>
        <Counter minusClick={handleMinusCounter} count={count} plusClick={handlePlusCounter} />
        <span className={styles.itemPrice}>{price * count} ₽</span>
        <button className={styles.itemDelete} type="button" onClick={handleRemoveStack}></button>
      </div>
    </div>
  )
}

export default CartPizzaBlock