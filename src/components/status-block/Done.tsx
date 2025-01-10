import './sections.scss';
import { getFilteredTask } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { ITaskItem } from '../../utils/types.ts';

export function Done({ tasks }: { tasks: ITaskItem[] }) {

  return (
    <>
      <div className={`container`}>
        <h1>Done</h1>
        <PriorityBlock status={'done'} priority={'low'} children={getFilteredTask(tasks)} />
      </div>
    </>
  );
}
