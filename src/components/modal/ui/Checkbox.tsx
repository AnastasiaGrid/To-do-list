import { ForwardedRef, InputHTMLAttributes } from 'react';

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  error?: string;
  onChange?: (taskId: string) => void;
  value: string;
  type: string;
  isChecked?: boolean;
  className?: string;
}

export const Checkbox = ({ inputRef, type, onChange, isChecked, className, value, ...props }: ICheckboxProps) => {
  return (
    <label>
      <input ref={inputRef} type={type} value={value} checked={isChecked} className={className} {...props}
             onChange={(e) => onChange?.(e?.target?.value)} />
    </label>
  );
};