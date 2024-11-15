import './sections.css'
import {PriorityBlock} from "../priority-block/priority-block.tsx";

export function InProgressSection(){
    return(
        <div className='container in-progress-section'>
            <div className='add-cross'></div>
            <h1 className='container-header'>In progress</h1>
            <PriorityBlock title='High priority' classes='high-priority'/>
            <PriorityBlock title='Medium priority' classes='medium-priority'/>
            <PriorityBlock title='Low priority' classes='low-priority'/>
        </div>
    )
}