import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DarkThemeContext } from '../contexts/darkThemeContext';
import { useContext } from 'react';
import Landing from '@/components/Landing';
import Task from '@/components/Task';
import TaskInput from '@/components/TaskInput';

export default function Home() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const { darkTheme } = useContext(DarkThemeContext);
  const className = darkTheme ? 'text-white' : 'text-gray-800';

  useEffect(() => {
    const session = supabase.auth.getSession();

    setSession(session);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && session) {
      fetchTasks();
    }
  }, [session, loading]);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', session?.user?.id);
    if (error) console.error('error', error);
    else setTasks(data);
  }

  async function createTask() {
    if (!newTask) return;
    const { error } = await supabase.from('todos').insert([
      {
        title: newTask,
        description: newTaskDescription,
        user_id: session?.user.id,
        isComplete: false,
      },
    ]);
    if (error) console.error('error', error);
    else fetchTasks();
    setNewTask('');
    setNewTaskDescription('');
  }

  async function toggleTask(taskId, currentState) {
    const { error } = await supabase
      .from('todos')
      .update({ isComplete: !currentState })
      .eq('id', taskId);
    if (error) console.error('error', error);
    else fetchTasks();
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) console.error('error', error);
    else fetchTasks();
  }

  if (loading) return <p>Loading...</p>;
  if (session === null) return <Landing />;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen py-2 ${
        darkTheme ? 'dark' : ''
      }`}>
      <h1 className={`mb-5 pb-10 text-4xl font-bold ${className}`}>
        Add your tasks!
      </h1>
      <div className='pb-24'>
        <TaskInput
          fetchTasks={fetchTasks}
          session={session}
          newTask={newTask}
          setNewTask={setNewTask}
          newTaskDescription={newTaskDescription}
          setNewTaskDescription={setNewTaskDescription}
          createTask={createTask}
        />
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          fetchTasks={fetchTasks}
          session={session}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        /> // use Task component for each task
      ))}
    </div>
  );
}
