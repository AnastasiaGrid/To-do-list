import { ForwardedRef, InputHTMLAttributes } from 'react';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  error?: string;
  onChange?: (value: string) => void;
}

export const Input = ({ inputRef, onChange, ...props }: IInputProps) => {
  return (
    <label>
      <input ref={inputRef} {...props}
             onChange={(e) => onChange?.(e?.target?.value)} />
    </label>
  );
};