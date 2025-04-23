import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Loading from './components/Loading';
import toast from 'react-hot-toast';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodoList = async () => {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:3000/api/todos");
        const result = await response.json();
        const todoData = result.data;
        setTodoList(todoData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }


    const toggleTodoTask = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
          method: "PUT"
        });
        const result = await response.json();
        
        if(result.success){
          setTodoList((prev) => (
            prev.map((todo) => (
              todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            ))
          ));
        }
        else{
          toast.error(result.message);
        }

      } catch (error) {
        toast.error(error.message);
      }
    }

    
    useEffect(() => {
      fetchTodoList();
    }, []);

  return (
    <>
      <div className="container w-full h-screen mx-auto py-5 flex flex-col items-center gap-5">
        <div className="max-w-4xl  w-full py-3 px-2 rounded-xl">
          <TodoForm fetchTodoList={fetchTodoList} />
        </div>
        
        <div className="max-w-4xl w-full min-h-5/6 h-full  rounded-lg p-3">
          {
            loading ? (
              <Loading />
            ) : (
              <TodoList data={todoList} toggleTodoTask={toggleTodoTask} fetchTodoList={fetchTodoList} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App;
