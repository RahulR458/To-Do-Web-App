const express = require("express")
const Todo = require("../models/todoModel")

const router = express.Router();

const todoList = [];

router.get("/", async (req, res) => {
  try {
    const response = await Todo.find();
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
  // res.json(todoList)
});

router.post("/", async (req, res) => {
  try {
    const {todo}  = req.body;
    const result = { todo: todo, showEdit: false, completed: false };
    console.log(req.body);
    // console.log(response);
    // todoList.push(response);
    await Todo.create(result)
    const response = await Todo.find()
    res.json(response);
    // res.json({message: "todo list is created"});
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res)=>{
    // const {id} = req.body
    // const index = todoList.findIndex((todo)=>todo.id == id)
    // todoList.splice(index, 1)
    // res.json(todoList)
    try {
      const {_id} = req.body
      await Todo.findByIdAndDelete(_id)
      const response = await Todo.find()
      res.json(response)
    } catch (error) {
      console.log(error);
    }
})

router.put("/", async (req, res)=>{
    // const {editingValue, indexValue} = req.body
    // todoList[indexValue].todo = editingValue
    // console.log(todoList[indexValue].todo,"-----");
    // res.json(todoList)
    console.log("enter");
    try {
      console.log(req.body);
      const {_id, todo} = req.body
      await Todo.findByIdAndUpdate(_id, {todo: todo}, {new: true})
      const response = await Todo.find()
      res.json(response)
    } catch (error) {
      console.log(error);
    }
})

router.put("/cross", async (req, res)=>{
    // const {id, completed} = req.body
    // const index = todoList.findIndex((todo)=>todo.id == id)
    // console.log(index);
    // todoList[index].completed = completed
    // console.log(todoList);
    // res.json(todoList)
    try {
      const {_id, completed} = req.body
      await Todo.findByIdAndUpdate(_id, {completed: completed}, {new: true})
      const response = await Todo.find()
      res.json(response)
    } catch (error) {
      console.log(error);
    }
})


module.exports = router