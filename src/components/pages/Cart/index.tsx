import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearItems, selectCart } from '../../../redux/slices/cartSlice';
import '../../../scss/style.scss';
import styles from './Cart.module.scss';

import Arrow from '../../Icons/Arrow';
import CartPizzaBlock from './CartPizzaBlock';

function Cart() {
  const dispatch = useDispatch();
  const { itemsInCart, totalPrice, totalAmount } = useSelector(selectCart);

  type CartItem = {
    name: string,
    type: string,
    size: number,
    price: number,
    count: number,
    keyword: string,
  }

  if (Boolean(!itemsInCart.length)) {
    return (
      <div className={`${styles.cartContainer} base-container`}>
        <div className={styles.cartEmpty}>
          <h2 className="section-title">Ничего не найдено! 😵</h2>
          <img className={styles.cartEmptyImg} src='./empty.png' />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={`${styles.cartContainer} base-container`}>
        <div className={styles.cartHeading}>
          <h1 className="section-title">Корзина</h1>
          <button className={styles.cartClear} type="button" onClick={() => { dispatch(clearItems()) }}>Очистить корзину</button>
        </div>
        <section className={styles.cartBody}>
          <div className={styles.cartPizzas}>
            {itemsInCart.map((item: CartItem, index: number) => (
              <CartPizzaBlock name={item.name} type={item.type} size={item.size} price={item.price} count={item.count} keyword={item.keyword} key={index} />
            ))}
          </div>
          <div className={styles.cartPayment}>
            <div>
              <span>Сумма заказа: <span className={styles.cartPrice}>{totalPrice} ₽</span></span>
              <span>Всего пицц: <span className={styles.cartTotal}>{totalAmount} шт</span></span>
            </div>
            <div>
              <Link className={styles.cartReturn} to={{ pathname: '/', search: '' }}>
                <Arrow arrowClassName={styles.sortArrow} />
                Вернуться
              </Link>
              <button className={styles.cartPaySubmit} type="button">Оплатить</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Cart