import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface ITextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  maxLength: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  showCounter?: boolean;
}


export const Textarea = ({ value, showCounter, onChange, maxLength, ...props }: ITextAreaProps) => {
  return (
    <div className={styles.wrapper}>
      <textarea className={styles.textarea} value={value} {...props}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event)}
                maxLength={maxLength} />
      {showCounter && <div className={styles.counter}>
        <span>{String(value ?? '').length}</span>&nbsp;/
        <span>{maxLength}</span>
      </div>}
    </div>
  );
};
