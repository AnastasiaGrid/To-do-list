import { ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  error?: string | null;
  styleError?: string;
  name: string;
}

export const Input = ({ onChange, error, value, autoFocus, name, styleError, ...props }: IInputProps) => {
  return (
    <>
      <input className={clsx(styles.input, { [styles.input_error]: error })} autoComplete={'off'}
             value={value} {...props}
             name={name}
             onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event)} maxLength={50}
             autoFocus={autoFocus} />
      <span className={clsx(styleError, styles.error_text)}>{error}</span>
    </>
  );
};
