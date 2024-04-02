import '../../../../scss/style.scss';
import styles from './PizzaBlock.module.scss';

const pizzaTypes = ['Тонкая', 'Традиционная'];

function PizzaBlock({ imageUrl, name, types, sizes, price }) {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <figure className={styles.image}>
          <img className={styles.img} src={imageUrl} alt="#" />
        </figure>
        <h2 className={styles.descTitle}>{name}</h2>
      </div>
      <div className={styles.desc}>
        <div className={styles.descOptions}>

          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__feature}`}>
            {types.map((item, index) => (
              <li className={styles.descOptionsItem} key={index}>{pizzaTypes[item]}</li>
            ))}
          </ul>

          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__price}`}>
            {sizes.map((item, index) => (
              <li className={styles.descOptionsItem} key={index}>{item} см.</li>
            ))}
          </ul>

        </div>
        <div className={styles.descInfo}>
          <span className={styles.descInfoPrice}>от {price} ₽</span>
          <button className={styles.descInfoButton}>Добавить</button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock