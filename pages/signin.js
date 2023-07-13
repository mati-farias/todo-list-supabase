'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert('Error signing in:', error);
      } else {
        console.log('Signed in:', data);
        router.push('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-5 text-4xl font-bold'>Sign In</h1>
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <p className='mt-6'>
        Don't have an account?{' '}
        <Link
          href='/signup'
          className='text-teal'>
          Sign Up
        </Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}
