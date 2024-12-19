import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../api/axios';

export const useFetchTodos = (showCompleted) => {
  return useQuery(['todos', showCompleted], async () => {
    const { data } = await axiosInstance.get('/todos', {
      params: { showCompleted: showCompleted.toString() },
    });
    return data;
  });
};

export const useFetchTodoCounts = () => {
  return useQuery('todoCounts', async () => {
    const { data } = await axiosInstance.get('/todos/counts');
    return data;
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newTodo) => {
      const response = await axiosInstance.post('/todos', newTodo);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        queryClient.invalidateQueries('todoCounts');
      },
    }
  );
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      await axiosInstance.delete(`/todos/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        queryClient.invalidateQueries('todoCounts');
      },
    }
  );
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
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
}; 