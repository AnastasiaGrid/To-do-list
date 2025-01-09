import './priority-block.scss';
import { TPriority, TStatus } from '../../utils/types.ts';

import { ReactNode } from 'react';

interface IPriorityBlock {
  status: TStatus;
  priority: TPriority;
  children: ReactNode;
}

export function PriorityBlock({ status, priority, children }: IPriorityBlock) {
  if (children) {
    return (
      <div className="priority-block">
        {status !== 'done' ? <h2 className={`${priority}`}>{priority} priority</h2> :
          <h2 className={`${priority}`}>Good job!</h2>}
        <ul className="note-container">
          {children}
        </ul>
      </div>

    );
  }
  return null;
}