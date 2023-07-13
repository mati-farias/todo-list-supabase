export default function TaskInput({
  newTask,
  setNewTask,
  newTaskDescription,
  setNewTaskDescription,
  createTask,
}) {
  return (
    <div className='flex flex-wrap mb-2'>
      <input
        className='w-full px-3 py-2 mb-2 border rounded shadow appearance-none sm:mb-0 sm:mr-4 text-grey-darker dark:text-gray-800'
        type='text'
        placeholder='Add task'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <input
        className='w-full px-3 py-2 mb-2 border rounded shadow appearance-none sm:mb-0 sm:mr-4 text-grey-darker dark:text-gray-800'
        type='text'
        placeholder='Task description'
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button
        className='w-full px-4 py-2 font-bold bg-blue-600 border-2 rounded sm:w-auto flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal whitespace-nowrap'
        onClick={createTask}>
        Add Task
      </button>
    </div>
  );
}
