import '../../../../scss/style.scss';
import styles from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryValue } from '../../../../redux/slices/sortSlice';

function Categories() {
  const categoryValue = useSelector((state) => state.sort.categoryValue);
  const dispatch = useDispatch();

  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const buttonClassName = (index) => {
    return categoryValue === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  const categoryChangeHandler = (index) => {
    dispatch(setCategoryValue(index));
  }

  return (
    <section className={styles.root}>
      <div className={`${styles.container} base-container`}>

        {pizzaCategories.map((item, index) => (
          <button className={buttonClassName(index)} onClick={() => { categoryChangeHandler(index) }} key={index}>
            {item}
          </button>
        ))}

      </div>
    </section>
  )
}

export default Categories;