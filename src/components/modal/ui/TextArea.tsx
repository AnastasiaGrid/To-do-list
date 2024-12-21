import { ForwardedRef, TextareaHTMLAttributes } from 'react';

interface ITextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  textAreaRef?: ForwardedRef<HTMLTextAreaElement>;
  value: string;
  onChange?: (value: string) => void;
}


export const TextArea = ({ value, textAreaRef, onChange, ...props }: ITextAreaProps) => {
  return (
    <label>
      <textarea ref={textAreaRef} value={value} {...props} onChange={(e) => onChange?.(e?.target?.value)} />
    </label>
  );
};
