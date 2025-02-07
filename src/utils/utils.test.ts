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
  test('валидация пустого заголовка задачи', () => {
    const res = validationTitle('');
    expect(res).toBe('Не оставляй поле пустым');
  });
  test('валидация заполненного заголовка задачи', () => {
    const res = validationTitle('тест');
    expect(res).toBe(null);
  });
  test('валидация дедлайна (дата не введена)', () => {
    const res = validationDateOfEnd('', task);
    expect(res).toBe(null);
  });
  test('валидация дедлайна (дата сильно больше настоящего года)', () => {
    const res = validationDateOfEnd('12.12.2045', task);
    expect(res).toBe('Далеко до дедлайна');
  });
  test('валидация дедлайна (дата меньше сегодняшней)', () => {
    const res = validationDateOfEnd('12.01.2024', task);
    expect(res).toBe('Уже просрочено');
  });
  test('валидация дедлайна (корректная дата)', () => {
    const res = validationDateOfEnd('12.07.2025', task);
    expect(res).toBe(null);
  });
});
