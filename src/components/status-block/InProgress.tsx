import './sections.scss';
import { useState } from 'react';
import { ITaskItem } from '../../utils/types.ts';
import { getFilteredTask, setInitialLocalStorage, setLocalStorage } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { Modal } from '../modal/Modal.tsx';

export function InProgress() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksInProg, setTasks] = useState<ITaskItem[]>(setInitialLocalStorage('inProgTasks'));

  const handleCrossClick = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  const handleSetTask = (task: ITaskItem) => {
    setTasks(prev => {
      const newTasks = [...prev, task];
      setLocalStorage('inProgTasks', newTasks);
      return newTasks;
    });

  };

  return (
    <>
      <div className={`container`}>
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>In Progress</h1>
        <PriorityBlock status={'in progress'} priority={'high'} children={getFilteredTask(tasksInProg, 'high')} />
        <PriorityBlock status={'in progress'} priority={'medium'} children={getFilteredTask(tasksInProg, 'medium')} />
        <PriorityBlock status={'in progress'} priority={'low'} children={getFilteredTask(tasksInProg, 'low')} />
      </div>
      {modalVisible && (<Modal status={'in progress'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
