import { Link } from 'react-router-dom';
import '../../../scss/style.scss';
import styles from './Header.module.scss';

import { useDispatch } from 'react-redux';
import { resetSorting } from '../../../redux/slices/sortSlice';

import CartIcon from '../../icons/CartIcon';
import Logo from '../../icons/Logo';
import Search from '../Search';

function Header() {
  const dispatch = useDispatch();

  return (
    <header className={`${styles.root} page-header`}>
      <div className={`${styles.container} base-container`}>

        <Link className={styles.logoBlock} to={{ pathname: '/', search: '' }} onClick={() => { dispatch(resetSorting()) }}>
          <Logo />
          <div>
            <h1 className={styles.logoTitle}>CYBERPIZZA</h1>
            <span className={styles.logoSubtitle}>самая кибернетическая пицца во вселенной</span>
          </div>
        </Link>

        <Search />

        <Link className={styles.cartBlock} to={{ pathname: '/cart', search: '' }}>
          <span className={styles.cartPrice}>10000 ₽</span>
          <div>
            <CartIcon />
            <span className={styles.cartPizzas}>10000</span>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header