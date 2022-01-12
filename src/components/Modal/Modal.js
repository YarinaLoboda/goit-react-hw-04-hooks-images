import { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
   {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1200;
  }
`;

const ModalDiv = styled.div`
   {
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
  }
`;

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [props]);

  const handleClick = e => {
    props.onClose();
  };

  const { src, alt } = props.onShow;

  return createPortal(
    <ModalOverlay onClick={handleClick}>
      <ModalDiv>
        <img src={src} alt={alt} />
      </ModalDiv>
    </ModalOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  onShow: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
  }),

  onClose: PropTypes.func.isRequired,
};
