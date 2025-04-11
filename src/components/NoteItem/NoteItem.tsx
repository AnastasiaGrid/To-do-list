import { ReactElement } from 'react';
import './Noteitem.module.scss';
import { IDragEl, IDropResult } from '../../utils/types.ts';
import { Checkbox } from '../ui/Checkbox/Checkbox.tsx';
import { toFormatDate, validationDateOfEnd } from '../../utils/utils.ts';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import styles from './Noteitem.module.scss';
import TrashIcon from '../../../public/icons/trash.svg?react';
import MarkIcon from '../../../public/icons/mark.svg?react';
import { INoteItemProps } from './types.ts';
import { TASK_STATUS } from '../../utils/constants.ts';

export function NoteItem({
                           task,
                           index,
                           handleClickCheckbox,
                           handleDeleteClick,
                           handleEditClick,
                           DnDMoveTask
                         }: INoteItemProps): ReactElement {
  const isDone = task.status === TASK_STATUS.DONE;
  const isDoneStyle = { [styles.low]: isDone };
  const { id, status, priority, title, dateOfEnd } = { ...task };
  const [{ isDragging }, dragRef] = useDrag<IDragEl, IDropResult, { isDragging: boolean }>({
    type: 'task',
    item: () => {
      return { id, status, priority, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      if (dropResult === null) {
        DnDMoveTask(item.priority, item.status, item.id);
      } else {
        DnDMoveTask(dropResult.priority, dropResult.name, item.id);

      }
    }
  });

  return (
    <>
      <li className={styles.note_item} ref={dragRef}>
        <div className={styles.dnd_dots}>
          <span className={clsx(styles.dot, isDoneStyle)}></span>
          <span className={clsx(styles.dot, isDoneStyle)}></span>
          <span className={clsx(styles.dot, isDoneStyle)}></span>
        </div>
        <div className={clsx(styles.item_text, isDoneStyle, {
          [styles.opacity]: isDragging,
          [styles[task.priority]]: !isDone
        })}>
          <div className={styles.item_text_block}>
            <p className={styles.item_title}>{title}</p>
            <p
              className={clsx(styles.item_date, {
                [styles.date_deadline]: validationDateOfEnd(dateOfEnd, task
                )
              })}>{dateOfEnd && !isDone ? `до ${toFormatDate(dateOfEnd)}` : null}</p>

          </div>
          <div className={styles.buttons}>
            <Checkbox
              onChange={(checked: boolean) => {
                handleClickCheckbox?.(checked, task);
              }}
              defaultChecked={isDone} className={styles.checkbox} />
            {!isDone ?
              <div className={styles.svg_container} onClick={() => handleEditClick?.(task)}>
                <MarkIcon />
              </div> : null}
            <div className={styles.svg_container} onClick={() => handleDeleteClick(id)}>
              <TrashIcon />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}