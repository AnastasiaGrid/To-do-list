import { Done } from '../StatusBlocks/Done.tsx';
import { useEffect, useState } from 'react';
import { ITaskItem, TPriority, TStatus } from '../../utils/types.ts';
import { getFilteredTaskByStatus, getTasksFromLocalStorage, setLocalStorage } from '../../utils/utils.ts';
import { StatusBlock } from '../StatusBlocks/StatusBlock.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TASK_STATUS } from '../../utils/constants.ts';

const { TO_DO, IN_PROGRESS, DONE } = TASK_STATUS;

export function App() {
  const [tasks, setTasks] = useState<ITaskItem[]>(getTasksFromLocalStorage());
  const tasksToDo = getFilteredTaskByStatus(tasks, TO_DO);
  const tasksInProg = getFilteredTaskByStatus(tasks, IN_PROGRESS);
  const tasksDone = getFilteredTaskByStatus(tasks, DONE);

  useEffect(() => {
    setLocalStorage(tasks);
  }, [tasks]);

  const handleSetTask = (task: ITaskItem, isOldTask: boolean) => {
    setTasks(prev => {
      //если редактирование
      if (isOldTask) {
        const oldEditTask = prev.map(item => item.id === task.id ? task : item);
        setLocalStorage(oldEditTask);
        return oldEditTask;
      }
      const newTasks = [...prev, task];
      setLocalStorage(newTasks);
      return newTasks;
    });
  };

  const handleClickCheckbox = (checked: boolean, task: ITaskItem) => {
    setTasks((prevTasks) => {
      return prevTasks.map(item => {
        if (item.id === task.id) {
          item.status = checked ? DONE : TO_DO;
        }
        return item;
      });
    });
  };

  const handleDeleteClick = (taskID: string) => {
    const newArr = tasks.filter(item => item.id !== taskID);
    setTasks(newArr);
  };

  const DnDMoveTask = (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => {
    const newArr = tasks.map(item => {
      if (item.id === taskId) {
        item.status = dropStatus;
        item.priority = dropPriority;
      }
      return item;
    });
    setTasks(newArr);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StatusBlock status={TO_DO} tasks={tasksToDo}
                   handleSetTask={handleSetTask}
                   handleClickCheckbox={handleClickCheckbox}
                   handleDeleteClick={handleDeleteClick} DnDMoveTask={DnDMoveTask} />
      <StatusBlock status={IN_PROGRESS} tasks={tasksInProg}
                   handleSetTask={handleSetTask}
                   handleClickCheckbox={handleClickCheckbox}
                   handleDeleteClick={handleDeleteClick} DnDMoveTask={DnDMoveTask} />
      <Done tasks={tasksDone} handleClickCheckbox={handleClickCheckbox} handleDeleteClick={handleDeleteClick}
            DnDMoveTask={DnDMoveTask} />
    </DndProvider>
  );
}

export default App;
