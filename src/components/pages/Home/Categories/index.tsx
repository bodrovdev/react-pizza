import '../../../../scss/style.scss';
import styles from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setCategoryValue } from '../../../../redux/slices/sortSlice';

function Categories() {

  const { categoryValue } = useSelector(selectSort);
  const dispatch = useDispatch();
  const pizzaCategories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const buttonClassName: (index: number) => string = (index) => {
    return categoryValue === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  const handleChangeCategory: (index: number) => void = (index) => {
    dispatch(setCategoryValue(index));
  }

  return (
    <section className={styles.root}>
      <div className="base-container">

        {pizzaCategories.map((item: string, index: number) => (
          <button className={buttonClassName(index)} onClick={() => { handleChangeCategory(index) }} key={index}>
            {item}
          </button>
        ))}

      </div>
    </section>
  )
}

export default Categories;