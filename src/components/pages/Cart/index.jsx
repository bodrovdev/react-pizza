import { Link } from 'react-router-dom';
import '../../../scss/style.scss';
import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../../redux/slices/cartSlice';

import Arrow from '../../Icons/Arrow';
import CartPizzaBlock from './CartPizzaBlock';

function Cart() {
  const dispatch = useDispatch();

  const { items, totalPrice, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className={styles.root}>
      <div className="base-container">

        {items.length === 0 ?

          <div className={styles.cartEmpty}>
            <h2 className="section-title">Ничего не найдено! 😵</h2>
            <img className={styles.cartEmptyImg} src='./empty.png' />
          </div>

          :

          <>
            <div className={styles.cartHeading}>
              <h1 className="section-title">Корзина</h1>
              <button className={styles.cartClear} type="button" onClick={() => { dispatch(clearItems()) }}>Очистить корзину</button>
            </div>

            <section className={styles.cartBody}>
              <div className={styles.cartPizzas}>
                {items.map((item, index) => (<CartPizzaBlock name={item.name} type={item.type} size={item.size} price={item.price} count={item.count} keyword={item.keyword} key={index} />))}
              </div>

              <div className={styles.cartPayment}>
                <div>
                  <span>Сумма заказа: <span className={styles.cartPrice}>{totalPrice} ₽</span></span>
                  <span>Всего пицц: <span className={styles.cartTotal}>{totalAmount} шт</span></span>
                </div>
                <div>
                  <Link className={styles.cartReturn} to={{ pathname: '/', search: '' }}>
                    <Arrow />
                    Вернуться
                  </Link>
                  <button className={styles.cartPaySubmit} type="button">Оплатить</button>
                </div>
              </div>
            </section>
          </>
        }

      </div>
    </div>
  )
}

export default Cart