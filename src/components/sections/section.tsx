import {PriorityBlock} from "../priority-block/priority-block.tsx";
import {ReactElement} from "react";

interface ISectionProps {
    title: string;
    sectionClass: string;
}
export function Section({title, sectionClass}: ISectionProps): ReactElement {
    return (
        <>
            <div className={`container ${sectionClass}`}>
                <div className='add-cross'></div>
                <h1>{title}</h1>
                <PriorityBlock title='High priority' classes='high-priority'/>
                <PriorityBlock title='Medium priority' classes='medium-priority'/>
                <PriorityBlock title='Low priority' classes='low-priority'/>
            </div>
        </>
    )
}