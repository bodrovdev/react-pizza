import styles from './Counter.module.scss';

type CounterPropsType = {
  count: number,
  minusClick: () => void,
  plusClick: () => void,
}

function Counter({ minusClick, count, plusClick }: CounterPropsType) {
  return (
    <div className={styles.root}>
      <button className={styles.counterButton} type="button" onClick={minusClick} disabled={count === 1 ? true : false}></button>
      <span className={styles.counterNumber}>{count}</span>
      <button className={`${styles.counterButton} ${styles.counterButton_plus}`} type="button" onClick={plusClick} disabled={count === 99 ? true : false}></button>
    </div>
  )
}

export default Counter;