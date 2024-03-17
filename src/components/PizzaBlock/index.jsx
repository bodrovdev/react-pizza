import '../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Plus from '../Icons/Plus';

const pizzaTypes = ['Тонкая', 'Традиционная'];

function PizzaBlock({ imageUrl, name, types, sizes, price }) {
  return (
    <div className={styles.root}>
      <figure className={styles.image}>
        <img className={styles.img} src={imageUrl} alt="#" />
      </figure>
      <div className={styles.desc}>
        <h2 className={styles.descTitle}>{name}</h2>
        <div className={styles.descOptions}>
          <ul className={styles.descOptionsList}>
            {types.map((item, index) => (
              <li className={styles.descOptionsItem} key={index}>{pizzaTypes[item]}</li>
            ))}
          </ul>
          <ul className={styles.descOptionsList}>
            {sizes.map((item, index) => (
              <li className={styles.descOptionsItem} key={index}>{item} см.</li>
            ))}
          </ul>
        </div>
        <div className={styles.descInfo}>
          <span className={styles.descInfoPrice}>от {price} ₽</span>
          <button className={styles.descInfoButton}>
            <Plus />
            Добавить
            <span className={styles.descInfoButtonNum}>0</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock