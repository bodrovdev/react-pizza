import '../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

import Plus from '../Icons/Plus';

const pizzaTypes = ['Тонкая', 'Традиционная'];

function PizzaBlock({ imageUrl, name, types, sizes, price }) {
  return (
    <div className={styles.root}>
      <figure className={styles.root__image}>
        <img className={styles.root__img} src={imageUrl} alt="#" />
      </figure>
      <div className={styles.root__desc}>
        <h2 className={styles.root__descTitle}>{name}</h2>
        <div className={styles.root__descOptions}>
          <ul className={styles.root__descOptionsList}>
            {types.map((item, index) => (
              <li className={styles.root__descOptionsItem} key={index}>{pizzaTypes[item]}</li>
            ))}
          </ul>
          <ul className={styles.root__descOptionsList}>
            {sizes.map((item, index) => (
              <li className={styles.root__descOptionsItem} key={index}>{item} см.</li>
            ))}
          </ul>
        </div>
        <div className={styles.root__descInfo}>
          <span className={styles.root__descInfoPrice}>от {price} ₽</span>
          <button className={styles.root__descInfoButton}>
            <Plus />
            Добавить
            <span className={styles.root__descInfoButtonNum}>0</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock