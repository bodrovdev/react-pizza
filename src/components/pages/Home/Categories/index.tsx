import { useDispatch, useSelector } from 'react-redux';
import '../../../../scss/style.scss';
import styles from './Categories.module.scss';

import { selectFilter } from '../../../../redux/Filter/selectors';
import { setCategory } from '../../../../redux/Filter/slice';

export const pizzaCategories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const dispatch = useDispatch();

  const { category } = useSelector(selectFilter);

  const handleButtonClassName = (index: number): string => {
    return Number(category) === index ? `${styles.catButton} ${styles.catButton_active}` : styles.catButton;
  }

  const handleChangeCategory = (index: number): void => {
    dispatch(setCategory(String(index)));
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