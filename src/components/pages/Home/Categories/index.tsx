import '../../../../scss/style.scss';
import styles from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryValue } from '../../../../redux/slices/filterSlice';

export const pizzaCategories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {

  const { categoryValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const buttonClassName = (index: number): string => {
    return categoryValue === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  const handleChangeCategory = (index: number): void => {
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