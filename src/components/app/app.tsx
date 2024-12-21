import './app.scss';
import { TodoSection } from '../status-block/Todo-section.tsx';
import { InProgressSection } from '../status-block/In-progress-section.tsx';
import { DoneSection } from '../status-block/Done-section.tsx';

export function App() {

  return (
    <>
      <TodoSection />
      <InProgressSection />
      <DoneSection />
    </>
  );
}

export default App;
