import { SelectHTMLAttributes } from 'react';
import { TPriority } from '../../../utils/types.ts';


interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: TPriority;
  onChange?: (value: TPriority) => void;
}

//@TODO изменить Селект-он не унивесальный

export const Select = ({ name, id, onChange, value }: ISelectProps) => {
  return (
    <select name={name} id={id} value={value}
            onChange={(e) => onChange?.(e?.target?.value as TPriority)}>
      <option value={value} selected={value === 'high'}>High priority</option>
      <option value={value} selected={value === 'medium'}>Medium priority</option>
      <option value={value} selected={value === 'low'}>Low priority</option>
    </select>
  );
};