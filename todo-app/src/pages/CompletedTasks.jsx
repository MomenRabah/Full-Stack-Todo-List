import React from 'react';
import Todo from '../components/Todo';

function CompletedTasks() {
  return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col  rounded-xl'>
            <Todo showCompleted={true} />
        </div>
  );
}

export default CompletedTasks;