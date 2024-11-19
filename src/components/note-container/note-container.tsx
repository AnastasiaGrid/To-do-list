import {NoteItem} from "../note-item/note-item.tsx";
import {FC} from "react";
import './note-container.scss'

export const NoteContainer: FC = () =>  {
    return (
        <section className='note-container'>
            <NoteItem/>
        </section>
)
}
