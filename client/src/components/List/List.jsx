import React from 'react'
import './List.css'
import Edit from '../Edit/Edit';

export default function List({items, deleteItem, editInput, editing, complete, handleChangeValue, editSumit}) {


  
  // console.log(items);
  // console.log(items._id);
  return (
    <div className='list-section'>
        <ul>
          {items.map((data,index)=>(
            <div key={index}>
                  <li className='li-container'>
                    {data.completed?(
                      <input className='checkbox' defaultChecked={true} onClick={()=>complete(data._id, false)} type="checkbox" />
                      ) : (
                      <input className='checkbox'  onClick={()=>complete(data._id, true)} type="checkbox" />
                    )}
                    {data.completed?<del>{data.todo}</del>:<span>{data.todo}</span>}
                    <i onClick={()=>editInput(data._id)} className="fa-solid fa-pen-to-square"></i>
                    <i onClick={()=>deleteItem(data._id)} className="fa-solid fa-trash-can"></i>
                  </li>
                  {data.showEdit && <Edit  editing={editing} handleChangeValue={handleChangeValue} editSumit={editSumit} />} 
             </div>
          ))}
            {/* <li>Clean the house</li> */}
            {/* <i class="fa-solid fa-square-check"></i> */}
        </ul>
    </div>

  )
}
