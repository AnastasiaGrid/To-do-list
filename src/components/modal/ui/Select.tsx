import { SelectHTMLAttributes } from 'react';


interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string; // селект не дает указывать стили из типа(TPriority), только стринг
  onChange?: (value: string) => void;
}

export const Select = ({ name, id, onChange, value }: ISelectProps) => {
  return (
    <select name={name} id={id} value={value}
            onChange={(e) => onChange?.(e?.target?.value)}>
      <option value="high">High priority</option>
      <option value="medium">Medium priority</option>
      <option value="low">Low priority</option>
    </select>
  );
};