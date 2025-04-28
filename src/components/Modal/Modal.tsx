import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { setToday, validationOnSubmit, validationValues } from '../../utils/utils.ts';
import { ITaskItem, TStatus } from '../../utils/types.ts';
import { Input } from '../ui/Input/Input.tsx';
import { Textarea } from '../ui/Textarea/Textarea.tsx';
import { Select } from '../ui/Select/Select.tsx';
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '../../utils/constants.ts';
import { ModalOverlay } from './ModalOverlay.tsx';
import { IModalProps, TErrors } from './types.ts';
import { nanoid } from 'nanoid';

const modalRoot = document.getElementById('modal');
export const getInitialValue = (status: TStatus): ITaskItem => {
  const date = setToday();
  return {
    status: status,
    title: '',
    description: '',
    priority: 'high',
    dateOfStart: date,
    dateOfEnd: '',
    id: nanoid()
  };
};

export const Modal = ({ status, onClose, handleSetTask, taskEdit }: IModalProps): ReactElement => {

  const [errors, setErrors] = useState<TErrors | null>(null);
  const [form, setForm] = useState<ITaskItem>(taskEdit || getInitialValue(status));

  //на каждое изменение инпутов запускается валидация и запись в состояние form
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value: string = event.target.value;
    const name = event.target.name as keyof ITaskItem;
    setForm((previousValue) => {
      return { ...previousValue, [name]: value };
    });

    const validateFn = validationValues[name];
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateFn?.(value, form)
    }));
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

  const isValid = errors && Object.values(errors).some((item) => !!item);

  return ReactDOM.createPortal((
      <>
        <form className={styles.modal} noValidate onSubmit={onSubmit}>
          <div className={styles.close_cross} onClick={onClose}></div>
          <div className={styles.content}>
            <Select name="status" id="status" options={TASK_STATUS_OPTIONS} value={form.status}
                    onChange={handleOnChange} className={styles.select_status} />
            <Input type="text" name="title" id="title" placeholder="Название задачи" error={errors?.title}
                   value={form.title}
                   onChange={handleOnChange} autoFocus />
            <Textarea id="content" placeholder="Описание..." rows={3} value={form.description}
                      showCounter onChange={handleOnChange} maxLength={100} name="description" />
            <div className={styles.content_details}>
              <div className={styles.details_group}>
                <p className={styles.label}>Выберите приоритет</p>
                <Select name="priority" id="priority" onChange={handleOnChange}
                        options={TASK_PRIORITY_OPTIONS}
                        value={form.priority} additionalOptionText="priority" className={styles.priority_select} />
              </div>
              <div className={styles.details_group}>
                <p className={styles.label}>Дата создания</p>
                <span className={styles.date_start}>{form.dateOfStart}</span>
              </div>
              <div className={styles.details_group}>
                <p className={styles.label}>Выполнить до</p>
                <Input type="date" name="dateOfEnd" id="dateOfEnd"
                       onChange={handleOnChange} error={errors?.dateOfEnd} value={form.dateOfEnd} />
              </div>
            </div>
            <button type="submit" disabled={!!isValid} className={styles.btn_submit}>Сохранить изменения</button>
          </div>
        </form>
        <ModalOverlay onClick={onClose} />;
      </>
    ),
    modalRoot!
  )
    ;
};
