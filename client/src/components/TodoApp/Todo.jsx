import React, { useEffect, useState } from 'react'
import List from '../List/List'
// import Edit from '../Edit/Edit'
import "./Todo.css"
import axios from 'axios'


// const getItem = () =>{
//     const  item = localStorage.getItem("todo")
//     if (item) {
//       return  JSON.parse(localStorage.getItem("todo"));
//     }else{
//       return []
//     }
// }

let URL = "http://localhost:3005/api/"

export default function Header() {

  const [input, setInput] = useState("")
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState("")
  const [indexx, setIndexx] = useState("")

  useEffect(() => {
    fetchTodo()
  },[]);

  const fetchTodo = async ()=>{
    try{
      const response = await axios(URL)
      setItems(response.data);
    }catch(error){
      alert("Error! Could not load items.")
    }

  }

 

  // Function to handle form submission
  const handleChange  = (e) => {
    setInput(e.target.value);
  }

  // const storeItems = (e)=>{
  //   e.preventDefault();
  //   setItems([...items, {input, showEdit: false, completed: false}]);
  //   setInput('');
  // }
  const storeItems = async (e)=>{
    e.preventDefault();
    try{
      if(!input) return
      const response = await axios(URL,{
        method: 'POST',
        data : {
          todo : input
        },
      })
      setItems(response.data)
      // console.log(response.data);
      // setItems([...items, {input, showEdit: false, completed: false}]);
      setInput('');
    }catch(error){
      alert("Error! Could not load items.")
    }
  }

  // const deleteItem  = (id) =>{
  //     setItems(items.filter((item,index)=> index !== id))
  // }
  const deleteItem = async (id)=>{
    try{
      const response = await axios(URL,{
        method: 'DELETE',
        data : {
          _id : id
        },
      })
      setItems(response.data)
      }catch(error){
        alert("Error! Could not load items.")
      }
  }

  const handleUpdateText = (id)=>{
    const newItems = [...items]
    console.log(id);
    // console.log(newItems._id); 
    const result = newItems.forEach((value)=>{
      // _id == id
      // const _id = value._id
      if(value._id === id){
        // console.log(value._id);
        value.showEdit = true
      }
    })
    setItems(newItems)

    const filterResult = items.filter((value)=>value._id == id)
    console.log(filterResult,"_____filterResult");
    const  [input]=filterResult;
    // console.log(filterResult[0].todo,"----input");
    const inputValue = input.todo
    console.log(inputValue,"__________inputValue");
    setEditing(inputValue);
    const inputId = input._id
    setIndexx(inputId)
  }

  // const complete = (id)=>{
  //   const newItems = [...items]
  //   const result = newItems.forEach((value, index)=>{
  //     index == id
  //     if(index == id){
  //       value.completed?  value.completed = false:  value.completed = true
  //     }
  //   })
  //   setItems(newItems)
  //   setIndexx(id)
  // }
    const complete = async (_id,status) => {
      console.log("check");
      try{
        const response = await axios(`${URL}cross`,{
          method: 'PUT',
          data : {
            _id : _id,
            completed : status
          },
        })
        setItems(response.data)
        // setIndexx(id);
        }catch(error){
          alert("Error! Could not load items.")
          console.error('Error:', error);
        }
      // setIndexx(_id);
    };

  // const editSumit = ()=>{
  //     const result = [...items]
  //     result[indexx].todo = editing
  //     result[indexx].showEdit=false
  //     setItems(result)
  // }
  const editSumit = async ()=>{
    console.log(indexx);
    try{
      // const result = [...items]
      const response = await axios(URL,{
        method: 'PUT',
        data : {
          _id : indexx,
          todo : editing,
          showEdit : false
        },
      })
      // result[indexx].input = editing
      // result[indexx].showEdit=false
      console.log(response.data,"__res");
      setItems(response.data)
      }catch(error){
        alert("Error! Edit Could not load items.")
      }
    }

  const handleChangeValue = (e)=>{
      setEditing(e.target.value)
  }

  return (
    <div className='header'>
        <div className='header-container'>
            <h1>ToDo App</h1>
        </div>
        <div className='todo-container'>
            <form className='input-group' onSubmit={storeItems}>
                <h1>Write To Do</h1>
                <input type="text" value={input} onChange={handleChange} placeholder="Enter Task Here" />
            </form>
        </div>
        <List  items={items}  deleteItem={deleteItem} editInput={handleUpdateText} editing={editing} editSumit={editSumit} handleChangeValue={handleChangeValue} complete={complete}/>
        

    </div>
  )
}
