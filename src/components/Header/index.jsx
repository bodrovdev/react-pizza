import { Link } from 'react-router-dom';
import '../../scss/style.scss';
import styles from './Header.module.scss';

import Logo from '../Icons/Logo';
import Cart from '../Icons/Cart';

import Search from '../Search/';

function Header() {
  return (
    <header className={`${styles.root} page-header`}>
      <div className={`${styles.container} base-container`}>
        <Link className={styles.logoBlock} to="/">

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
            <Cart />
            <span className={styles.cartPizzas}>10000</span>
          </div>
        </a>
      </div>
    </header>
  )
}

export default Header