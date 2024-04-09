import styles from './Counter.module.scss';

function Counter({ onMinusClick, onPlusClick, count }) {
  return (
    <div className={styles.root}>
      <button className={`${styles.counterButton} ${styles.counterButton__minus}`} type="button" onClick={() => { onMinusClick() }}></button>
      <span className={styles.counterNumber}>{count}</span>
      <button className={`${styles.counterButton} ${styles.counterButton__plus}`} type="button" onClick={() => { onPlusClick() }}></button>
    </div>
  )
}

export default Counter