import { ITaskItem } from './types.ts';

export function setToday(): string {
  const date = new Date(); // Создаем дату
  const month = (date.getMonth() + 1).toString(); // Получаем месяц
  const day = date.getDate().toString(); // Получаем день
  // Возвращаем строку формата даты для input type=date
  return `${day.length === 2 ? day : `0${day}`}.${month.length === 2 ? month : `0${month}`}.${date.getFullYear()}`;
}

const tasks: ITaskItem[] = [];

export function setLocalStorage(data: ITaskItem) {
  tasks.push(data);
  localStorage.tasks = JSON.stringify(tasks);
}

export function getAllTasksFromLocalStorage(): ITaskItem[] {
  return JSON.parse(localStorage.tasks);
}

export function getToDoTasksFromLocalStorage(): ITaskItem[] {
  return JSON.parse(localStorage.tasks).filter((item: ITaskItem) => item.section === 'to do');
}

export function getInProgTasksFromLocalStorage(): ITaskItem[] {
  return JSON.parse(localStorage.tasks).filter((item: ITaskItem) => item.section === 'in progress');
}

export function getDoneTasksFromLocalStorage(): ITaskItem[] {
  return JSON.parse(localStorage.tasks).filter((item: ITaskItem) => item.section === 'done');
}

setLocalStorage({
  section: 'to do',
  title: 'test',
  description: 'test',
  priority: 'high',
  dateOfStart: 'test',
  dateOfEnd: 'test',
  id: 1123
});
setLocalStorage({
  section: 'in progress',
  title: 'test -2',
  description: 'test',
  priority: 'medium',
  dateOfStart: 'test',
  dateOfEnd: 'test',
  id: 777
});
setLocalStorage({
  section: 'done',
  title: 'test -3',
  description: 'test',
  priority: 'medium',
  dateOfStart: 'test',
  dateOfEnd: 'test',
  id: 777
});

