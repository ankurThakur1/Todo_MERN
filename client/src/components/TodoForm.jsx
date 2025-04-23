import React, { useState } from 'react'
import toast from "react-hot-toast"

const TodoForm = ({ fetchTodoList }) => {
    const [formData, setFormData] = useState({
      todo: "",
      isCompleted: false
    });
    const [loading, setLoading] = useState(false);
    console.log(formData);
    
    const handleFormData = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("inside form: ", formData);
      setLoading(true);
      try {   
        const response = await fetch("http://localhost:3000/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        console.log(response);
        // if(!response.ok){
        //   throw new Error("Something went wrong")
        // }

        const result = await response.json();
        console.log("Database todo: ", result);  
        if(result.success){
          setFormData({
            todo: "",
            isCompleted: false
          });
          setLoading(false);
          toast.success(result.message);
          fetchTodoList();
          // window.location.reload();
          console.log(result.message);
        }
        else{
          toast.error(result.message);
          console.log(result.message);
          setLoading(false);
        }

      } catch (error) {
        toast.error(error.message); 
      }
    }



  return (
    <div className="w-full h-14">
      <form className="w-full h-full flex items-center gap-5" onSubmit={handleSubmit}>
        <input className="w-full h-full border-gray-400 focus:outline-orange-400 border px-4 py-3 text-xl rounded-md bg-gray-50 text-orange-600 " type="text" placeholder="Enter todo..." name="todo" id="todo" value={formData.todo} onChange={handleFormData} />
        <div className="max-w-32 w-full h-14">
          <button type="submit" className="w-full h-full text-2xl text-white rounded-md cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-300 disabled:bg-orange-200" disabled={loading}>{loading ? "Adding..." : "Add Todo"}</button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm;