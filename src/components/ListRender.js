import React from 'react'
import { BiEdit, BiTrash } from "react-icons/bi";

const ListRender = ({id, title, removeItem, editItem}) => {
  return (
    <div className='list-item'>
        <p className='title'>{title}</p>
        <div className='button-container'>
            <BiEdit className='btn-edit' onClick={() => editItem(id)} />
            <BiTrash className='btn-delete' onClick={() => removeItem(id)} />
        </div>
    </div>
  )
}

export default ListRender