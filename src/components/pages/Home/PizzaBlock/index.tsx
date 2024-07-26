import { useCallback, useRef, useState } from 'react';
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

type PizzaBlockProps = FetchedPizzaItem;

function PizzaBlock({ category, id, imageUrl, name, price, sizes, types, rating }: PizzaBlockProps) {
  const dispatch = useDispatch();
  const itemHeadingRef = useRef<HTMLDivElement>(null);
  const selectedTypes = pizzaTypes.filter((_, index) => types.includes(index));
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(selectedTypes[0]);
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [isVisibleModal, setModalVisibility] = useState<boolean>(false);
  const [isVisiblePreload, setPreloadVisibility] = useState<boolean>(false);

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
    setTimeout(() => { setPreloadVisibility(false); setModalVisibility(false); }, 2000);
  };

  const descOptions = <div className={styles.descOptions}>
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
  </div>;

  const addToCartButton = <button className={styles.descInfoButton} type="button" onClick={() => { handleAddToCart(pizzaObj) }} disabled={isVisiblePreload ? true : false}>
    {isVisiblePreload ? <Preloader /> : 'В корзину'}
  </button>

  return (
    <div className={styles.root}>
      <div className={styles.heading} onClick={() => { setModalVisibility(true) }} ref={itemHeadingRef}>
        <img className={styles.img} src={imageUrl} alt="#" />
        <h2 className={styles.title}>{name}</h2>
      </div>
      <div className={styles.desc}>

        {descOptions}

        <div className={styles.descInfo}>
          <div className={styles.descInfoWrapper}>
            <span className={styles.descInfoPrice}>{price * pizzaObj.count} ₽</span>
            <Counter
              minusClick={() => { handleDecreaseAddingNumber() }}
              count={pizzaObj.count}
              plusClick={() => { handleIncreaseAddingNumber() }}
            />
          </div>

          {addToCartButton}

        </div>
      </div>
      <Modal
        addToCartButton={addToCartButton}
        closeModal={() => { setModalVisibility(false) }}
        descOptions={descOptions}
        isVisibleModal={isVisibleModal}
        pizzaObj={pizzaObj}
        rating={rating}
      />
    </div>
  )
}
export default PizzaBlock

type ModalProps = {
  addToCartButton: JSX.Element;
  closeModal: () => void;
  descOptions: JSX.Element;
  isVisibleModal: boolean;
  pizzaObj: ToCartPizzaItem;
  rating: number;
}

function Modal({ addToCartButton, closeModal, descOptions, isVisibleModal, pizzaObj, rating }: ModalProps) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);

  const handleEscapeKeydown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal();
      console.log('test');
    }
  }, [])

  const handleTransitionEnter = (): void => {
    document.body.style.cssText = `overflow: hidden;`;
    document.body.addEventListener('keydown', handleEscapeKeydown);
  }

  const handleTransitionExit = (): void => {
    document.body.style.cssText = `overflow: visible;`;
    document.body.removeEventListener('keydown', handleEscapeKeydown);
  }

  useOnClickOutside(modalInnerRef, () => {
    closeModal();
  })

  const ratingArray: any[] = Array.apply(null, Array(rating));

  return createPortal(
    <CSSTransition
      classNames="modalTransition"
      in={isVisibleModal}
      nodeRef={modalWrapperRef}
      onEnter={() => { handleTransitionEnter() }}
      onExited={() => { handleTransitionExit() }}
      timeout={300}
      unmountOnExit>
      <div ref={modalWrapperRef} className={styles.modalWrapper}>
        <div ref={modalInnerRef} className={styles.modalInner}>
          <div className={styles.modalCloseContainer}>
            <button className={styles.modalClose} type="button" onClick={closeModal}></button>
          </div>
          <div className={`${styles.modalColumn} ${styles.modalColumn__left}`}>
            <img className={styles.modalImg} src={pizzaObj.imageUrl} alt="" />
            <div className={styles.modalRating}>
              Рейтинг:
              {ratingArray.map((_, index) => (
                <span key={index}>⭐</span>
              ))}
            </div>
          </div>
          <div className={`${styles.modalColumn} ${styles.modalColumn__right}`}>
            <h3 className='section-title'>{pizzaObj.name}</h3>
            <p className={styles.modalDescription}>
              Пицца — это популярное блюдо, представляющее собой круглый корж из теста
              с разнообразными начинками. Начинка может включать томаты, сыр, мясные продукты,
              овощи, грибы и другие ингредиенты. После выпечки в духовке пицца становится
              ароматной и хрустящей, а расплавленный сыр создаёт неповторимую текстуру.
            </p>

            {descOptions}

            {addToCartButton}

          </div>
        </div>
      </div>
    </CSSTransition>, document.body
  );
}