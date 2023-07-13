export default function Task({ task, toggleTask, deleteTask }) {
  return (
    <div
      className={`w-full p-4 mb-4 bg-white rounded shadow-md dark:bg-gray-800 flex items-center justify-between`}>
      <div>
        <h2 className={`text-2xl ${task.isComplete ? 'line-through' : ''}`}>
          {task.title}
        </h2>
        <p className='text-sm text-gray-500'>{task.description}</p>
      </div>
      <div>
        <button
          onClick={() => toggleTask(task.id, task.isComplete)}
          className={`p-2 border-2 rounded flex-no-shrink ${
            task.isComplete ? 'bg-green-500' : 'bg-yellow-500'
          }`}>
          {task.isComplete ? 'Done!' : 'Not done yet!'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className='p-2 ml-2 bg-red-500 border-2 rounded flex-no-shrink'>
          Delete
        </button>
      </div>
    </div>
  );
}
