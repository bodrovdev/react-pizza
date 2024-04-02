import React from 'react'

function CartPizzaBlock() {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <figure className={styles.cartPizzasImage}>
          <img className={styles.cartPizzasImg} src="" />
        </figure>
        <div>
          <h2 className={styles.cartPizzasTitle}></h2>
          <span></span>
        </div>
      </div>
      <div className={styles.cartPizzaItem__controls}></div>
      <div className={styles.cartPizzaItem__result}></div>
    </div>
  )
}

export default CartPizzaBlock