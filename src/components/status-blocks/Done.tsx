import './status-blocks.scss';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function Done({
                       tasks,
                       handleDeleteClick,
                       DnDMoveTask
                     }: Omit<ISectionStatusProps, 'status'>) {
  return (
    <>
      <div className={`container`}>
        <h1>Done</h1>
        <PriorityBlock status={'done'} priority={'low'} tasks={tasks}
                       handleDeleteClick={handleDeleteClick}
                       DnDMoveTask={DnDMoveTask} className={'full_height'} />
      </div>
    </>
  );
}
