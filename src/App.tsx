import { KeyboardEvent, useState } from "react"
import ListTask from "./components/ListTask"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./app/store"
import { addTask } from "./features/task"

export interface ITask {
  task: string
  isChecked: boolean
}

export default function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks)
  const [currentTask, setCurrentTask] = useState<string>("")

  const handleAddTask = () => {
    if (currentTask !== '') {
      dispatch(addTask({ task: currentTask, isChecked: false }))
      setCurrentTask("")
    }
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <section className="rounded-xl py-10 px-6 border border-white/30 bg-white/20 backdrop-blur-md shadow-xl w-[30rem]">
        <h1 className="text-2xl font-semibold text-center text-white mb-2">Todo App</h1>
        <div className="flex gap-2 mb-2 w-full">
          <input
            type="text"
            value={currentTask}
            onKeyDown={handleEnter}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder="Input your task"
            className="outline-none bg-white/20 rounded-md px-2 py-1 text-white/80 w-full"
          />
          <button
            onClick={handleAddTask}
            className="border border-white/30 px-2 cursor-pointer rounded-md text-white bg-orange-400 hover:bg-orange-500"
          >+</button>
        </div>
        <ul>
          {tasks.map((item, idx) => {
            return (
              <ListTask
                key={idx}
                item={item}
                listIdx={idx}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}