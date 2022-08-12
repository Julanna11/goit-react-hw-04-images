import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWin, Image } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root');

export default function Modal({ onClose, imageModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWin>
        <Image src={imageModal} alt="" />
      </ModalWin>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageModal: PropTypes.string.isRequired,
};
