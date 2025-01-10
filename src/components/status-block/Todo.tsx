import './sections.scss';
import { useState } from 'react';
import { ISectionStatusProps } from '../../utils/types.ts';
import { getFilteredTask } from '../../utils/utils.tsx';
import { PriorityBlock } from '../priority-block/Priority-block.tsx';
import { Modal } from '../modal/Modal.tsx';

export function Todo({ tasks, handleSetTask }: ISectionStatusProps) {
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
        <PriorityBlock status={'to do'} priority={'high'} tasks={getFilteredTask(tasks, 'high')} />
        <PriorityBlock status={'to do'} priority={'medium'} tasks={getFilteredTask(tasks, 'medium')} />
        <PriorityBlock status={'to do'} priority={'low'} tasks={getFilteredTask(tasks, 'low')} />
      </div>
      {modalVisible && (<Modal status={'to do'} onClose={handleClose} handleSetTask={handleSetTask} />)}
    </>
  );
}
