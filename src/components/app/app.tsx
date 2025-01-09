import './app.scss';
import { Todo } from '../status-block/Todo.tsx';
import { InProgress } from '../status-block/InProgress.tsx';
import { Done } from '../status-block/Done.tsx';

export function App() {

  return (
    <>
      <Todo />
      <InProgress />
      <Done />
    </>
  );
}

export default App;
