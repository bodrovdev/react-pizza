import { Link } from 'react-router-dom';
import '../../../scss/style.scss';
import styles from './Cart.module.scss';

import CartIcon from '../../../components/icons/CartIcon';
import Arrow from '../../icons/Arrow';
import CartPizzaBlock from './CartPizzaBlock';


function Cart() {
  return (
    <div className={styles.root}>
      <div className="base-container">
        <section className={styles.controls}>
          <div className={styles.controlHeading}>
            <CartIcon />
            <h1 className={styles.controlTitle}>Корзина</h1>
          </div>
          <button className={styles.controlClear} type="button">Очистить корзину</button>
        </section>

        <section className={styles.cartBody}>
          <div className={styles.cartPizzas}>
            <CartPizzaBlock />
            <CartPizzaBlock />
            <CartPizzaBlock />
          </div>

          <div className={styles.cartPayment}>
            <div>
              <span>Сумма заказа: <span className={styles.cartPrice}>900 ₽</span></span>
              <span>Всего пицц: <span className={styles.cartTotal}>3 шт</span></span>
            </div>
            <div>
              <button className={styles.cartPaySubmit} type="button">Оплатить</button>
              <Link className={styles.cartReturn} to={{ pathname: '/', search: '' }}>
                <Arrow />
                Вернуться
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Cart