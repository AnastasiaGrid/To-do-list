import { ReactElement } from 'react';
import './note-container.scss';
import {
  getDoneTasksFromLocalStorage,
  getInProgTasksFromLocalStorage,
  getToDoTasksFromLocalStorage
} from '../../utils/utils.ts';
import { NoteItemUI } from '../ui/noteItemUI/noteItemUI.tsx';
import { ITaskItem, TPriority, TSection } from '../../utils/types.ts';

interface INoteContainerProps {
  priority: TPriority;
  section: TSection;
}

export function NoteContainer({ priority, section }: INoteContainerProps): ReactElement {
  const tasksFromTodo = getToDoTasksFromLocalStorage();
  const tasksFromInProg = getInProgTasksFromLocalStorage();
  const tasksFromDone = getDoneTasksFromLocalStorage();
  let noteItem;
  switch (section) {
    case 'to do':
      noteItem = tasksFromTodo.map((item: ITaskItem) => <NoteItemUI priority={priority} taskTitle={item.title}
                                                                    dateOfEnd={item.dateOfEnd} />);
      break;
    case 'in progress':
      noteItem = tasksFromInProg.map((item: ITaskItem) => <NoteItemUI priority={priority} taskTitle={item.title}
                                                                      dateOfEnd={item.dateOfEnd} />);
      break;
    case 'done':
      noteItem = tasksFromDone.map((item: ITaskItem) => <NoteItemUI priority={priority} taskTitle={item.title}
                                                                    dateOfEnd={item.dateOfEnd} />);
      break;
  }
  return (
    <ul className="note-container">
      {noteItem}
    </ul>
  );
}
