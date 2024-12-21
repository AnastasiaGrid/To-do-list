import { ITaskItem, TSection } from '../../utils/types.ts';
import {
  getDoneTasksFromLocalStorage,
  getInProgTasksFromLocalStorage,
  getToDoTasksFromLocalStorage
} from '../../utils/utils.ts';
import { NoteItemUI } from '../ui/noteItemUI/NoteItemUI.tsx';

const tasksFromTodo = getToDoTasksFromLocalStorage();
const tasksFromInProg = getInProgTasksFromLocalStorage();
const tasksFromDone = getDoneTasksFromLocalStorage();

const tasksFromTodoLow = tasksFromTodo.filter(item => item.priority === 'low');
const tasksFromTodoMedium = tasksFromTodo.filter(item => item.priority === 'medium');
const tasksFromTodoHigh = tasksFromTodo.filter(item => item.priority === 'high');

const tasksFromInProgLow = tasksFromInProg.filter(item => item.priority === 'low');
const tasksFromInProgMedium = tasksFromInProg.filter(item => item.priority === 'medium');
const tasksFromInProgHigh = tasksFromInProg.filter(item => item.priority === 'high');

export const getfilteredLow = (tasks: ITaskItem[]) => {
  return tasks.filter(item => item.priority === 'low');
};

export const getfilteredMedium = (tasks: ITaskItem[]) => {
  return tasks.filter(item => item.priority === 'medium');
};

export const getfilteredHigh = (tasks: ITaskItem[]) => {
  return tasks.filter(item => item.priority === 'high');
};

export function isTasksInPriority(section: TSection, tasks: ITaskItem[]) {
  const result = {
    high: true,
    medium: true,
    low: true
  };
  const tasksFromTodo = tasks.filter((item: ITaskItem) => item.section === 'to do');

  switch (section) {
    case 'to do':

      if (tasksFromTodo.filter(item => item.priority === 'low').length === 0) {
        result.low = false;
      }
      if (tasksFromTodoMedium.length === 0) {
        result.medium = false;
      }
      if (tasksFromTodoHigh.length === 0) {
        result.high = false;
      }
      break;
    case 'in progress':
      if (tasksFromInProgLow.length === 0) {
        result.low = false;
      }
      if (tasksFromInProgMedium.length === 0) {
        result.medium = false;
      }
      if (tasksFromInProgHigh.length === 0) {
        result.high = false;
      }
      break;
    case 'done':
      result.medium = false;
      result.high = false;
      break;
  }
  return result;
}


export function getFilteredTask(section: TSection, tasks: ITaskItem[]) {
  let noteItemLow;
  let noteItemMedium;
  let noteItemHigh;
  const tasksFromTodo = tasks.filter((item: ITaskItem) => item.section === 'to do');
  const tasksFromTodoLow = tasksFromTodo.filter(item => item.priority === 'low');

  if (section === 'to do') {
    noteItemLow = tasksFromTodoLow.map((item: ITaskItem) => <NoteItemUI priority={item.priority} taskTitle={item.title}
                                                                        dateOfEnd={item.dateOfEnd} />);

    noteItemMedium = tasksFromTodoMedium.map((item: ITaskItem) => <NoteItemUI priority={item.priority}
                                                                              taskTitle={item.title}
                                                                              dateOfEnd={item.dateOfEnd} />);
    noteItemHigh = tasksFromTodoHigh.map((item: ITaskItem) => <NoteItemUI priority={item.priority}
                                                                          taskTitle={item.title}
                                                                          dateOfEnd={item.dateOfEnd} />);
  }
  if (section === 'in progress') {
    noteItemLow = tasksFromInProgLow.map((item: ITaskItem) => <NoteItemUI priority={item.priority}
                                                                          taskTitle={item.title}
                                                                          dateOfEnd={item.dateOfEnd} />);
    noteItemMedium = tasksFromInProgMedium.map((item: ITaskItem) => <NoteItemUI priority={item.priority}
                                                                                taskTitle={item.title}
                                                                                dateOfEnd={item.dateOfEnd} />);
    noteItemHigh = tasksFromInProgHigh.map((item: ITaskItem) => <NoteItemUI priority={item.priority}
                                                                            taskTitle={item.title}
                                                                            dateOfEnd={item.dateOfEnd} />);
  }
  if (section === 'done') {
    noteItemLow = tasksFromDone.map((item: ITaskItem) => <NoteItemUI priority={'low'} taskTitle={item.title}
                                                                     dateOfEnd={item.dateOfEnd} />);
  }
  return { noteItemHigh, noteItemMedium, noteItemLow };
}