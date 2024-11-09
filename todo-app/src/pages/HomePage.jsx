import React, { useEffect, useRef, useState } from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import todo_icon from '../assets/todo_icon.png'
import supabase from '../config/supabaseClient';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../api/axios';



function HomePage() {
    const queryClient = useQueryClient();

    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef()
    
  const addTodoMutation = useMutation(
    async (newTodo) => {
      const response = await axiosInstance.post('/todos', newTodo);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        queryClient.invalidateQueries('todoCounts');

      }
    }
  );

  // Function to handle the click event
  const addTask = () => {
    const content = inputRef.current.value.trim();
    if (content) {
      addTodoMutation.mutate({ content });
      inputRef.current.value = ''; // Clear the input field
    }
  };

    // const addTodoMutation = useMutation(
    //     async (newTodo) => {
    //       const { data, error } = await supabase
    //         .from('ToDoList')
    //         .insert(newTodo)
    //         .select();
    //       if (error) throw new Error(error.message);
    //       return data;
    //     },
    //     {
    //       onSuccess: () => {
    //         queryClient.invalidateQueries(['todos']);
    //         inputRef.current.value = ''; 
    //       },
    //     }
    //   );

    // const addTask = ()=>{
    //     const inputText = inputRef.current.value.trim();
    //     if (inputText === '') return;

    //     addTodoMutation.mutate(
    //     { id: Date.now() ,
    //     content: inputText ,
    //     created_at: new Date().toISOString(),
    //     updated_at: new Date().toISOString(), 
    //     isComplete: false })
        
    // };  

    // const add = async () => {
    //     const inputText = inputRef.current.value.trim();
    //     if (inputText === '') return;

    //     const { data, error } = await supabase
    //     .from('ToDoList')
    //     .insert([
    //       { id: Date.now() ,
    //        content: inputText ,
    //        created_at: new Date().toISOString(),
    //        updated_at: new Date().toISOString(), 
    //        isComplete: false },
    //     ])
    //     .select()
      
    //     if (data) {
    //         setTodoList((prev) => [...prev, ...data]);
    //         inputRef.current.value = ''; 
    //     } else {
    //         console.error('No data returned from Supabase');}
    //         console.log('Data returned from Supabase:', data);

    // };




  return (
    <div className='bg-stone-200 grid py-4 min-h-screen'>
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[600px] rounded-xl'>
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt='' />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            <div className='flex items-center my-7 bg-gray-200 rounded-full'>

            <input ref={inputRef} className='bg-transparent border-0 outline-none .
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
            type='text' placeholder='Add your task'/>

            <button onClick={addTask} className='border-none rounded-full
             bg-teal-400 w-32 h-14 text-white text-lg font-medium 
             cursor-pointer'>ADD +</button>

            </div>


            <div className='flex mx-2 gap-8'>
                <NavLink to="" className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Dashboard</NavLink>
                <NavLink to="/tasks/ongoing" className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Ongoing Tasks</NavLink>
                <NavLink to="/tasks/completed" className={({isActive})=>{
                    return isActive? 'text-teal-500 my-2' : 'text-stone-950 my-2'  
                }}>Completed Tasks</NavLink>

            </div>
            <Outlet/>

        </div>
    </div>
  )
}

export default HomePage