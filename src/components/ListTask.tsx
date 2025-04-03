import { FaCheckCircle, FaPencilAlt, FaRegCircle, FaTrashAlt } from "react-icons/fa"
import { ITask } from "../App"
import { KeyboardEvent, useState } from "react"
import { PiUploadSimple } from "react-icons/pi"
import { useDispatch } from "react-redux"
import { deleteTask, editTask, setCheck } from "../features/task"

interface IProps {
  item: ITask
  listIdx: number
}

export default function ListTask({ item, listIdx }: IProps) {
  const [editedTask, setEditedTask] = useState<string>(item.task)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleCheck = () => {
    dispatch(setCheck(listIdx))
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask(listIdx))
  }

  const handleConfirmEdit = () => {
    if (editedTask !== '') {
      dispatch(editTask({ newTask: editedTask, idx: listIdx }))
      setIsEditing(!isEditing)
    }
  }

  const handleEnterEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmEdit()
    }
  }

  return (
    <li className="flex justify-between gap-4">
      <div className="flex items-center gap-2 flex-1">
        <button className="cursor-pointer" onClick={handleCheck}>
          {item.isChecked ? (
            <FaCheckCircle className="text-green-400" />
          ) : (
            <FaRegCircle className="text-white hover:text-green-400" />
          )}
        </button>
        {!isEditing ? (
          <p className={`${item.isChecked && "line-through"} text-white pb-1`}>{item.task}</p>
        ) : (
          <input
            type="text"
            value={editedTask}
            onKeyDown={handleEnterEdit}
            onChange={(e) => setEditedTask(e.target.value)}
            className="outline-none pb-[3px] border-b-white text-white border-b w-full"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <button className="cursor-pointer" onClick={handleConfirmEdit}>
            <PiUploadSimple className="text-blue-300 hover:text-blue-400" />
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
            <FaPencilAlt className="text-blue-300 hover:text-blue-400" />
          </button>
        )}
        <button className="cursor-pointer" onClick={handleDeleteTask}>
          <FaTrashAlt className="text-red-500 hover:text-red-400" />
        </button>
      </div>
    </li>
  )
}