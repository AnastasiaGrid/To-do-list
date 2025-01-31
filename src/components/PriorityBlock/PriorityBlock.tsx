import './priority-block.scss';
import { ITaskItem, TPriority, TStatus } from '../../utils/types.ts';

import { NoteItem } from '../NoteItem/NoteItem.tsx';
import { useDrop } from 'react-dnd';

interface IPriorityBlock {
  status: TStatus;
  priority: TPriority;
  tasks: ITaskItem[] | null;
  handleClickCheckbox: (taskID: string) => void;
  handleDeleteClick: (taskID: string) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}

export function PriorityBlock({
                                status,
                                priority,
                                tasks,
                                handleClickCheckbox,
                                handleDeleteClick,
                                DnDMoveTask
                              }: IPriorityBlock) {
  const [{ handlerId }, dropRefTarget] = useDrop(
    () => ({
      accept: 'task',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      drop: () => ({
        name: status, priority
      })
    }), [status, priority]
  );

  if (tasks) {
    return (
      <div className="priority-block" ref={dropRefTarget} data-handler-id={handlerId}>
        {status === 'done' ? tasks.length ? <h2 className={`low`}> Good job!</h2> : null :
          <h2 className={`${priority}`}>{priority} priority</h2>}
        <ul className="note-container">
          {tasks.map((task: ITaskItem, index: number) => <NoteItem task={task} index={index} key={task.id}
                                                                   handleClickCheckbox={handleClickCheckbox}
                                                                   handleDeleteClick={handleDeleteClick}
                                                                   DnDMoveTask={DnDMoveTask} />)}
        </ul>
      </div>
    );
  }
  return null;
}