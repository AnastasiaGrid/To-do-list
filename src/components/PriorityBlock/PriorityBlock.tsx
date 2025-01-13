import './priority-block.scss';
import { ITaskItem, TPriority, TStatus } from '../../utils/types.ts';

import { NoteItem } from '../NoteItem/NoteItem.tsx';

interface IPriorityBlock {
  status: TStatus;
  priority: TPriority;
  tasks: ITaskItem[] | null;
  handleClickCheckbox: (taskId: string) => void;
  handleDeleteClick: () => void;
}

export function PriorityBlock({ status, priority, tasks, handleClickCheckbox, handleDeleteClick }: IPriorityBlock) {
  if (tasks) {
    return (
      <div className="priority-block">
        {status !== 'done' ? <h2 className={`${priority}`}>{priority} priority</h2> :
          <h2 className={`low`}>Good job!</h2>}
        <ul className="note-container">
          {tasks.map((task: ITaskItem) => <NoteItem task={task} key={task.id}
                                                    handleClickCheckbox={handleClickCheckbox}
                                                    handleDeleteClick={handleDeleteClick} />)}
        </ul>
      </div>
    );
  }
  return null;
}