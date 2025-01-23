import './app.scss';
import { Todo } from '../status-blocks/Todo.tsx';
import { InProgress } from '../status-blocks/InProgress.tsx';
import { Done } from '../status-blocks/Done.tsx';
import { useState } from 'react';
import { ITaskItem } from '../../utils/types.ts';
import { getFilteredTaskByStatus, setInitialLocalStorage, setLocalStorage } from '../../utils/utils.tsx';

export function App() {
  const [tasks, setTasks] = useState<ITaskItem[]>(setInitialLocalStorage());

  const tasksToDo = getFilteredTaskByStatus(tasks, 'to do');
  const tasksInProg = getFilteredTaskByStatus(tasks, 'in progress');
  const tasksDone = getFilteredTaskByStatus(tasks, 'done');

  const handleSetTask = (task: ITaskItem) => {
    setTasks(prev => {
      const newTasks = [...prev, task];
      setLocalStorage(newTasks);
      return newTasks;
    });
  };

  const handleClickCheckbox = (taskId: string) => {
    const newArr = tasks.map(item => {
      if (item.id === taskId) {
        item.status = 'done';
      }
      return item;
    });
    setTasks(() => {
      setLocalStorage(newArr);
      return newArr;
    });
    //@TODO добавить модалку с вопросом "Отметить как выполненное?" и добавить галочку больше не спрашивать
  };


  const handleDeleteClick = (taskID: string) => {
    const newArr = tasks.filter(item => item.id !== taskID);
    setTasks(() => {
      setLocalStorage(newArr);
      return newArr;
    });
  };


  return (
    <>
      <Todo tasks={tasksToDo} handleSetTask={handleSetTask} handleClickCheckbox={handleClickCheckbox}
            handleDeleteClick={handleDeleteClick} />
      <InProgress tasks={tasksInProg} handleSetTask={handleSetTask} handleClickCheckbox={handleClickCheckbox}
                  handleDeleteClick={handleDeleteClick} />
      <Done tasks={tasksDone} handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick} />
    </>
  );
}

export default App;
