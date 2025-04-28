import { ChangeEvent, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';
import clsx from 'clsx';

interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: string;
  options: string[];
  additionalOptionText?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({ name, id, onChange, value, options, additionalOptionText, className }: ISelectProps) => {
  return (
    <select name={name} id={id} value={value}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange?.(event)}
            className={clsx(styles.select && className)}>
      {options.map((option: string, index) => <option value={option}
                                                      key={index}>{option} {additionalOptionText}</option>)}
    </select>
  );
};