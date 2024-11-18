import './sections.scss'
import {PriorityBlock} from "../priority-block/priority-block.tsx";


export function DoneSection(){
    return(
        <div className="container done-section">
            <h1>Done</h1>
            <PriorityBlock title='Good job!' classes='low-priority'/>
        </div>
    )
}