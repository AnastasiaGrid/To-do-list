import { PriorityBlock } from '../priority-block/priority-block.tsx';
import { ReactElement, useState } from 'react';
import { Modal } from '../modal/Modal.tsx';
import { TSection } from '../../utils/types.ts';
import { getFilteredTask, isTasksInPriority } from './utils.tsx';

interface ISectionProps {
  section: TSection;
}

export function Section({ section }: ISectionProps): ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const handleCrossClick = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const isTaskInPriority = isTasksInPriority(section);

  return (
    <>
      <div className={`container`}>
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>{section}</h1>
        {isTaskInPriority.high ?
          <PriorityBlock section={section} priority={'high'} children={getFilteredTask(section).noteItemHigh} /> : null}
        {isTaskInPriority.medium ?
          <PriorityBlock section={section} priority={'medium'}
                         children={getFilteredTask(section).noteItemMedium} /> : null}
        {isTaskInPriority.low ?
          <PriorityBlock section={section} priority={'low'} children={getFilteredTask(section).noteItemLow} /> : null}
      </div>
      {modalVisible && (<Modal section={section} onClose={handleClose} />)}
    </>
  );
}