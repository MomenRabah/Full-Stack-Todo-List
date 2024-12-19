import React, { useRef, useState } from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import todo_icon from '../assets/todo_icon.png'
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../api/axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../components/AuthContext';

function HomePage() {
    const queryClient = useQueryClient();
    const {logOut} = useAuth()
    const inputRef = useRef()
    const [deadline, setDeadline] = useState(null);
    
  const addTodoMutation = useMutation(
    async (newTodo) => {
      const response = await axiosInstance.post('/todos', newTodo);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        queryClient.invalidateQueries('todoCounts');
        setDeadline(null);
      }
    }
  );

  const addTask = () => {
    const content = inputRef.current.value.trim();
    if (content) {
        addTodoMutation.mutate({ 
            content,
            deadline: deadline ? deadline.toISOString().split('T')[0] : null
        });
        inputRef.current.value = '';
    }
  };

  return (
    <div className='bg-stone-200 grid py-4 min-h-screen'>
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[600px] rounded-xl'>
            <div className='flex items-center mt-7 gap-2 justify-between'>
                <div className='flex items-center gap-2'>
                <img className='w-8' src={todo_icon} alt='' />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
                </div>
                <button onClick={logOut} className=' text-red-500 px-2 py-1 rounded-md'>Logout</button>
            </div>

            <div className='flex flex-col gap-4 my-7'>
                <div className='flex items-center bg-gray-200 rounded-full'>
                    <input 
                        ref={inputRef} 
                        className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
                        type='text' 
                        placeholder='Add your task'
                    />
                </div>
                
                <div className='flex items-center gap-4'>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select deadline"
                        className="bg-gray-200 border-0 outline-none h-14 px-6 rounded-full flex-1"
                        minDate={new Date()}
                    />
                    
                    <button 
                        onClick={addTask} 
                        className='border-none rounded-full bg-teal-400 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                    >
                        ADD +
                    </button>
                </div>
            </div>

            <div className='flex mx-2 gap-8'>
                <NavLink to="/home" end className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Dashboard</NavLink>
                <NavLink to="/home/tasks/ongoing" className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Ongoing Tasks</NavLink>
                <NavLink to="/home/tasks/completed" className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Completed Tasks</NavLink>

            </div>
            <Outlet/>

        </div>
    </div>
  )
}

export default HomePage