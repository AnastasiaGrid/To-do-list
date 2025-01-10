import './sections.scss';
import { useState } from 'react';
import { getFilteredTask } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { Modal } from '../modal/Modal.tsx';
import { ISectionStatusProps } from '../../utils/types.ts';

export function InProgress({ tasks, handleSetTask }: ISectionStatusProps) {
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
        <PriorityBlock status={'in progress'} priority={'high'} children={getFilteredTask(tasks, 'high')} />
        <PriorityBlock status={'in progress'} priority={'medium'} children={getFilteredTask(tasks, 'medium')} />
        <PriorityBlock status={'in progress'} priority={'low'} children={getFilteredTask(tasks, 'low')} />
      </div>
      {modalVisible && (<Modal status={'in progress'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
