import React from 'react';
import classes from './Modal.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectMode } from '@/features/user/userSlice';
type ModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  handleOperation: () => void;
};
const Modal: React.FC<ModalProps> = ({ setIsOpen, title, handleOperation }) => {
  const { t } = useTranslation();
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
          <button onClick={() => setIsOpen(false)}>{t('cancel')}</button>
          <button
            onClick={() => {
              handleOperation();
              setIsOpen(false);
            }}
            style={{ backgroundColor: '#30c412', color: 'white' }}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
