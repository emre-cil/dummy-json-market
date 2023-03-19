import React from 'react';
import classes from './Modal.module.scss';

import { useSelector } from 'react-redux';
import { selectMode } from '@/features/user/userSlice';
type ModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  btn_title_1?: any;
  btn_title_2?: any;
  btn_opt1?: () => void;
  btn_opt2?: () => void;
};
const Modal: React.FC<ModalProps> = ({ setIsOpen, title, btn_title_1, btn_title_2, btn_opt1, btn_opt2 }) => {
  const mode = useSelector(selectMode);

  return (
    <div className={classes.container} onClick={() => setIsOpen(false)}>
      <div
        className={`${classes.modal} 
    ${mode === 'dark' ? classes.dark : ''}
        `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>{title}</h3>

        <div className={classes.buttons}>
          {btn_title_1 && <button onClick={btn_opt1}>{btn_title_1}</button>}
          {btn_title_2 && (
            <button onClick={btn_opt2} style={{ backgroundColor: '#30c412', color: 'white' }}>
              {btn_title_2}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
