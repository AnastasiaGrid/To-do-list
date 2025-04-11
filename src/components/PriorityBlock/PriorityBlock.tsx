import styles from './PriorityBlock.module.scss';
import { IDragEl, IDropResult, ITaskItem } from '../../utils/types.ts';

import { NoteItem } from '../NoteItem/NoteItem.tsx';
import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import clsx from 'clsx';
import { TASK_STATUS } from '../../utils/constants.ts';
import { Identifier } from 'dnd-core';
import { IPriorityBlock } from './types.ts';

export function PriorityBlock({
                                status,
                                priority,
                                tasks,
                                handleClickCheckbox,
                                handleDeleteClick,
                                handleEditClick,
                                DnDMoveTask,
                                className
                              }: IPriorityBlock) {
  const dropRefTarget = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<IDragEl, IDropResult, { handlerId: Identifier | null }>(
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
  drop(dropRefTarget);

  return (
    <div className={clsx(styles.priority_block, className)} ref={dropRefTarget} data-handler-id={handlerId}>
      {status === TASK_STATUS.DONE && tasks?.length && <h2 className={styles.low}> Good job!</h2>}
      {status !== TASK_STATUS.DONE && <h2 className={styles[priority]}>{priority} priority</h2>}
      {!!tasks &&
        <ul className={styles.note_container}>
          {tasks.map((task: ITaskItem, index: number) => <NoteItem task={task} index={index} key={task.id}
                                                                   handleClickCheckbox={handleClickCheckbox}
                                                                   handleDeleteClick={handleDeleteClick}
                                                                   handleEditClick={handleEditClick}
                                                                   DnDMoveTask={DnDMoveTask} />)}
        </ul>}
    </div>
  );
}