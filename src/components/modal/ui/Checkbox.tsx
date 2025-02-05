import { ForwardedRef, InputHTMLAttributes } from 'react';

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  error?: string;
  onChange?: (checked: boolean) => void;
  type: string;
  defaultChecked: boolean;
  className?: string;
}

export const Checkbox = ({ inputRef, type, defaultChecked, onChange, className, ...props }: ICheckboxProps) => {
  return (
    <label>
      <input ref={inputRef} type={type} defaultChecked={defaultChecked} className={className}
             onChange={(e) => onChange?.(e?.target?.checked)}{...props} />
    </label>
  );
};