import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';

interface ITextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  maxLength: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  showCounter?: boolean;
  className?: string;
}


export const Textarea = ({ value, showCounter, onChange, maxLength, className, ...props }: ITextAreaProps) => {
  return (
    <div className={styles.wrapper}>
      <textarea {...props} className={clsx(styles.textarea, className)} value={value}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event)}
                maxLength={maxLength} />
      {showCounter && <div className={styles.counter}>
        <span>{String(value ?? '').length}</span>&nbsp;/
        <span>{maxLength}</span>
      </div>}
    </div>
  );
};
