import { ForwardedRef, InputHTMLAttributes } from 'react';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  value: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const Input = ({ inputRef, value, onChange, ...props }: IInputProps) => {
  return (
    <label>
      <input ref={inputRef} value={value} {...props}
             onChange={(e) => onChange?.(e?.target?.value)} />
    </label>
  );
};