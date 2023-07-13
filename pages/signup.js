import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the confirmation link!');
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-5 text-4xl font-bold'>Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md'>
        <input
          className='w-full px-3 py-2 mb-4 border rounded shadow appearance-none text-grey-darker dark:text-gray-800'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='w-full px-3 py-2 mb-6 border rounded shadow appearance-none text-grey-darker dark:text-gray-800'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className='p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal'
          type='submit'
          disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p className='mt-6'>
        Already have an account?{' '}
        <Link
          href='/signin'
          className='text-teal'>
          Sign In
        </Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}
