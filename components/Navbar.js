import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { DarkThemeContext } from '../contexts/darkThemeContext';
import Switch from 'react-switch';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

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
        <div className='w-1/4'>
          <Link
            href='/'
            legacyBehavior>
            <a className='text-xl font-bold text-gray-800 dark:text-white'>
              Home
            </a>
          </Link>
        </div>
        <div className='flex items-center justify-center w-1/2'>
          <Switch
            checked={darkTheme}
            onChange={() => setDarkTheme(!darkTheme)}
            onColor='#4CAF50'
            offColor='#D3D3D3'
            checkedIcon={
              <IoIosSunny
                color='black'
                className='react-switch-icon'
              />
            }
            uncheckedIcon={
              <IoIosMoon
                color='white'
                className='react-switch-icon'
              />
            }
            height={24}
            width={48}
            handleDiameter={24}
            className='react-switch'
          />
        </div>
        <div className='flex justify-end w-1/4'>
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
