import { ModalOverlay } from '../../modal/ModalOverlay.tsx';
import { FC } from 'react';
import { IModalUIProps } from '../../../utils/types.ts';

export const ModalUI: FC<IModalUIProps> = ({ onClose, section, date }: IModalUIProps) => {
  return (
    <>
      <div className="modal">
        <div className="close-cross" onClick={onClose}></div>
        <div className="content">
          <h3>{section}</h3>
          <input type="text" placeholder="Название задачи" />
          <textarea id="content" placeholder="Описание..." rows={5}></textarea>
          <div className="content-details">
            <div className="content-details__group">
              <p>Выберите приоритет</p>
              <select name="Приоритет" id="">
                <option>High priority</option>
                <option>Medium priority</option>
                <option>Low priority</option>
              </select>
            </div>
            <div className="content-details__group">
              <p>Дата создания</p>
              <span><p>{date}</p></span>
            </div>
            <div className="content-details__group">
              <p>Выполнить до</p>
              <input type="date" />
            </div>
          </div>
          <button type="button">Сохранить изменения</button>
        </div>
      </div>
      <ModalOverlay onClick={onClose} /></>
  );
};