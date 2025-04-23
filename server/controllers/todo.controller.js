const Todo = require("../model/todo.model.js");


const createTodo = async (req, res) => {
    try {
        const { todo } = req.body;

        if(!todo){
            return res.status(400).json({
                message: "Field cannot be empty",
                success: false
            });
        }

        const createTodo = await Todo.create({ todo });

        if(createTodo){
            return res.status(201).json({
                message: 'Todo created successfully',
                success: true,
                data: createTodo
            });
        }
        else{
            return res.status(401).json({
                message: "Failed to create todo",
                success: false
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating todo",
            success: false
        });
    }
}

const getAllTodos = async (req, res) => {
    try {
        const getListOfTodos = await Todo.find();
        return res.status(200).json({
            message: "Todos List fetched successfully...",
            success: true,
            data: getListOfTodos
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in fetching list of todos",
            success: false
        });
    }


   
}

const toggleTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const toggleStatus = await Todo.findById(id);

        if(!toggleStatus){
            return res.status(404).json({
                message: "Todo not found",
                success: false
            });
        }

        toggleStatus.isCompleted = !toggleStatus.isCompleted;

        return res.status(202).json({
            message: "Toggle successful",
            success: true,
            data: toggleStatus
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in toggling of todos",
            success: false
        });
    }
}

const deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        
        if(!deletedTodo){
            return res.status(404).json({
                message: "Todo not found",
                success: false
            });
        }

        return res.status(202).json({
            message: "Todo deleted successfully.",
            success: true,
            data: deletedTodo
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in deleting todos",
            success: false
        }); 
    }
}


module.exports = { createTodo, getAllTodos, toggleTodo, deleteTodo }