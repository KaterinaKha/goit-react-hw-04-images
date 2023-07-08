import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ imgURL, onCloseModal }) => {
  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyClick = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyClick);
    return () => {
      window.removeEventListener('keydown', handleKeyClick);
    };
  }, [onCloseModal]);

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal} onCloseModal={onCloseModal}>
        <img src={imgURL} alt="" />
      </div>
    </div>
  );
};
