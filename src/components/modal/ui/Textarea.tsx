import { ForwardedRef, TextareaHTMLAttributes } from 'react';
import '../modal.scss';

interface ITextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  textAreaRef?: ForwardedRef<HTMLTextAreaElement>;
  counterCurrent: number;
  onChange?: (value: string) => void;
}


export const Textarea = ({ value, textAreaRef, counterCurrent, onChange, ...props }: ITextAreaProps) => {
  return (
    <label>
      <textarea ref={textAreaRef} value={value} {...props} onChange={(e) => onChange?.(e?.target?.value)}
                maxLength={100} />
      <div className="counter">
        <span className="counter__current">{counterCurrent}</span>&nbsp;/
        <span className="counter__total">100</span>
      </div>
    </label>
  );
};
