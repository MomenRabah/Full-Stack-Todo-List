import TodoItems from './TodoItems'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axiosInstance from '../api/axios';

function TodoList({showCompleted}) {
    const queryClient = useQueryClient();

    const fetchTodoList = async () => {
    const { data } = await axiosInstance.get('/todos', {
        params: { showCompleted: showCompleted.toString() },
    });
    return data;
    };
 

    const { isLoading, isError, data: filtredTodo, error } = useQuery(['todos', showCompleted], fetchTodoList)


    const deleteTodoMutation = useMutation(
        async (id)=> {
            await axiosInstance.delete(`/todos/${id}`);
        },
        {
            onSuccess: ()=>{
                queryClient.invalidateQueries('todos')
                queryClient.invalidateQueries('todoCounts')
            }
        }
    );
    const deleteTodo = (id)=>{
        deleteTodoMutation.mutate(id);
    }


    const toggleTodoMutation = useMutation(
        async (id) => {
        const { data } = await axiosInstance.put(`/todos/${id}`);
        return data; 
        },
        {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
            queryClient.invalidateQueries('todoCounts');
        },
        }
    );

    const toggleTodo = (id)=>{
        console.log('Toggling todo with id:', id);
        toggleTodoMutation.mutate(id);
    };


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7  rounded-xl'>
        {isError && <div className="text-red-500">Error fetching data: {error.message}</div>}
        {isLoading && <div className="text-gray-500">Loading tasks...</div>}

    <div>
        {filtredTodo?.map((item) => (
            <TodoItems
                key={item._id}
                text={item.content}
                id={item._id}
                isComplete={item.isComplete}
                deadline={item.deadline}
                deleteTodo={deleteTodo}
                toggle={(id)=>{toggleTodo(id);
                }}
            />
            
        ))}
        
    </div>



    </div>
  )
}

export default TodoList