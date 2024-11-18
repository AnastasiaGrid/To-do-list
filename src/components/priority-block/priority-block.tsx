import './priority-block.scss'
import {NoteContainer} from "../note-container/note-container.tsx";
interface IPriorityBlock {
    title: string;
    classes: string;
}

export function PriorityBlock ({title, classes}: IPriorityBlock) {
    return (
        <div className='priority-block'>
            <h2 className={`${classes}`}>{title}</h2>
            <NoteContainer/>
        </div>

    )
}