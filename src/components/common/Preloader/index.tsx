import styles from './Preloader.module.scss';
import '../../../scss/style.scss';

type PreloaderProps = {
  width: number,
  height: number,
}

function Preloader({ width, height }: PreloaderProps) {

  const preloaderSize = {
    width: width,
    height: height,
  };

  return (
    <div className={styles.root} style={preloaderSize}></div>
  )
}

export default Preloader;