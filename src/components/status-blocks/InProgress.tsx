import './status-blocks.scss';
import { useState } from 'react';
import { getFilteredTaskByPriority } from '../../utils/utils.tsx';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { Modal } from '../modal/Modal.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function InProgress({ tasks, handleSetTask, handleClickCheckbox }: ISectionStatusProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCrossClick = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className={`container`}>
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>In Progress</h1>
        <PriorityBlock status={'in progress'} priority={'high'} tasks={getFilteredTaskByPriority(tasks, 'high')}
                       handleClickCheckbox={handleClickCheckbox} />
        <PriorityBlock status={'in progress'} priority={'medium'} tasks={getFilteredTaskByPriority(tasks, 'medium')}
                       handleClickCheckbox={handleClickCheckbox} />
        <PriorityBlock status={'in progress'} priority={'low'} tasks={getFilteredTaskByPriority(tasks, 'low')}
                       handleClickCheckbox={handleClickCheckbox} />
      </div>
      {modalVisible && (<Modal status={'in progress'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
