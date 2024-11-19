import {ReactElement, useState} from "react";
import ReactDOM from "react-dom";
import {ModalOverlay} from "./ModalOverlay.tsx";
import './modal.scss'

interface IModalProps {
    section: string;
    onClose: () => void;
}
const modalRoot=document.getElementById("modal");
export const Modal =({section, onClose}: IModalProps): ReactElement => {
    const [date, setDate] = useState(() => {
        const date = new Date(); // Создаем дату
        const month = (date.getMonth()+1).toString(); // Получаем месяц
        const day = date.getDate().toString(); // Получаем день
        // Возвращаем строку формата даты для input type=date
        return `${day.length === 2 ? day : `0${day}`}-${month.length === 2 ? month : `0${month}` }-${date.getFullYear()}`
        // return `${date.getFullYear()}-${month.length === 2 ? month : `0${month}` }-${day.length === 2 ? day : `0${day}`}`
    })

    return ReactDOM.createPortal((
        <>
            <div className="modal">
                <div className='content'>
                    <h3>{section}</h3>
                    <div className='button-close' onClick={onClose}></div>
                    <input type="text" placeholder='Название задачи' value={}/>
                    <textarea id='content' placeholder='Описание...' rows='5'></textarea>
                    <div className='content-details'>
                        <div className='content-details__group'>
                            <p>Выберите приоритет</p>
                            <select name="Приоритет" id="">
                                <option>High priority</option>
                                <option>Medium priority</option>
                                <option>Low priority</option>
                            </select>
                        </div>
                        <div className='content-details__group'>
                            <p>Дата создания</p>
                            <span><p>{date}</p></span>
                        </div>
                        <div className='content-details__group'>
                            <p>Выполнить до</p>
                            <input type='date'/>
                        </div>
                    </div>
                    <button type='button'>Сохранить изменения</button>
                </div>
            </div>
                <ModalOverlay/></>
            ), modalRoot!
    )
}
