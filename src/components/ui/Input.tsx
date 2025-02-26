import { ForwardedRef, InputHTMLAttributes } from 'react';
import '../modal/modal.module.scss';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  error?: string | null;
}

export const Input = ({ inputRef, onChange, error, value, autoFocus, ...props }: IInputProps) => {
  return (
    <label>
      <input ref={inputRef} className={error ? 'input_error' : undefined} autoComplete={'off'} value={value} {...props}
             onChange={(e) => onChange?.(e?.target?.value)} maxLength={50} autoFocus={autoFocus} />
      <span className="error_span">{error}</span>
    </label>
  );
};
