import './StatusBlocks.module.scss';
import { useState } from 'react';
import { getFilteredTaskByPriority } from '../../utils/utils.ts';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { Modal } from '../modal/Modal.tsx';
import { ISectionStatusProps, ITaskItem } from '../../utils/types.ts';

export function StatusBlock({
                              tasks,
                              handleSetTask,
                              handleClickCheckbox,
                              handleDeleteClick,
                              status, DnDMoveTask
                            }: ISectionStatusProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskEdit, setTaskEdit] = useState<ITaskItem | null>(null);
  const handleCrossClick = () => {
    setModalVisible(true);
    setTaskEdit(null);
  };
  const handleClose = () => {
    setModalVisible(false);
    setTaskEdit(null);
  };

  const handleEditClick = (task: ITaskItem) => {
    setModalVisible(true);
    setTaskEdit(task);
  };
  return (
    <>
      <section className="container">
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>{status}</h1>
        <PriorityBlock status={status} priority={'high'}
                       tasks={getFilteredTaskByPriority(tasks, 'high')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
        <PriorityBlock status={status} priority={'medium'} tasks={getFilteredTaskByPriority(tasks, 'medium')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
        <PriorityBlock status={status} priority={'low'} tasks={getFilteredTaskByPriority(tasks, 'low')}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
      </section>
      {modalVisible && (
        <Modal status={status} onClose={handleClose} handleSetTask={handleSetTask} taskEdit={taskEdit} />)}
    </>
  );
}

