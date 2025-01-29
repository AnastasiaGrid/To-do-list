import { FormEvent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';
import { setToday, validationOnSubmit, validationValues } from '../../utils/utils.tsx';
import { IModalProps, ITaskItem, TErrors } from '../../utils/types.ts';
import { ModalOverlay } from './ModalOverlay.tsx';
import { Input } from './ui/Input.tsx';
import { Textarea } from './ui/Textarea.tsx';
import { Select } from './ui/Select.tsx';
import { nanoid } from 'nanoid';

const modalRoot = document.getElementById('modal');

export const Modal = ({ status, onClose, handleSetTask }: IModalProps): ReactElement => {
  const date = setToday();
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
  const [errors, setErrors] = useState<TErrors | null>(null);

  //на каждое изменение инпутов запускается валидация и запись в состояние form
  const handleOnChange = (formKey: keyof ITaskItem) => {
    return function(value: string) {
      setForm((previousValue) => {
        return { ...previousValue, [formKey]: value };
      });

      const validateFn = validationValues[formKey];
      setErrors(prevErrors => ({
        ...prevErrors,
        [formKey]: validateFn?.(value, form)
      }));
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // из-за батчинга все соcтояния отрабатывают за раз и errors не акутальный для этого и переменная submitError (ее расчет отдельно в utils)
    const submitErrors: TErrors = validationOnSubmit(form);
    if (Object.values(submitErrors).some((item) => item !== null)) {
      setErrors(submitErrors);
      return;
    }

    handleSetTask?.(form);
    onClose();
  };

  const isValid = errors && Object.values(errors).some((item) => item !== null && item !== undefined);

  return ReactDOM.createPortal((
      <>
        <form className="modal" noValidate onSubmit={onSubmit}>
          <div className="close-cross" onClick={onClose}></div>
          <div className="content">
            <h3>{status}</h3>
            <Input type="text" name="title of task" id="title" placeholder="Название задачи" error={errors?.title}
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
                       onChange={handleOnChange('dateOfEnd')} error={errors?.dateOfEnd} />
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
