export interface ITaskItem {
  status: TStatus,
  title: string,
  description: string,
  priority: TPriority,
  dateOfStart: string,
  dateOfEnd: string,
  id: string,
}

export type TStatus = 'to do' | 'in progress' | 'done';
export type TPriority = 'high' | 'medium' | 'low';


export interface IDragEl {
  id: string,
  status: TStatus,
  priority: TPriority,
  index: number
}

export interface IDropResult {
  name: TStatus;
  priority: TPriority;
}

