require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./database/db.js");
const todoRouter = require("./routes/todo.route.js");
const cors = require("cors");

connectToDB();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", todoRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Todo App",
        success: true
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});