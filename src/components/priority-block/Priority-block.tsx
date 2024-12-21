import './priority-block.scss';
import { TPriority, TSection } from '../../utils/types.ts';

import { ReactNode, useId } from 'react';

interface IPriorityBlock {
  section: TSection;
  priority: TPriority;
  children: ReactNode;
}

export function PriorityBlock({ section, priority, children }: IPriorityBlock) {
  const key = useId();

  return (
    <div className="priority-block" key={key}>
      {section !== 'done' ? <h2 className={`${priority}`}>{priority} priority</h2> :
        <h2 className={`${priority}`}>Good job!</h2>}
      <ul className="note-container">
        {children}
      </ul>
    </div>

  );
}