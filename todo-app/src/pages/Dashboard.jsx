import React, { useEffect, useState } from 'react'
import {Link , Outlet} from 'react-router-dom'
import todo_icon from '../assets/todo_icon.png'
import supabase from '../config/supabaseClient';
import { useQuery } from 'react-query';
import axiosInstance from '../api/axios';

function Dashboard() {

    const fetchTodoCounts = async () => {
        const { data } = await axiosInstance.get('/todos/counts');
        return data;
      };

    const { data, isLoading, isError, error } = useQuery('todoCounts', fetchTodoCounts);

    if (isLoading) {
    return <div>Loading...</div>;
    }

    if (isError) {
    return <div>Error: {error.message}</div>;
    }

//   const [ongoingCount, setOngoingCount] = useState(0);
//   const [completedCount, setCompletedCount] = useState(0);

//   useEffect(() => {
//       const fetchTaskCounts = async () => {
//           const { data: tasks, error } = await supabase
//               .from('ToDoList')
//               .select('isComplete');

//           if (error) {
//               console.error("Error fetching tasks:", error);
//               return;
//           }

//           const ongoingTasks = tasks.filter((task) => !task.isComplete).length;
//           const completedTasks = tasks.filter((task) => task.isComplete).length;

//           setOngoingCount(ongoingTasks);
//           setCompletedCount(completedTasks);
//       };

//       fetchTaskCounts();

//       const taskSubscription = supabase
//           .channel('realtime:ToDoList')
//           .on('postgres_changes', { event: '*', schema: 'public', table: 'ToDoList' }, (payload) => {
//               console.log('Dashboard: Real-time change detected', payload);
//               handleRealtimeChange(payload);
//           })
//           .subscribe();

//       return () => {
//           supabase.removeChannel(taskSubscription);
//       };
//   }, []);

//   const handleRealtimeChange = (payload) => {
//       const { eventType, new: newTask, old: oldTask } = payload;

//       if (eventType === 'INSERT') {
//           if (newTask.isComplete) {
//               setCompletedCount((prev) => prev + 1);
//           } else {
//               setOngoingCount((prev) => prev + 1);
//           }
//       } else if (eventType === 'UPDATE') {
//           if (newTask.isComplete !== oldTask.isComplete) {
//               if (newTask.isComplete) {
//                   setOngoingCount((prev) => prev - 1);
//                   setCompletedCount((prev) => prev + 1);
//               } else {
//                   setOngoingCount((prev) => prev + 1);
//                   setCompletedCount((prev) => prev - 1);
//               }
//           }
//       } else if (eventType === 'DELETE') {
//           if (oldTask.isComplete) {
//               setCompletedCount((prev) => prev - 1);
//           } else {
//               setOngoingCount((prev) => prev - 1);
//           }
//       }
//   };

  return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7  h-full  rounded-xl'>
            
            <p className='text-slate-950 font-bold ml-4 mt-8 text-[19px]'>Ongoing tasks: {data.onGoingCount}</p>
            <p className='text-slate-950 font-bold ml-4 my-5 text-[19px]'>Completed tasks: {data.completedCount}</p>
            

        </div>
  )
}

export default Dashboard