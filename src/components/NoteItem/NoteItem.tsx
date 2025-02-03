import { ReactElement } from 'react';
import './note-item.scss';
import '../PriorityBlock/priority-block.scss';
import { IDragEl, IDropResult, ITaskItem, TPriority, TStatus } from '../../utils/types.ts';
import { Checkbox } from '../modal/ui/Checkbox.tsx';
import { toFormatDate, validationDateOfEnd } from '../../utils/utils.tsx';
import { useDrag } from 'react-dnd';


interface INoteItemProps {
  task: ITaskItem;
  index: number;
  handleClickCheckbox?: (taskID: string) => void;
  handleDeleteClick: (taskID: string) => void;
  handleEditClick?: (task: ITaskItem) => void;
  DnDMoveTask: (dropPriority: TPriority, dropStatus: TStatus, taskId: string) => void;
}

export function NoteItem({
                           task,
                           index,
                           handleClickCheckbox,
                           handleDeleteClick,
                           handleEditClick,
                           DnDMoveTask
                         }: INoteItemProps): ReactElement {
  const isDoneChecked = task.status === 'done';
  const isDoneStyle = isDoneChecked ? 'low' : task.priority;
  const deadline = validationDateOfEnd(task.dateOfEnd, task) ? 'note-list-date_deadline' : null;

  // @TODO передаю два раза таскид в функию удаления таски и переноса в дан  может можно просто пережданосить ид?

  // const taskRef = useRef<HTMLElement>(null);
  const id = task.id;
  const status = task.status;
  const priority = task.priority;
  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: (): IDragEl => {
      return { id, status, priority, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end(item: IDragEl, monitor) {
      const dropResult = monitor.getDropResult() as IDropResult;
      if (dropResult === null) {
        // alert('Перемещение вне зоны задач : переносите задачу только туда, где есть список');
        DnDMoveTask(item.priority, item.status, item.id);
      } else {
        DnDMoveTask(dropResult.priority, dropResult.name, item.id);
      }
    }
  });
  const opacity = isDragging ? 'opacity' : null;

  return (
    <>
      <li className="note-list" ref={dragRef}>
        <div className="drag-and-drop-dots">
          <span className={`dot ${isDoneStyle}`}></span>
          <span className={`dot ${isDoneStyle}`}></span>
          <span className={`dot ${isDoneStyle}`}></span>
        </div>
        <div className={`note-list-item ${isDoneStyle} ${opacity}`}>
          <div className="note-list-text">
            <p className="note-list-title">{task.title}</p>
            {task.dateOfEnd && !isDoneChecked ?
              <p className={`note-list-date ${deadline}`}>до {toFormatDate(task.dateOfEnd)}</p> : null
            }
          </div>
          <div className="note-list_container">
            <label form="in done"></label>
            {!isDoneChecked ?
              <Checkbox type="checkbox" id="in done" name="checkbox" value={task.id} onChange={handleClickCheckbox}
                        checked={isDoneChecked} className="note-list_container-checkbox" /> : null}
            {!isDoneChecked ?
              <div className="note-list_container-svg" onClick={() => handleEditClick?.(task)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0,0,256,256">
                  <g fill="#ffffff">
                    <g transform="scale(16,16)">
                      <path
                        d="M12.03125,2.02344c-0.49609,0 -0.96484,0.24609 -1.35547,0.63281l-8.11328,8.07031l-1.35547,4.05859l4.05859,-1.35156l0.08594,-0.08203l8.03516,-7.98438c0.38672,-0.39062 0.62891,-0.85937 0.62891,-1.35547c0,-0.49609 -0.24219,-0.96484 -0.62891,-1.35547c-0.39062,-0.38672 -0.85937,-0.63281 -1.35547,-0.63281zM10.02734,4.71094l1.29297,1.29688l-6.59375,6.55469l-1.9375,0.64453l0.64844,-1.94141z"></path>
                    </g>
                  </g>
                </svg>
              </div> : null}
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