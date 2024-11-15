import './priority-block.css'
import {NoteContainer} from "../note-container/note-container.tsx";
interface IPriorityBlock {
    title: string;
    classes: string;
}

export function PriorityBlock ({title, classes}: IPriorityBlock) {
    return (
        <div className='priority-block'>
            <h2 className={`priority-block-title ${classes}`}>{title}</h2>
            <NoteContainer/>
        </div>

    )
}