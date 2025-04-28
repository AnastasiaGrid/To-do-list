import { describe, expect, test } from '@jest/globals';
import { validationDateOfEnd, validationTitle } from './utils';
import { ITaskItem } from './types';

describe('валидация', () => {
  const task: Partial<ITaskItem> = {
    status: 'to do',
    title: '',
    description: '',
    priority: 'high',
    dateOfStart: '04.02.2025',
    dateOfEnd: '',
    id: ''
  };

  test.each([{
    value: '',
    description: 'валидация пустого заголовка задачи',
    error: 'Не оставляй поле пустым'
  },
    {
      value: 'тест',
      description: 'валидация заполненного заголовка задачи',
      error: null
    }
  ])('$description', ({ value, error }) => {
    expect(validationTitle(value)).toBe(error);
  });
  test.each([{
    text: '',
    description: 'валидация пустого заголовка задачи',
    error: 'Не оставляй поле пустым'
  }, {
    text: 'test',
    description: 'валидация заполненного заголовка задачи',
    error: null
  }])(`$description`, ({ text, error }) => {
    expect(validationTitle(text)).toBe(error);
  });
  test.each([{
    date: '',
    description: 'валидация дедлайна (дата не введена)',
    error: null
  }, {
    date: '12.12.2045',
    description: 'валидация дедлайна (дата сильно больше настоящего года)',
    error: 'Далеко до дедлайна'
  }, {
    date: '12.01.2024',
    description: 'валидация дедлайна (дата меньше сегодняшней)',
    error: 'Уже просрочено'
  }, {
    date: '12.07.2025',
    description: 'валидация дедлайна (корректная дата)',
    error: null
  }])(`$description`, ({ date, error }) => {
    expect(validationDateOfEnd(date, task)).toBe(error);
  });
});
