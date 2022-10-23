import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rootApp = document.getElementById('root') as HTMLDivElement;

interface ModalProps {
  children: JSX.Element;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const modalRoot = document.createElement('div');

  useEffect(() => {
    rootApp.append(modalRoot);

    return () => {
      rootApp.removeChild(modalRoot);
    };
  });

  return ReactDOM.createPortal(children, modalRoot);
};

export default Modal;
