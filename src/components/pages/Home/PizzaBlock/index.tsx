import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from 'usehooks-ts';
import { addItem } from '../../../../redux/slices/cartSlice';
import { FetchedPizzaItem, ToCartPizzaItem } from '../../../common/Types/PizzaItem.type';

import '../../../../scss/style.scss';
import Counter from '../../../common/Counter';
import Preloader from '../../../common/Preloader';
import styles from './PizzaBlock.module.scss';

const pizzaTypes: string[] = ['Тонкая', 'Традиционная'];

type PizzaBlockProps = Omit<FetchedPizzaItem, 'rating'>

function PizzaBlock({ category, id, imageUrl, name, price, sizes, types }: PizzaBlockProps) {

  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));

  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(selectedTypes[0]);
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [isVisibleModal, setModalVisibility] = useState<boolean>(false);
  const [isVisiblePreload, setPreloadVisibility] = useState<boolean>(false);
  const dispatch = useDispatch();
  const itemHeadingRef = useRef<HTMLDivElement>(null);

  const pizzaObj: ToCartPizzaItem = {
    category,
    count: currentCount,
    id,
    imageUrl,
    keyword: `${name.split('').filter(item => !['-', ' '].includes(item)).join('')}${activeType}${activeSize}`,
    name,
    price,
    size: activeSize,
    type: activeType,
  };

  const handleActiveOptions = (state: string | number, item: string | number): string => {
    return state === item ? `${styles.descOptionsItem} ${styles.descOptionsItem__active}` : styles.descOptionsItem;
  };

  const handleIncreaseAddingNumber = (): void => {
    setCurrentCount(currentCount + 1);
  }

  const handleDecreaseAddingNumber = (): void => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    }
  }

  const handleAddToCart = (obj: ToCartPizzaItem): void => {
    dispatch(addItem(obj));
    setPreloadVisibility(true);
    setTimeout(() => { setPreloadVisibility(false) }, 1000);
  };

  return (
    <div className={styles.root}>
      <div className={styles.heading} onClick={() => { setModalVisibility(true) }} ref={itemHeadingRef}>
        <img className={styles.img} src={imageUrl} alt="#" />
        <h2 className={styles.title}>{name}</h2>
      </div>
      <div className={styles.desc}>
        <div className={styles.descOptions}>
          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__feature}`}>
            {types.map((item, index) => (
              <li className={handleActiveOptions(activeType, pizzaTypes[item])} onClick={() => { setActiveType(pizzaTypes[item]) }} key={index}>{pizzaTypes[item]}</li>
            ))}
          </ul>
          <ul className={`${styles.descOptionsList} ${styles.descOptionsList__price}`}>
            {sizes.map((item, index) => (
              <li className={handleActiveOptions(activeSize, item)} onClick={() => { setActiveSize(item) }} key={index}>{item} см.</li>
            ))}
          </ul>
        </div>
        <div className={styles.descInfo}>
          <div className={styles.descInfoWrapper}>
            <span className={styles.descInfoPrice}>{price * pizzaObj.count} ₽</span>
            <Counter
              minusClick={() => { handleDecreaseAddingNumber() }}
              count={pizzaObj.count}
              plusClick={() => { handleIncreaseAddingNumber() }}
            />
          </div>
          <button className={styles.descInfoButton} onClick={() => { handleAddToCart(pizzaObj) }} disabled={isVisiblePreload ? true : false}>

            {isVisiblePreload ? <Preloader /> : 'В корзину'}

          </button>
        </div>
      </div>
      <Modal isVisibleModal={isVisibleModal} closeModal={() => { setModalVisibility(false) }} pizzaObj={pizzaObj} />
    </div>
  )
}
export default PizzaBlock

type ModalProps = {
  closeModal: () => void;
  isVisibleModal: boolean;
  pizzaObj: ToCartPizzaItem;
}

function handleEscapeKey(e: KeyboardEvent, callback: () => void) {
  if (e.key === 'Escape') {
    callback();
    console.log('test');
  }
}

function Modal({ closeModal, isVisibleModal, pizzaObj }: ModalProps) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalInnerRef, () => {
    closeModal();
  })

  return createPortal(
    <CSSTransition
      classNames="modalTransition"
      in={isVisibleModal}
      nodeRef={modalWrapperRef}
      onEnter={() => {
        document.body.style.overflow = 'hidden';
        //@ts-ignore
        document.body.addEventListener('keydown', handleEscapeKey(e, closeModal));
      }}
      onExited={() => {
        document.body.style.overflow = 'visible';
        //@ts-ignore
        document.body.removeEventListener('keydown', handleEscapeKey(e, closeModal));
      }}
      timeout={300}
      unmountOnExit>
      <div ref={modalWrapperRef} className={styles.modalWrapper}>
        <div ref={modalInnerRef} className={styles.modalInner}>
          <img className={styles.modalImg} src={pizzaObj.imageUrl} alt="" />
        </div>
      </div>
    </CSSTransition>, document.body
  );
}