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

const validationValues: Partial<Record<keyof ITaskItem, (value: string, allValues: ITaskItem) => string | null | undefined>> = {
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
  const [error, setError] = useState<Partial<Record<keyof ITaskItem, string | null | undefined> | null>>(null);

  //на каждое изменение инпутов запускается валидация и запись в состояние form
  const handleOnChange = (formKey: keyof ITaskItem) => {
    return function(value: string) {
      //переменная нужна, чтобы отправить в ф-цию валидации все значения
      // let allValues: ITaskItem = {};
      setForm((previousValue) => {
        // const newFormData = { ...previousValue, [formKey]: value };
        // allValues = { ...newFormData };
        return { ...previousValue, [formKey]: value };
      });

      const validateFn = validationValues[formKey];
      setError(prevErrors => ({
        ...prevErrors,
        [formKey]: validateFn?.(value, form)
      }));

    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitErrors: typeof error = {};

    //TODO вынести в функцию в утилс
    (Object.keys(validationValues) as Array<keyof ITaskItem>).forEach((key: keyof ITaskItem) => {
      const validateFn = validationValues[key];
      submitErrors[key] = validateFn?.(form[key], form);
    });
    // из-за батчинга все сотояния отрабатывают за раз и error не акутальный для этого и переменная submitError
    if (Object.values(submitErrors).some((item) => item !== null)) {
      setError(submitErrors);
      return;
    }

    handleSetTask?.(form);
    onClose();
    // alert('задача создана');
  };

  const isValid = error && Object.values(error).some((item) => item !== null);

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
            <button type="submit" disabled={!!isValid}>Сохранить изменения</button>
          </div>
        </form>
        <ModalOverlay onClick={onClose} />;
      </>
    ),
    modalRoot!
  )
    ;
};
