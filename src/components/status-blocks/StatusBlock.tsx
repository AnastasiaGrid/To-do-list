import './status-blocks.scss';
import { useState } from 'react';
import { getFilteredTaskByPriority } from '../../utils/utils.tsx';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { Modal } from '../modal/Modal.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function StatusBlock({
                              tasks,
                              handleSetTask,
                              handleClickCheckbox,
                              handleDeleteClick,
                              status
                            }: ISectionStatusProps) {
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
        <h1>In progress</h1>
        <PriorityBlock status={status} priority={'high'} tasks={getFilteredTaskByPriority(tasks, 'high')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
        <PriorityBlock status={status} priority={'medium'} tasks={getFilteredTaskByPriority(tasks, 'medium')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
        <PriorityBlock status={status} priority={'low'} tasks={getFilteredTaskByPriority(tasks, 'low')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
      </div>
      {modalVisible && (<Modal status={status} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
