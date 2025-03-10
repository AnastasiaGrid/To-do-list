import { FormEvent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.module.scss';
import { getInitialValue, validationOnSubmit, validationValues } from '../../utils/utils.ts';
import { IModalProps, ITaskItem, TErrors } from '../../utils/types.ts';
import { ModalOverlay } from './ModalOverlay.tsx';
import { Input } from '../ui/Input.tsx';
import { Textarea } from '../ui/Textarea.tsx';
import { Select } from '../ui/Select.tsx';
import { optionsPriority, optionsStatus } from '../../utils/constants.ts';

const modalRoot = document.getElementById('modal');

export const Modal = ({ status, onClose, handleSetTask, taskEdit }: IModalProps): ReactElement => {

  const [errors, setErrors] = useState<TErrors | null>(null);
  const [form, setForm] = useState<ITaskItem>(taskEdit || getInitialValue(status));

  //на каждое изменение инпутов запускается валидация и запись в состояние form
  const handleOnChange = (formKey: keyof ITaskItem) => {
    return function(value: string) {
      if (formKey === 'dateOfEnd') {
        const date = new Date(value);
        date.getFullYear().toString().match(/20\d\d/);
      }
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
    handleSetTask?.(form, !!taskEdit);
    onClose();
  };

  const isValid = errors && Object.values(errors).some((item) => item !== null && item !== undefined);

  return ReactDOM.createPortal((
      <>
        <form className="modal" noValidate onSubmit={onSubmit}>
          <div className="close-cross" onClick={onClose}></div>
          <div className="content">
            <Select name="status" id="status" options={optionsStatus} value={form.status}
                    onChange={handleOnChange('status')} className={'status__title'} />
            <Input type="text" name="title of task" id="title" placeholder="Название задачи" error={errors?.title}
                   value={form.title}
                   onChange={handleOnChange('title')} autoFocus={true} />
            <Textarea id="content" placeholder="Описание..." rows={3} value={form.description}
                      showCounter onChange={handleOnChange('description')} maxLength={100} />
            <div className="content-details">
              <div className="content-details__group">
                <p>Выберите приоритет</p>
                <Select name="priority" id="priority" onChange={handleOnChange('priority')} options={optionsPriority}
                        value={form.priority} text={'priority'} />
              </div>
              <div className="content-details__group">
                <p>Дата создания</p>
                <span className="content-details__group-date"><p>{form.dateOfStart}</p></span>
              </div>
              <div className="content-details__group">
                <p>Выполнить до</p>
                <Input type="date" name="date of end" id="dateOfEnd"
                       onChange={handleOnChange('dateOfEnd')} error={errors?.dateOfEnd} value={form.dateOfEnd} />
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
