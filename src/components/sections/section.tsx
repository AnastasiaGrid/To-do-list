import {PriorityBlock} from "../priority-block/priority-block.tsx";
import {ReactElement, useState} from "react";
import {Modal} from "../modal/Modal.tsx";

interface ISectionProps {
    title: string;
    sectionClass: string;
}

export function Section({title, sectionClass}: ISectionProps): ReactElement {
    const [modalVisible, setModalVisible] = useState(false);
    const handleCrossClick = ()=>{
        setModalVisible(true)
    }
    const handleClose=()=>{
        setModalVisible(false)
    }
    return (
        <>
            <div className={`container ${sectionClass}`}>
                <div className='add-cross' onClick={handleCrossClick}></div>
                <h1>{title}</h1>
                <PriorityBlock title='High priority' classes='high-priority'/>
                <PriorityBlock title='Medium priority' classes='medium-priority'/>
                <PriorityBlock title='Low priority' classes='low-priority'/>
            </div>
            {modalVisible && (<Modal section={'Категория'} onClose={handleClose}/>)}
        </>
    )
}