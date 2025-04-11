import { ITaskItem, TStatus } from '../../utils/types.ts';

export interface IModalProps {
  status: TStatus;
  onClose: () => void;
  handleSetTask?: (task: ITaskItem, isOldTask: boolean) => void;
  taskEdit: ITaskItem | null;
}

export type TErrors = Partial<Record<keyof ITaskItem, string | null | undefined>>
