import { InputHTMLAttributes } from 'react';

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  onChange?: (checked: boolean) => void;
  defaultChecked: boolean;
  className?: string;
}

export const Checkbox = ({ defaultChecked, onChange, className, ...props }: ICheckboxProps) => {
  return (
    <input type="checkbox" defaultChecked={defaultChecked} className={className}
           onChange={(e) => onChange?.(e?.target?.checked)}{...props} />
  );
};