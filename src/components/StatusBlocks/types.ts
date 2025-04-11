import { ITaskItem, TPriority, TStatus } from '../../utils/types.ts';

export interface ISectionStatusProps {
  tasks: ITaskItem[];
  status: TStatus;
  handleSetTask?: (task: ITaskItem, isOldTask: boolean) => void;
  handleClickCheckbox?: (checked: boolean, task: ITaskItem) => void;
  handleEditClick?: (taskID: string) => void;
  handleDeleteClick: (taskID: string) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}