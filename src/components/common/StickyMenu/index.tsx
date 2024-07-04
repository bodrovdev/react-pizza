import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../../../redux/slices/cartSlice';
import '../../../scss/style.scss';
import styles from './StickyMenu.module.scss';

import CartIcon from '../../Icons/CartIcon';
import HomeIcon from '../../Icons/HomeIcon';

function StickyMenu() {

  const { totalAmount } = useSelector(selectCart);

  return (
    <div className={styles.root}>
      <Link className={styles.stickyMenuLink} to={{ pathname: '/', search: '' }}>
        <div>
          <HomeIcon />
          <span className={styles.linkText}>Домой</span>
        </div>
      </Link>

      <Link className={styles.stickyMenuLink} to={{ pathname: '/cart', search: '' }}>
        <div>
          <CartIcon />
          <span className={styles.linkText}>Корзина</span>
          <span className={styles.linkNum}>{totalAmount}</span>
        </div>
      </Link>
    </div >
  )
}
export default StickyMenu;