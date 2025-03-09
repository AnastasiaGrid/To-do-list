import { ForwardedRef, TextareaHTMLAttributes } from 'react';
import '../modal/modal.module.scss';

interface ITextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  textAreaRef?: ForwardedRef<HTMLTextAreaElement>;
  maxLength: number;
  onChange?: (value: string) => void;
  showCounter?: boolean;
}


export const Textarea = ({ value, textAreaRef, showCounter, onChange, maxLength, ...props }: ITextAreaProps) => {
  return (
    <label>
      <textarea ref={textAreaRef} value={value} {...props} onChange={(e) => onChange?.(e?.target?.value)}
                maxLength={maxLength} />
      {showCounter && <div className="counter">
        <span className="counter__current">{String(value ?? '').length}</span>&nbsp;/
        <span className="counter__total">{maxLength}</span>
      </div>}
    </label>
  );
};
