import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import '../ui/modalUI/modal.scss';
import { setToday } from '../../utils/utils.ts';
import { ModalUI } from '../ui/modalUI/ModalUI.tsx';
import { IModalProps } from '../../utils/types.ts';

const modalRoot = document.getElementById('modal');

export const Modal = ({ section, onClose }: IModalProps): ReactElement => {
  const date = setToday();
  //Как хранить дату?

  return ReactDOM.createPortal((
      <ModalUI onClose={onClose} section={section} date={date}></ModalUI>
    ), modalRoot!
  );
};
