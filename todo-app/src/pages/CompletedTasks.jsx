import React from 'react';
import TodoList from '../components/TodoList';

function CompletedTasks() {
  return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col  rounded-xl'>
            <TodoList showCompleted={true} />
        </div>
  );
}

export default CompletedTasks;
