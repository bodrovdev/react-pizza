import '../../scss/style.scss';
import styles from './Categories.module.scss';

// * 6) REDUX. Импортируем useSelector, useDispatch
import { useDispatch, useSelector } from 'react-redux';
// * 7) REDUX. Импортируем методы из слайсов
import { setCategoryValue } from '../../redux/slices/sortSlice';

function Categories() {

  // * 8) REDUX. Достаём значение из слайса
  const categoryValue = useSelector((state) => state.sort.categoryValue);
  // * 9) REDUX. Получаем доступ к dispatch
  const dispatch = useDispatch();

  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const buttonClassName = (index) => {
    return categoryValue === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  return (
    <section className={styles.root}>
      <div className={`${styles.container} base-container`}>

        {pizzaCategories.map((item, index) => (
          <button className={buttonClassName(index)} onClick={() => { dispatch(setCategoryValue(index)) }} key={index}>
            {item}
          </button>
        ))}

      </div>
    </section>
  )
}

export default Categories;