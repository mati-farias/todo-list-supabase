export default function Task({ task, toggleTask, deleteTask }) {
  return (
    <div
      className={`w-full p-4 mb-4 bg-white rounded shadow-md dark:bg-gray-800 flex flex-wrap sm:flex-nowrap items-center justify-between`}>
      <div className='flex-grow'>
        <h2 className={`text-2xl ${task.isComplete ? 'line-through' : ''}`}>
          {task.title}
        </h2>
        <p className='text-sm text-gray-500'>{task.description}</p>
      </div>
      <div className='flex flex-col w-full mt-4 sm:flex-row sm:space-x-2 sm:w-auto sm:mt-0'>
        <button
          onClick={() => toggleTask(task.id, task.isComplete)}
          className={`p-2 border-2 rounded flex-grow text-center ${
            task.isComplete ? 'bg-green-500' : 'bg-yellow-500'
          }`}>
          {task.isComplete ? 'Done!' : 'Not done yet!'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className='flex-grow p-2 mt-2 text-center bg-red-500 border-2 rounded sm:mt-0'>
          Delete
        </button>
      </div>
    </div>
  );
}
