import {NoteItem} from "../note-item/note-item.tsx";
import {FC} from "react";
import './note-container.css'

export const NoteContainer: FC = () =>  {
    return (
        <section className='note-container'>
            <NoteItem/>
            <NoteItem/>
            <NoteItem/>
            <NoteItem/>
        </section>
)
}
