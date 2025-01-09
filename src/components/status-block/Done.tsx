import './sections.scss';
import { getFilteredTask, setInitialLocalStorage } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { useState } from 'react';
import { ITaskItem } from '../../utils/types.ts';

export function Done() {
  const [tasksDone, setTasksDone] = useState<ITaskItem[]>(setInitialLocalStorage('doneTasks'));

  return (
    <>
      <div className={`container`}>
        <h1>Done</h1>
        <PriorityBlock status={'done'} priority={'low'} children={getFilteredTask(tasksDone)} />
      </div>
    </>
  );
}
