import { ReactElement, useState } from 'react';
import './note-item.scss';
import '../../priority-block/priority-block.scss';
import { ITaskItem } from '../../../utils/types.ts';
import { nanoid } from 'nanoid';
import { Input } from '../../modal/ui/Input.tsx';

interface INoteItemProps {
  task: ITaskItem;
  handleClickCheckbox?: (value: string) => void;
}

export function NoteItem({ task, handleClickCheckbox }: INoteItemProps): ReactElement {
  const key = nanoid();
  const [isChecked, setChecked] = useState<boolean>(false);
  // const handleClickCheckbox = (value: string) => {
  //   if (value) {
  //     setChecked(true);
  //     deleteTask(task);
  //   }
  // };

  return (
    <>{!isChecked ?
      <li className="note-list" key={key}>
        <div className="drag-and-drop-dots">
          <span className={`dot ${task.priority}`}></span>
          <span className={`dot ${task.priority}`}></span>
          <span className={`dot ${task.priority}`}></span>
        </div>
        <div className={`note-list-item ${task.priority}`}>
          <div className="note-list-text">
            <p className="note-list-title">{task.title}</p>
            <p className="note-list-date">до {task.dateOfEnd}</p>
          </div>
          <div className="note-list_container-checkbox">
            <label form="in done" className="">Done</label>
            <Input type="checkbox" id="in done" name="checkbox" value="done" onChange={handleClickCheckbox} />
          </div>
        </div>
      </li> : null}
    </>
  );
}