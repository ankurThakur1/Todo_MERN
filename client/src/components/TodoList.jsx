import React, { useState } from 'react'
import TodoCard from './TodoCard'
import toast from 'react-hot-toast';

const TodoList = ({ data, toggleTodoTask, fetchTodoList }) => {
    const [filteredTask, setFilteredTask] = useState([]);
    const [taskSelect, setTaskSelect] = useState("all");
    const taskArray = [
      {
        id: "all",
        title: "All"
      },
      {
        id: "pending",
        title: "Pending"
      },
      {
        id: "completed",
        title: "Completed"
      }
    ];


    const handleTaskFilter = (task) => {
      setTaskSelect(task)
      let filterTask = [];

      if(task === "all"){
        filterTask = data;
      }
      else if(task === "pending"){
        filterTask = data.filter((todo) => !todo.isCompleted);
      }
      else if(task === "completed"){
        filterTask = data.filter((todo) => todo.isCompleted);
      }

      setFilteredTask(filterTask);
    }


    const handleToggleTodoTask = (id) => {
      toggleTodoTask(id);
    }

    const handleDeleteTodo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
          method: "DELETE"
        })
        const result = await response.json();
        console.log(result);
        if(result.success){
          toast.success(result.message);
          fetchTodoList();
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="w-full h-full rounded-md border-gray-300 border-2 overflow-y-auto flex flex-col gap-3 relative">
      <div className="flex justify-end items-center gap-2 px-3 py-2  mt-2 ">
        {
          taskArray.map((task, index) => (
            <button key={index} className={`px-4 py-1 rounded-md text-sm text-white cursor-pointer hover:bg-amber-500 transition-all duration-300 ${taskSelect === task.id ? "bg-amber-500" : "bg-amber-700"}`} onClick={() => handleTaskFilter(task.id)}>{task.title}</button>
          ))
        }
      </div>
      {
        filteredTask && filteredTask.length > 0 ? (
          filteredTask.map((todo, index) => (
            <TodoCard todo={todo} handleToggleTodoTask={handleToggleTodoTask} handleDeleteTodo={handleDeleteTodo} key={index} />
          ))
        ) : (
          data.length > 0 ? (
            data.map((todo, index) => (
              <TodoCard todo={todo} handleToggleTodoTask={handleToggleTodoTask} handleDeleteTodo={handleDeleteTodo} key={index} />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <h1 className="text-6xl text-gray-300 ">No Todo to show!!</h1>
            </div>
          )
        )
      }


    </div>
  )
}

export default TodoList;


// data && data.length > 0 ? (
//   data.map((todo, index) => (
//     <TodoCard todo={todo} index={index} handleCheck={handleCheck} handleDeleteTodo={handleDeleteTodo} />
//   ))
// ) : (
//   <h1>No Todo to show!!</h1>
// )