import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import { format } from 'date-fns';

const TodoItems = ({text , id, isComplete, deleteTodo, toggle, deadline}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer text-wrap'>
            <img src={isComplete? tick:not_tick} alt='' className='w-7'/>
            <div className='ml-4'>
                <p className={`text-slate-700 text-[17px] decoration-slate-500 
                    ${isComplete? "line-through":""} break-words whitespace-normal`}>
                    {text}
                </p>
                <p className='text-slate-500 text-sm'>
                    {deadline ? `Deadline: ${format(new Date(deadline), 'yyyy-MM-dd')}` : 'no deadline'}
                    
                </p>
            </div>
        </div>
        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt='' className='w-3.5 cursor-pointer'/>


    </div>
  )
}

export default TodoItems