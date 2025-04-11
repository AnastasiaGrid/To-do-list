import { ITaskItem, TPriority, TStatus } from '../../utils/types.ts';

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
