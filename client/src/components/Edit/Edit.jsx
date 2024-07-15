import React from 'react'
import "./Edit.css"

export default function Edit({editing, editSumit, handleChangeValue}) {
  return (
    <>
        <div className='edit-contsiner'>
            <h1>Edit Here</h1>
                <div>
                <input type="text" value={editing} onChange={handleChangeValue} />
                <div className='span-item' onClick={editSumit}>Save</div>
                </div>
        </div>
    </>
  )
}
