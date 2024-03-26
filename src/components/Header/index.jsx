import { Link } from 'react-router-dom';
import '../../scss/style.scss';
import styles from './Header.module.scss';

import { useDispatch } from 'react-redux';
import { resetSorting } from '../../redux/slices/sortSlice';

import Logo from '../Icons/Logo';
import CartIcon from '../Icons/CartIcon';
import Search from '../Search/';

function Header() {
  const dispatch = useDispatch();

  return (
    <header className={`${styles.root} page-header`}>
      <div className={`${styles.container} base-container`}>
        <Link className={styles.logoBlock} to="/" onClick={() => { dispatch(resetSorting()) }}>

          <Logo />

          <div>
            <h1 className={styles.logoTitle}>CURSED PIZZA</h1>
            <span className={styles.logoSubtitle}>самая проклятая пицца во вселенной</span>
          </div>
        </Link>

        <Search />

        <a className={styles.cartBlock} href="#">
          <span className={styles.cartPrice}>10000 ₽</span>
          <div>
            <CartIcon />
            <span className={styles.cartPizzas}>10000</span>
          </div>
        </a>
      </div>
    </header>
  )
}

export default Header