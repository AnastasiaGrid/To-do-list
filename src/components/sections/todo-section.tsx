import './sections.css'
import {PriorityBlock} from "../priority-block/priority-block.tsx";

export function TodoSection(){
    return(
        <>
            <div className='container to-do-section'>
                <div className='add-cross'></div>
                <h1 className='container-header'>To do</h1>
                <PriorityBlock title='High priority' classes='high-priority'/>
                <PriorityBlock title='Medium priority' classes='medium-priority'/>
                <PriorityBlock title='Low priority' classes='low-priority'/>
            </div>
        </>
    )
}