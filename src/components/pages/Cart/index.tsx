import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../scss/style.scss';
import styles from './Cart.module.scss';

import Arrow from '../../Icons/Arrow';
import CartPizzaBlock from './CartPizzaBlock';

import { selectCart } from '../../../redux/Cart/selectors';
import { clearItems } from '../../../redux/Cart/slice';
import { ToCartPizzaItem } from '../../common/Types/PizzaItem.type';

function Cart() {
  const dispatch = useDispatch();
  const { itemsInCart, totalPrice, totalAmount } = useSelector(selectCart);

  return (
    <div className={styles.root}>
      <div className={`${styles.cartContainer} base-container`}>
        <div className={styles.cartHeading}>
          <h1 className="section-title">Корзина</h1>
          {Boolean(itemsInCart.length) && <button className={styles.cartClear} type="button" onClick={() => { dispatch(clearItems()) }}>Очистить</button>}
        </div>

        {Boolean(!itemsInCart.length) ?

          <div className={styles.cartEmpty}>
            <h2 className="section-title">Пусто 😵</h2>
            <img className={styles.cartEmptyImg} src='./empty.png' />
          </div>

          :

          <section className={styles.cartBody}>
            <div className={styles.cartPizzas}>
              {itemsInCart.map((item: ToCartPizzaItem, index: number) => (
                <CartPizzaBlock
                  count={item.count}
                  imageUrl={item.imageUrl}
                  key={index}
                  keyword={item.keyword}
                  name={item.name}
                  price={item.price}
                  size={item.size}
                  type={item.type}
                />
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
        }

      </div>
    </div>
  )
}

export default Cart