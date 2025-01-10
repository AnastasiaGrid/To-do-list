import './app.scss';
import { Todo } from '../status-block/Todo.tsx';
import { InProgress } from '../status-block/InProgress.tsx';
import { Done } from '../status-block/Done.tsx';
import { useState } from 'react';
import { ITaskItem } from '../../utils/types.ts';
import { setInitialLocalStorage, setLocalStorage } from '../../utils/utils.tsx';

export function App() {
  const [tasksToDo, setTasksToDo] = useState<ITaskItem[]>(setInitialLocalStorage('todoTasks'));
  const [tasksInProg, setTasksInProg] = useState<ITaskItem[]>(setInitialLocalStorage('inProgTasks'));
  const [tasksDone, setTasksDone] = useState<ITaskItem[]>(setInitialLocalStorage('doneTasks'));

  const handleSetTaskToDo = (task: ITaskItem) => {
    setTasksToDo(prev => {
      const newTasks = [...prev, task];
      setLocalStorage('todoTasks', newTasks);
      return newTasks;
    });
  };

  const handleSetTaskInProg = (task: ITaskItem) => {
    setTasksInProg(prev => {
      const newTasks = [...prev, task];
      setLocalStorage('inProgTasks', newTasks);
      return newTasks;
    });
  };

  return (
    <>
      <Todo tasks={tasksToDo} handleSetTask={handleSetTaskToDo} />
      <InProgress tasks={tasksInProg} handleSetTask={handleSetTaskInProg} />
      <Done tasks={tasksDone} />
    </>
  );
}

export default App;
