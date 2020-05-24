import React, { useRef, useEffect, ReactChild } from 'react';
import ReactDOM from 'react-dom';

import { Container, Content } from './styles';

interface Props {
  show: boolean;
  width?: number;
  onClose?: () => void;
  children: ReactChild | ReactChild[];
}

function Modal({
  show, onClose, children, width,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
  }, [show]);

  function handleClick({ target }: React.MouseEvent<HTMLDivElement>) {
    if (target === divRef.current && onClose) {
      onClose();
    }
  }

  const element = document.getElementById('modal-root');
  if (!element) { return null; }

  return ReactDOM.createPortal((
    <>
      {show && (
        <Container onClick={handleClick} ref={divRef}>
          <Content width={width}>
            {children}
          </Content>
        </Container>
      )}
    </>
  ), element);
}

export default Modal;
