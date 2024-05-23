import styles from './Counter.module.scss';

type CounterPropsType = {
  minusClick: () => void,
  count: number,
  plusClick: () => void,
}

function Counter({ minusClick, count, plusClick }: CounterPropsType) {
  return (
    <div className={styles.root}>
      <button className={`${styles.counterButton} ${styles.counterButton__minus}`} type="button" onClick={minusClick}></button>
      <span className={styles.counterNumber}>{count}</span>
      <button className={`${styles.counterButton} ${styles.counterButton__plus}`} type="button" onClick={plusClick}></button>
    </div>
  )
}

export default Counter;