import { FormEvent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';
import { setToday, validationDateOfEnd, validationTitle } from '../../utils/utils.tsx';
import { IModalProps, ITaskItem } from '../../utils/types.ts';
import { ModalOverlay } from './ModalOverlay.tsx';
import { Input } from './ui/Input.tsx';
import { Textarea } from './ui/Textarea.tsx';
import { Select } from './ui/Select.tsx';
import { nanoid } from 'nanoid';

const modalRoot = document.getElementById('modal');

const validationValues: Partial<Record<keyof ITaskItem, (value: string, allValues: Partial<ITaskItem>) => string | null>> = {
  title: validationTitle,
  dateOfEnd: validationDateOfEnd
};

export const Modal = ({ status, onClose, handleSetTask }: IModalProps): ReactElement => {
  const date = setToday();
  //Как хранить дату?
  const initialValue: ITaskItem = {
    status: status,
    title: '',
    description: '',
    priority: 'high',
    dateOfStart: date,
    dateOfEnd: '',
    id: nanoid()
  };

  const [form, setForm] = useState<ITaskItem>(initialValue);
  const [error, setError] = useState<Partial<ITaskItem> | null>(null);

//на каждое изменение инпутов запускается валидация и запись в состояние form
  const handleOnChange = (formKey: keyof ITaskItem) => {
    return function(value: string) {
      //переменная нужна, чтобы отправить в ф-цию валидации все значения
      let allValues: Partial<ITaskItem> = {};
      setForm((previousValue) => {
        const newFormData = { ...previousValue, [formKey]: value };
        allValues = { ...newFormData };
        return newFormData;
      });

      const validateFn = validationValues[formKey];
      setError(prevErrors => ({
        ...prevErrors,
        [formKey]: validateFn?.(value, allValues)
      }));
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSetTask?.(form);
    // alert('задача создана');
    onClose();
  };
  return ReactDOM.createPortal((
      <>
        <form className="modal" noValidate onSubmit={onSubmit}>
          <div className="close-cross" onClick={onClose}></div>
          <div className="content">
            <h3>{status}</h3>
            <Input type="text" name="title of task" id="title" placeholder="Название задачи" error={error?.title}
                   onChange={handleOnChange('title')} />
            <Textarea id="content" placeholder="Описание..." rows={5}
                      onChange={handleOnChange('description')} />
            <div className="content-details">
              <div className="content-details__group">
                <p>Выберите приоритет</p>
                <Select name="Приоритет" id="name" onChange={handleOnChange('priority')} />
              </div>
              <div className="content-details__group">
                <p>Дата создания</p>
                <span className="content-details__group-date"><p>{date}</p></span>
              </div>
              <div className="content-details__group">
                <p>Выполнить до</p>
                <Input type="date" name="date of end" id="dateOfEnd"
                       onChange={handleOnChange('dateOfEnd')} error={error?.dateOfEnd} />
              </div>
            </div>
            <button type="submit">Сохранить изменения</button>
          </div>
        </form>
        <ModalOverlay onClick={onClose} />;
      </>
    ),
    modalRoot!
  )
    ;
};
