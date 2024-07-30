import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from 'usehooks-ts';
import '../../../../scss/style.scss';
import styles from './Modal.module.scss';

import { ToCartPizzaItem } from "../../../common/Types/PizzaItem.type";

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

export default Modal