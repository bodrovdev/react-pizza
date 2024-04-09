import styles from './CartPizzaBlock.module.scss';

import Counter from '../../../common/Counter';

const deleteItemHandler = () => {
  console.log('1');
}

const minusCounterHandler = () => {
  console.log('2');
}

const plusCounterHandler = () => {
  console.log('3');
}

function CartPizzaBlock() {
  return (
    <div className={styles.root}>
      <div className={styles.itemInfo}>
        <figure className={styles.itemImage}>
          <img className={styles.itemImg} src="https://i.imgur.com/a9I9WHm.jpeg" />
        </figure>
        <div>
          <h2 className={styles.itemTitle}>Сырный цыпленок</h2>
          <span className={styles.itemDescription}>тонкое тесто, 26 см.</span>
        </div>
      </div>
      <div className={styles.itemResult}>
        <Counter onMinusClick={minusCounterHandler} onPlusClick={plusCounterHandler} count={1} />
        <span className={styles.itemPrice}>770 ₽</span>
        <button className={styles.itemDelete} type="button" onClick={() => { deleteItemHandler() }}></button>
      </div>
    </div>
  )
}

export default CartPizzaBlock