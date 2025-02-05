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
  handleSetTask?: (task: ITaskItem, isOldTask: boolean) => void;
  taskEdit: ITaskItem | null;
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

export interface IPriorityBlock {
  status: TStatus;
  priority: TPriority;
  tasks: ITaskItem[] | null;
  className?: string;
  handleClickCheckbox?: (checked: boolean, task: ITaskItem) => void;
  handleDeleteClick: (taskID: string) => void;
  handleEditClick?: (task: ITaskItem) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}

export interface ISectionStatusProps {
  tasks: ITaskItem[];
  status: TStatus;
  handleSetTask?: (task: ITaskItem, isOldTask: boolean) => void;
  handleClickCheckbox?: (checked: boolean, task: ITaskItem) => void;
  handleEditClick?: (taskID: string) => void;
  handleDeleteClick: (taskID: string) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}

export interface INoteItemProps {
  task: ITaskItem;
  index: number;
  handleClickCheckbox?: (checked: boolean, task: ITaskItem) => void;
  handleDeleteClick: (taskID: string) => void;
  handleEditClick?: (task: ITaskItem) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}

export type TErrors = Partial<Record<keyof ITaskItem, string | null | undefined>>

export interface IDragEl {
  id: string,
  status: TStatus,
  priority: TPriority,
  index: number
}

export interface IDropResult {
  dropEffect: string;
  name: TStatus;
  priority: TPriority;
}

