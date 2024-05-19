import '../../../scss/style.scss';
import styles from './Preloader.module.scss';

function Preloader() {
  return (
    <div className={styles.root}>
      <div className={styles.preloaderCircle}></div>
    </div>
  )
}

export default Preloader