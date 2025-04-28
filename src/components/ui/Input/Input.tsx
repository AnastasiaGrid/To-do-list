import { ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  error?: string | null;
  name: string;
  className?: string;
}

export const Input = ({ onChange, error, value, autoFocus, className, name, ...props }: IInputProps) => {
  return (
    <div className={styles.input_block}>
      <input {...props} className={clsx(styles.input, className, { [styles.input_error]: error })}
             autoComplete="off"
             value={value}
             name={name}
             onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event)} maxLength={50}
             autoFocus={autoFocus}
      />
      <span className={styles.error_text}>{error}</span>
    </div>
  );
};
