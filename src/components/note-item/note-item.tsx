import {FC} from "react";
import './note-item.scss'

export const NoteItem: FC = () =>{
    return (
        <>
            <article className='note-list'>
                <div className='drag-and-drop-dots'>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                </div>
                <div className='note-list-item'>
                <div className='note-list-text'>
                    <p className='note-list-title'>Купить вкусных яблок</p>
                    <p className='note-list-date'>до 31.12.2024</p>
                </div>
                    <input type='checkbox'/>
                </div>
            </article>
        </>
    )
}