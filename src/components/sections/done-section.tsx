import './sections.scss';
import { PriorityBlock } from '../priority-block/priority-block.tsx';


export function DoneSection() {
  return (
    <div className="container">
      <h1>Done</h1>
      <PriorityBlock section={'done'} priority={'low'} />
    </div>
  );
}