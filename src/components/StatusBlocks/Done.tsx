import styles from './StatusBlocks.module.scss';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { TASK_PRIORITY, TASK_STATUS } from '../../utils/constants.ts';
import { ISectionStatusProps } from './types.ts';

export function Done({
                       tasks,
                       handleDeleteClick,
                       handleClickCheckbox,
                       DnDMoveTask
                     }: Omit<ISectionStatusProps, 'status'>) {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Done</h1>
        <PriorityBlock status={TASK_STATUS.DONE} priority={TASK_PRIORITY.LOW} tasks={tasks}
                       handleClickCheckbox={handleClickCheckbox}
                       handleDeleteClick={handleDeleteClick}
                       DnDMoveTask={DnDMoveTask} className={styles.full_height} />
      </div>
    </>
  );
}
