import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const TodoCard = ({ todo, handleToggleTodoTask, handleDeleteTodo }) => {
    console.log("single todo: ", todo)
  return (
    <div className="border-b border-gray-300 py-3 px-3 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <input type="checkbox" name="checkbox" checked={todo.isCompleted} onChange={() => handleToggleTodoTask(todo._id)} />
        <p className={`${todo.isCompleted ? "line-through text-gray-400" : ""} text-xl`}>{todo.todo}</p>
        <span className={`${todo.isCompleted ? "text-green-500" : "text-gray-700"} text-sm ml-5`}>{todo.isCompleted ? "(Completed)" : "(Pending)"}</span>
      </div>
      <button onClick={() => handleDeleteTodo(todo._id)}>
        <FaTrashAlt size={20} className="transition-all duration-300 hover:text-red-500 cursor-pointer" />
      </button>
    </div>
  )
}

export default TodoCard;