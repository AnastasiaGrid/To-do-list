import './status-blocks.scss';
import { useState } from 'react';
import { ISectionStatusProps } from '../../utils/types.ts';
import { getFilteredTaskByPriority } from '../../utils/utils.tsx';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { Modal } from '../modal/Modal.tsx';

export function Todo({ tasks, handleSetTask, handleClickCheckbox, handleDeleteClick }: ISectionStatusProps) {
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
        <h1>To do</h1>
        <PriorityBlock status={'to do'} priority={'high'} tasks={getFilteredTaskByPriority(tasks, 'high')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
        <PriorityBlock status={'to do'} priority={'medium'} tasks={getFilteredTaskByPriority(tasks, 'medium')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
        <PriorityBlock status={'to do'} priority={'low'} tasks={getFilteredTaskByPriority(tasks, 'low')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
      </div>
      {modalVisible && (<Modal status={'to do'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
