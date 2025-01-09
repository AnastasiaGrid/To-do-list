import './sections.scss';
import { useState } from 'react';
import { ITaskItem } from '../../utils/types.ts';
import { getFilteredTask, setInitialLocalStorage, setLocalStorage } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { Modal } from '../modal/Modal.tsx';

export function Todo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksToDo, setTasks] = useState<ITaskItem[]>(setInitialLocalStorage('todoTasks'));

  const handleCrossClick = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  const handleSetTask = (task: ITaskItem) => {
    setTasks(prev => {
      const newTasks = [...prev, task];
      setLocalStorage('todoTasks', newTasks);
      return newTasks;
    });


  };

  return (
    <>
      <div className={`container`}>
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>To do</h1>
        <PriorityBlock status={'to do'} priority={'high'} children={getFilteredTask(tasksToDo, 'high')} />
        <PriorityBlock status={'to do'} priority={'medium'} children={getFilteredTask(tasksToDo, 'medium')} />
        <PriorityBlock status={'to do'} priority={'low'} children={getFilteredTask(tasksToDo, 'low')} />
      </div>
      {modalVisible && (<Modal status={'to do'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
