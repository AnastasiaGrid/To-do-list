import { ITaskItem, TPriority, TStorage } from './types.ts';

//работа с датами
export function setToday(): string {
  const date = new Date(); // Создаем дату
  const month = (date.getMonth() + 1).toString(); // Получаем месяц
  const day = date.getDate().toString(); // Получаем день
  // Возвращаем строку формата даты для input type=date
  return `${day.length === 2 ? day : `0${day}`}.${month.length === 2 ? month : `0${month}`}.${date.getFullYear()}`;
}

export function toFormatDate(date: string): string {
  const arrDate = date.split('-');
  return `${arrDate[2]}.${arrDate[1]}.${arrDate[0]}`;
}


//Работа с локал сторадж

//Устанавливает начальное значение для стейта в компоненте Section
export function setInitialLocalStorage(storage: TStorage) {
  return getTasksFromLocalStorage(storage) || [];
}

//Записывает в локал
export function setLocalStorage(storage: TStorage, data: ITaskItem[]) {
  localStorage.setItem(storage, JSON.stringify(data));
}

//Удаляет из локал
export function deleteTask(task: ITaskItem) {
  //нужно, тк название стораджа отличается от статуса(пробелы)
  // let status: TStorage;
  // task.status === 'to do' ? status = 'todoTasks' : status = 'inProgTasks';
  // const tasksAll = getTasksFromLocalStorage(status);
  // const tasksInDone: ITaskItem[] = getTasksFromLocalStorage('doneTasks');
  // const tasksNew: ITaskItem[] = getTasksFromLocalStorage(status);
  //
  // for (let i = 0; i < tasksAll.length; i++) {
  //   if (tasksAll[i].id === task.id) {
  //     tasksAll[i].status = 'done';
  //     tasksInDone.push(tasksAll[i]);
  //   } else {
  //     tasksNew.push(tasksAll[i]);
  //   }
  // }
  // setLocalStorage('doneTasks', tasksInDone);
  // setLocalStorage(status, tasksNew);
}

// Возвращает все таски
export function getTasksFromLocalStorage(storage: TStorage): ITaskItem[] {
  try {
    return JSON.parse(localStorage.getItem(storage));
  } catch {
    return [];
  }
}


//Возвращает отфильтрованные таски по приоритету для вставки UI
export function getFilteredTask(tasks: ITaskItem[], priority?: TPriority) {
  const filteredTasksByPriority = tasks.filter(item => item.priority === priority);
  return filteredTasksByPriority.length ? filteredTasksByPriority : null;
}

// export function getToDoTasksFromLocalStorage(): ITaskItem[] {
//   return getAllTasksFromLocalStorage().filter((item: ITaskItem) => item.section === 'to do');
// }
//
// export function getInProgTasksFromLocalStorage(): ITaskItem[] {
//   return getAllTasksFromLocalStorage().filter((item: ITaskItem) => item.section === 'in progress');
// }
//
// export function getDoneTasksFromLocalStorage(): ITaskItem[] {
//   return getAllTasksFromLocalStorage().filter((item: ITaskItem) => item.section === 'done');
// }





