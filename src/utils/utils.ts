import { ITaskItem, TErrors, TPriority, TStatus } from './types';
// import { nanoid } from 'nanoid';

//работа с датами
export function setToday(): string {
  const date = new Date(); // Создаем дату
  const month = (date.getMonth() + 1).toString(); // Получаем месяц
  const day = date.getDate().toString(); // Получаем день
  // Возвращаем строку формата даты для input type=date
  return `${day.length === 2 ? day : `0${day}`}.${month.length === 2 ? month : `0${month}`}.${date.getFullYear()}`;
}

export function toFormatDate(date: string): string {
  return date.split('-').reverse().join('.');
}

const date = setToday();
export const getInitialValue = (status: TStatus): ITaskItem => {
  return {
    status: status,
    title: '',
    description: '',
    priority: 'high',
    dateOfStart: date,
    dateOfEnd: '',
    id: 'nanoid()'
  };
};

//Работа с локал сторадж

//Устанавливает начальное значение для стейта в компоненте Section
export function setInitialLocalStorage() {
  return getTasksFromLocalStorage() || [];
}

//Записывает в локал
export function setLocalStorage(data: ITaskItem[]) {
  localStorage.setItem('tasks', JSON.stringify(data));
}

// Возвращает все таски
export function getTasksFromLocalStorage(): ITaskItem[] {
  try {
    return JSON.parse(localStorage.getItem('tasks') || '');
  } catch {
    return [];
  }
}

//Возвращает отфильтрованные таски по статусу для вставки компоненты для отрисовки
export function getFilteredTaskByStatus(tasks: ITaskItem[], status?: TStatus) {
  return tasks.filter(item => item.status === status);
}

//Возвращает отфильтрованные таски по приоритету для вставки UI
export function getFilteredTaskByPriority(tasks: ITaskItem[], priority?: TPriority) {
  const filteredTasksByPriority = tasks.filter(item => item.priority === priority);
  return filteredTasksByPriority.length ? filteredTasksByPriority : null;
}

//  ВАЛИДАЦИЯ
export const validationTitle = (inputValue: string) => {
  return inputValue.length > 0 ? null : 'Не оставляй поле пустым';
};

export const validationDateOfEnd = (dateOfEnd: string, allValues: Partial<ITaskItem>): string | null | undefined => {
  if (allValues.dateOfStart) {
    const endDate = new Date(dateOfEnd);
    const start = allValues.dateOfStart.split('.').reverse().join('.');
    const startDate = new Date(start);
    const yearOfEnd = endDate.getFullYear();
    if (dateOfEnd === '') {
      return null;
    }
    if (yearOfEnd > 2040) {
      return 'Далеко до дедлайна';
    }
    return endDate.getTime() < startDate.getTime() ? 'Уже просрочено' : null;
  }
};

export const validationValues: Partial<Record<keyof ITaskItem, (value: string, allValues: Partial<ITaskItem>) => string | null | undefined>> = {
  title: validationTitle,
  dateOfEnd: validationDateOfEnd
};

export const validationOnSubmit = (form: ITaskItem): TErrors => {
  const submitErrors: TErrors = {};
  (Object.keys(validationValues) as Array<keyof ITaskItem>).forEach((key: keyof ITaskItem) => {
    const validateFn = validationValues[key];
    submitErrors[key] = validateFn?.(form[key], form);
  });
  return submitErrors;
};