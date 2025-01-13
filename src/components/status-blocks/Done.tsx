import './status-blocks.scss';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function Done({ tasks, handleClickCheckbox }: ISectionStatusProps) {
  return (
    <>
      <div className={`container`}>
        <h1>Done</h1>
        <PriorityBlock status={'done'} priority={'low'} tasks={tasks}
                       handleClickCheckbox={handleClickCheckbox} />
      </div>
    </>
  );
}
