import { Link } from 'react-router-dom';
import { selectCart } from '../../../redux/slices/cartSlice';
import '../../../scss/style.scss';
import styles from './Header.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { resetSorting } from '../../../redux/slices/filterSlice';

import CartIcon from '../../Icons/CartIcon';
import Logo from '../../Icons/Logo';
import Search from '../Search';

function Header() {
  const dispatch = useDispatch();

  const { totalPrice, totalAmount } = useSelector(selectCart);

  return (
    <header className={`${styles.root} page-header`}>
      <div className={`${styles.container} base-container`}>
        <Link className={styles.logoBlock} to={{ pathname: '/', search: '' }} onClick={() => dispatch(resetSorting())}>
          <Logo />
          <div>
            <h1 className={styles.logoTitle}>REACT-PIZZA</h1>
            <span className={styles.logoSubtitle}>самая реактивная пицца во вселенной <span className={styles.logoSoon}>now with TS!</span> </span>
          </div>
        </Link>

        <Search />

        <Link className={styles.cartBlock} to={{ pathname: '/cart', search: '' }}>
          <div className={styles.cartAmount}>
            <CartIcon />
            <span className={styles.cartValue}>{totalAmount}</span>
          </div>
          <div className={styles.cartPrice}>
            <span className={styles.cartValue}>{totalPrice}</span>
            <span>₽</span>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header