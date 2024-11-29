import './priority-block.scss';
import { NoteContainer } from '../note-container/note-container.tsx';
import { TPriority, TSection } from '../../utils/types.ts';

interface IPriorityBlock {
  section: TSection;
  priority: TPriority;
}

export function PriorityBlock({ section, priority }: IPriorityBlock) {
  return (
    <div className="priority-block">
      <h2 className={`${priority}`}>{priority} priority</h2>
      <NoteContainer priority={priority} section={section} />
    </div>

  );
}