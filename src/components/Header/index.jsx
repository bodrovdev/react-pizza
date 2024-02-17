import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/style.scss';
import styles from './Header.module.scss';

import Logo from '../Icons/Logo';
import Search from '../Search/';
import Cart from '../Icons/Cart';

function Header() {
  return (
    <header className={`${styles.root} page-header`}>
      <div className={`${styles.root__container} base-container`}>
        <Link className={styles.root__logoBlock} to="/">
          <Logo />
          <div>
            <h1 className={styles.root__logoTitle}>CURSED PIZZA</h1>
            <span className={styles.root__logoSubtitle}>самая проклятая пицца во вселенной</span>
          </div>
        </Link>

        <Search />

        <a className={styles.root__cartBlock} href="#">
          <span className={styles.root__cartPrice}>520 ₽</span>
          <div>
            <Cart />
            <span className={styles.root__cartPizzas}>3</span>
          </div>
        </a>
      </div>
    </header>
  )
}

export default Header