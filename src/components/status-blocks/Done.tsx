import './StatusBlocks.module.scss';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function Done({
                       tasks,
                       handleDeleteClick,
                       handleClickCheckbox,
                       DnDMoveTask
                     }: Omit<ISectionStatusProps, 'status'>) {
  return (
    <>
      <div className={`container`}>
        <h1>Done</h1>
        <PriorityBlock status={'done'} priority={'low'} tasks={tasks} handleClickCheckbox={handleClickCheckbox}
                       handleDeleteClick={handleDeleteClick}
                       DnDMoveTask={DnDMoveTask} className={'full_height'} />
      </div>
    </>
  );
}
