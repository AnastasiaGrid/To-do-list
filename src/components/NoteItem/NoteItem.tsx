import { ReactElement } from 'react';
import './note-item.scss';
import '../PriorityBlock/priority-block.scss';
import { ITaskItem } from '../../utils/types.ts';
import { Checkbox } from '../modal/ui/Checkbox.tsx';
import { toFormatDate, validationDateOfEnd } from '../../utils/utils.tsx';


interface INoteItemProps {
  task: ITaskItem;
  handleClickCheckbox: (taskID: string) => void;
  handleDeleteClick: (taskID: string) => void;
}

export function NoteItem({ task, handleClickCheckbox, handleDeleteClick }: INoteItemProps): ReactElement {
  const isDoneStyle = task.status !== 'done' ? task.priority : 'low';
  const isDoneChecked = task.status === 'done';
  const deadline = validationDateOfEnd(task.dateOfEnd, task) ? 'note-list-date_deadline' : null;

  // @TODO передаю два раза таскид в функию удаления таски и переноса в дан  может можно просто пережданосить ид?

  return (
    <>
      <li className="note-list">
        <div className="drag-and-drop-dots">
          <span className={`dot ${isDoneStyle}`}></span>
          <span className={`dot ${isDoneStyle}`}></span>
          <span className={`dot ${isDoneStyle}`}></span>
        </div>
        <div className={`note-list-item ${isDoneStyle}`}>
          <div className="note-list-text">
            <p className="note-list-title">{task.title}</p>
            {task.dateOfEnd ?
              <p className={`note-list-date ${deadline}`}>до {toFormatDate(task.dateOfEnd)}</p> : null
            }
          </div>
          <div className="note-list_container">
            <label form="in done"></label>
            <Checkbox type="checkbox" id="in done" name="checkbox" value={task.id} onChange={handleClickCheckbox}
                      checked={isDoneChecked} className="note-list_container-checkbox" />
            <div className="note-list_container-svg" onClick={() => handleDeleteClick(task.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                <path
                  d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}