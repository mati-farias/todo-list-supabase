import Router from 'next/router';

export default function Landing() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='m-5 text-4xl font-bold'>
        Welcome! You need to sign up to use this To-do List!
      </p>
      <div className='flex flex-row justify-around w-full m-2'>
        <button
          className='px-4 py-2 mt-2 font-bold text-white bg-blue-600 border-2 rounded whitespace-nowrap'
          onClick={() => Router.push('/signup')}>
          Sign Up
        </button>
        <button
          className='px-4 py-2 mt-2 font-bold text-white bg-blue-600 border-2 rounded text-3x1 whitespace-nowrap'
          onClick={() => Router.push('/signin')}>
          Sign In
        </button>
      </div>
    </div>
  );
}
