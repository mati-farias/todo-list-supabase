import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { DarkThemeContext } from '../contexts/darkThemeContext';
import Switch from 'react-switch';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const { darkTheme, setDarkTheme } = useContext(DarkThemeContext);
  const router = useRouter();
  const className = darkTheme
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-800';

  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className={`p-6 shadow-md ${className}`}>
      <div className='container flex items-center justify-between mx-auto'>
        <Link
          href='/'
          legacyBehavior>
          <a className='text-xl font-bold text-gray-800 dark:text-white'>
            Home
          </a>
        </Link>
        <div className='flex items-center w-full mt-4 ml-4 sm:w-auto sm:mt-0'>
          <span className='mr-2 text-sm'>Dark Mode</span>
          <Switch
            checked={darkTheme}
            onChange={() => setDarkTheme(!darkTheme)}
            onColor='#4CAF50'
            offColor='#D3D3D3'
            checkedIcon={false}
            uncheckedIcon={false}
            height={18}
            width={36}
            handleDiameter={16}
            className='react-switch'
          />
          <span className='ml-2 text-sm'>Light Mode</span>
        </div>
        <div>
          {!session ? (
            <>
              <Link
                href='/signup'
                legacyBehavior>
                <a className='px-4 py-2 mx-2 text-sm text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300'>
                  Sign Up
                </a>
              </Link>
              <Link
                href='/signin'
                legacyBehavior>
                <a className='px-4 py-2 mx-2 text-sm text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300'>
                  Sign In
                </a>
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className='px-4 py-2 mx-2 text-sm text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300'>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
