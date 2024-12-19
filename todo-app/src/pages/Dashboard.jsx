
import { useFetchTodoCounts } from '../hooks/useTodoQueries';

function Dashboard() {

    const {data, isLoading, isError, error} = useFetchTodoCounts()

    if (isLoading) {
    return <div>Loading...</div>;
    }

    if (isError) {
    return <div>Error: {error.message}</div>;
    }

  return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7  h-full  rounded-xl'>
            <p className='text-slate-950 font-bold ml-4 mt-8 text-[19px]'>Ongoing tasks: {data.onGoingCount}</p>
            <p className='text-slate-950 font-bold ml-4 my-5 text-[19px]'>Completed tasks: {data.completedCount}</p>
            

        </div>
  )
}

export default Dashboard