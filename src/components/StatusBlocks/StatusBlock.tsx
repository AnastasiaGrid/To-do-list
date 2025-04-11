import styles from './StatusBlocks.module.scss';
import { useState } from 'react';
import { getFilteredTaskByPriority } from '../../utils/utils.ts';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock.tsx';
import { Modal } from '../Modal/Modal.tsx';
import { ITaskItem } from '../../utils/types.ts';
import { TASK_PRIORITY } from '../../utils/constants.ts';
import { ISectionStatusProps } from './types.ts';

const { HIGH, MEDIUM, LOW } = TASK_PRIORITY;

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
      <section className={styles.container}>
        <div className={styles.add_cross} onClick={handleCrossClick}></div>
        <h1 className={styles.title}>{status}</h1>
        <PriorityBlock status={status} priority={HIGH}
                       tasks={getFilteredTaskByPriority(tasks, HIGH)}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
        <PriorityBlock status={status} priority={MEDIUM} tasks={getFilteredTaskByPriority(tasks, MEDIUM)}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
        <PriorityBlock status={status} priority={LOW} tasks={getFilteredTaskByPriority(tasks, LOW)}
                       handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
                       handleEditClick={handleEditClick}
                       DnDMoveTask={DnDMoveTask} />
      </section>
      {modalVisible && (
        <Modal status={status} onClose={handleClose} handleSetTask={handleSetTask} taskEdit={taskEdit} />)}
    </>
  );
}

