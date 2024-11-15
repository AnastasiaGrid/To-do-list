import './sections.css'
import {PriorityBlock} from "../priority-block/priority-block.tsx";


export function DoneSection(){
    return(
        <div className="container done-section">
            <div className='add-cross'></div>
            <h1 className='container-header'>Done</h1>
            <PriorityBlock title='Good job!' classes='low-priority'/>
        </div>
    )
}