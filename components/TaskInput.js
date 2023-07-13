export default function TaskInput({
  newTask,
  setNewTask,
  newTaskDescription,
  setNewTaskDescription,
  createTask,
}) {
  return (
    <div className='flex mb-2'>
      <input
        className='w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker dark:text-gray-800' // Add dark:text-white
        type='text'
        placeholder='Add task'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <input
        className='w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker dark:text-gray-800' // Add dark:text-white
        type='text'
        placeholder='Task description'
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button
        className='px-4 py-2 font-bold bg-blue-600 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal whitespace-nowrap' // Increase padding
        onClick={createTask}>
        Add Task
      </button>
    </div>
  );
}
