import { PriorityBlock } from '../priority-block/priority-block.tsx';
import { ReactElement, useState } from 'react';
import { Modal } from '../modal/Modal.tsx';
import { TSection } from '../../utils/types.ts';

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
  return (
    <>
      <div className={`container`}>
        <div className="add-cross" onClick={handleCrossClick}></div>
        <h1>{section}</h1>
        <PriorityBlock section={section} priority={'high'} />
        <PriorityBlock section={section} priority={'medium'} />
        <PriorityBlock section={section} priority={'low'} />
      </div>
      {modalVisible && (<Modal section={section} onClose={handleClose} />)}
    </>
  );
}