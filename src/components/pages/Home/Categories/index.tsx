import '../../../../scss/style.scss';
import styles from './Categories.module.scss';

import { selectFilter, setCategoryValue } from '../../../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const pizzaCategories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {

  const { categoryValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleButtonClassName = (index: number): string => {
    return Number(categoryValue) === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  const handleChangeCategory = (index: number): void => {
    dispatch(setCategoryValue(String(index)));
  }

  return (
    <section className={styles.root}>
      <div className="base-container">

        {pizzaCategories.map((item: string, index: number) => (
          <button className={handleButtonClassName(index)} onClick={() => { handleChangeCategory(index) }} key={index}>
            {item}
          </button>
        ))}

      </div>
    </section>
  )
}

export default Categories;