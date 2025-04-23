const express = require("express");
const { createTodo, getAllTodos, toggleTodo, deleteTodo } = require("../controllers/todo.controller");
const router = express.Router();

router.post("/todos", createTodo);

router.get("/todos", getAllTodos);

router.put("/todos/:id", toggleTodo);

router.delete("/todos/:id", deleteTodo);


module.exports = router;