import { SelectHTMLAttributes } from 'react';


interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: string;
  options: string[];
  text?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const Select = ({ name, id, onChange, value, options, text, className }: ISelectProps) => {
  return (
    <select name={name} id={id} value={value}
            onChange={(e) => onChange?.(e?.target?.value)} className={className}>
      {options.map((option: string, index) => <option value={option} key={index}>{option} {text}</option>)}
    </select>
  );
};