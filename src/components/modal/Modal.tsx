import { FormEvent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';
import { setToday, toFormatDate } from '../../utils/utils.tsx';
import { IModalProps, TPriority } from '../../utils/types.ts';
import { ModalOverlay } from './ModalOverlay.tsx';
import { Input } from './ui/Input.tsx';
import { Textarea } from './ui/Textarea.tsx';
import { Select } from './ui/Select.tsx';
import { nanoid } from 'nanoid';

const modalRoot = document.getElementById('modal');

export const Modal = ({ status, onClose, handleSetTask }: IModalProps): ReactElement => {
  const date = setToday();
  //Как хранить дату?
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectValue, setSelectValue] = useState<TPriority>('high');
  const [dateOfEnd, setDateOfEnd] = useState('');

  const onChangeInput = (value: string) => {
    setInputValue(value);
  };
  const onChangeTextArea = (value: string) => {
    setTextAreaValue(value);
  };
  const onChangeSelectValue = (value: TPriority) => {
    setSelectValue(value);
  };
  const onChangeDateOfEnd = (value: string) => {
    setDateOfEnd(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSetTask?.({
      status: status,
      title: inputValue,
      description: textAreaValue,
      priority: selectValue,
      dateOfStart: date,
      dateOfEnd: toFormatDate(dateOfEnd),
      id: nanoid()
    });
    // alert('задача создана');
    onClose();
  };
  return ReactDOM.createPortal((
      <>
        <form className="modal" noValidate onSubmit={onSubmit}>
          <div className="close-cross" onClick={onClose}></div>
          <div className="content">
            <h3>{status}</h3>
            <Input type="text" name="title of task" id="title" placeholder="Название задачи" value={inputValue}
                   onChange={onChangeInput} />
            <Textarea id="content" placeholder="Описание..." rows={5} value={textAreaValue}
                      onChange={onChangeTextArea} />
            <div className="content-details">
              <div className="content-details__group">
                <p>Выберите приоритет</p>
                <Select name="Приоритет" id="name" onChange={onChangeSelectValue} value={selectValue} />
              </div>
              <div className="content-details__group">
                <p>Дата создания</p>
                <span><p>{date}</p></span>
              </div>
              <div className="content-details__group">
                <p>Выполнить до</p>
                <Input type="date" name="date of end" id="dateOfEnd" value={dateOfEnd}
                       onChange={onChangeDateOfEnd} />
              </div>
            </div>
            <button type="button" onClick={onSubmit}>Сохранить изменения</button>
          </div>
        </form>
        <ModalOverlay onClick={onClose} />;
      </>
    ),
    modalRoot!
  )
    ;
};
