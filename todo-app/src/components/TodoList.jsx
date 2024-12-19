import TodoItems from './TodoItems'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axiosInstance from '../api/axios';
import { useDeleteTodo, useFetchTodos, useToggleTodo } from '../hooks/useTodoQueries';

function TodoList({showCompleted}) {
    const {data: todos, isLoading, isError, error} = useFetchTodos(showCompleted)
    const {mutate: toggleTodo} = useToggleTodo()
    const {mutate: deleteTodo} = useDeleteTodo()


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7  rounded-xl'>
        {isError && <div className="text-red-500">Error fetching data: {error.message}</div>}
        {isLoading && <div className="text-gray-500">Loading tasks...</div>}

    <div>
        {todos?.map((item) => (
            <TodoItems
                key={item._id}
                text={item.content}
                id={item._id}
                isComplete={item.isComplete}
                deadline={item.deadline}
                deleteTodo={deleteTodo}
                toggle={(id)=>{toggleTodo(id)}}
            />
            
        ))}
        
    </div>



    </div>
  )
}

export default TodoList