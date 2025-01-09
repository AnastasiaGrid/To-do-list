export interface ITaskItem {
  status: TStatus,
  title: string,
  description: string,
  priority: TPriority,
  dateOfStart: string,
  dateOfEnd: string,
  id: string,
}

export interface IModalProps {
  status: TStatus;
  onClose: () => void;
  handleSetTask: (task: ITaskItem) => void;
}

export interface IModalUIProps extends IModalProps {
  date: string;
  inputValue: string;
  onChange: (e: HTMLInputElement) => void;
}

export type TStatus = 'to do' | 'in progress' | 'done';
export type TPriority = 'high' | 'medium' | 'low';

export interface INoteItemUI {
  priority: string,
  taskTitle: string,
  dateOfEnd: string,
  status: TStatus,
}

export type TStorage = 'todoTasks' | 'inProgTasks' | 'doneTasks'


