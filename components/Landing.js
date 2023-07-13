import Router from 'next/router';

export default function Landing() {
  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-0'>
      <p className='m-5 text-4xl font-bold text-center'>
        Welcome! You need to sign up to use this To-do List!
      </p>
      <div className='flex flex-col justify-around w-full m-2 sm:flex-row'>
        <button
          className='px-4 py-2 my-1 font-bold text-white bg-blue-600 border-2 rounded whitespace-nowrap'
          onClick={() => Router.push('/signup')}>
          Sign Up
        </button>
        <button
          className='px-4 py-2 my-1 font-bold text-white bg-blue-600 border-2 rounded whitespace-nowrap'
          onClick={() => Router.push('/signin')}>
          Sign In
        </button>
      </div>
    </div>
  );
}
