export interface ITaskItem {
  section: TSection,
  title: string,
  description: string,
  priority: TPriority,
  dateOfStart: string,
  dateOfEnd: string,
  id: number,
}

export interface IModalProps {
  section: TSection;
  onClose: () => void;
}

export interface IModalUIProps extends IModalProps {
  date: string;
}

export type TSection = 'to do' | 'in progress' | 'done';
export type TPriority = 'high' | 'medium' | 'low';

export interface INoteItemUI {
  priority: string,
  taskTitle: string,
  dateOfEnd: string
}