import './app.scss'
import {TodoSection} from "../sections/todo-section.tsx";
import {InProgressSection} from "../sections/in-progress-section.tsx";
import {DoneSection} from "../sections/done-section.tsx";

export function App() {

  return (
      <>
          <TodoSection/>
          <InProgressSection/>
          <DoneSection/>
      </>
  )
}

export default App
