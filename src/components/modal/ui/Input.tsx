import { ForwardedRef, InputHTMLAttributes } from 'react';
import '../modal.scss';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  onChange?: (value: string) => void;
  error?: string | null;
}

export const Input = ({ inputRef, onChange, error, ...props }: IInputProps) => {
  return (
    <label>
      <input ref={inputRef} className={error ? 'input_error' : undefined} {...props}
             onChange={(e) => onChange?.(e?.target?.value)} />
      <span className="error_span">{error}</span>
    </label>
  );
};
