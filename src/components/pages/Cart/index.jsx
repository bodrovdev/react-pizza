import '../../../scss/style.scss';
import styles from './Cart.module.scss';

import CartIcon from '../../../components/icons/CartIcon';

function Cart() {
  return (
    <div className={styles.root}>
      <section className={styles.controls}>
        <div className="base-container">
          <div className={styles.controlHeading}>
            <CartIcon />
            <h1 className={styles.controlTitle}>Корзина</h1>
          </div>
          <button className={styles.controlClear} type="button">Очистить корзину</button>
        </div>
      </section>

      <section className={styles.cartBody}>
        <div className={styles.cartPizzas}>

        </div>
        <div className={styles.cartPayment}></div>
      </section>
    </div>
  )
}

export default Cart