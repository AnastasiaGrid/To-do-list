import { ReactElement } from 'react';
import './note-item.scss';
import '../../priority-block/priority-block.scss';
import { INoteItemUI } from '../../../utils/types.ts';

export function NoteItemUI({ priority, taskTitle, dateOfEnd }: INoteItemUI): ReactElement {
  return (
    <>
      <li className="note-list">
        <div className="drag-and-drop-dots">
          <span className={`dot ${priority}`}></span>
          <span className={`dot ${priority}`}></span>
          <span className={`dot ${priority}`}></span>
        </div>
        <div className={`note-list-item ${priority}`}>
          <div className="note-list-text">
            <p className="note-list-title">{taskTitle}</p>
            <p className="note-list-date">до {dateOfEnd}</p>
          </div>
          <input type="checkbox" />
        </div>
      </li>
    </>
  );
}