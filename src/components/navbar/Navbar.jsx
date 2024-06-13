'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { FaBars, FaTimes, FaUserCircle, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const membersDropdownRef = useRef(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasSignedIn, setHasSignedIn] = useState(false);

  const handleOutsideClick = (event) => {
    if (
      membersDropdownRef.current &&
      !membersDropdownRef.current.contains(event.target)
    ) {
      setIsMembersOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    if (session && !hasSignedIn) {
      toast.success(`Welcome ${session.user.name}`);
      setHasSignedIn(true);
    }
  }, [session, hasSignedIn]);

  const userInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const handleMenuToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMembersLinkClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsMembersOpen(!isMembersOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsMembersOpen(false);
  };

  return (
    <nav className='fixed top-0 left-0 right-0 bg-white shadow-lg p-4 z-50'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold text-blue-600'
          onClick={handleLinkClick}
        >
          SICOSA-2005
        </Link>
        <div className='flex-1 mx-4 relative'>
          <FaSearch className='absolute left-3 top-3 text-gray-400' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search...'
            className='w-full p-2 pl-10 border rounded-full'
          />
        </div>
        <div className='md:hidden'>
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className='hidden md:flex space-x-4 items-center'>
          <Link
            href='/'
            className={`hover:text-blue-600 ${
              pathname === '/' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href='/about'
            className={`hover:text-blue-600 ${
              pathname === '/about' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href='/events'
            className={`hover:text-blue-600 ${
              pathname === '/events' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            Events
          </Link>
          <Link
            href='/blog'
            className={`hover:text-blue-600 ${
              pathname === '/blog' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            Blog
          </Link>
          <Link
            href='/programs'
            className={`hover:text-blue-600 ${
              pathname === '/programs' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            Programs
          </Link>
          <Link
            href='/contact'
            className={`hover:text-blue-600 ${
              pathname === '/contact' ? 'text-blue-600 font-bold' : ''
            }`}
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <div className='relative' ref={membersDropdownRef}>
            <button
              onClick={handleMembersLinkClick}
              className={`hover:text-blue-600 ${
                pathname.includes('/members') ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Members
            </button>
            {isMembersOpen && (
              <div className='absolute left-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl z-20'>
                <Link
                  href='/members'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleLinkClick}
                >
                  Members
                </Link>
                <Link
                  href='/members/executives'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleLinkClick}
                >
                  Executives
                </Link>
              </div>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            {session ? (
              <>
                <button
                  onClick={handleSignOut}
                  className='bg-red-500 text-white px-2 py-1 rounded-full'
                >
                  Sign Out
                </button>
                <div className='relative w-8 h-8 rounded-full overflow-hidden bg-gray-300'>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt='User Image'
                      layout='fill'
                      objectFit='cover'
                    />
                  ) : (
                    <FaUserCircle className='w-full h-full text-gray-500' />
                  )}
                </div>
                <span className='hidden md:block px-2'>
                  {session.user.name.split(' ')[0]}
                </span>
              </>
            ) : (
              <Link href='/sign-in'>
                <button
                  className='bg-blue-500 text-white px-2 py-1 rounded-full'
                  onClick={handleLinkClick}
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden mt-4 space-y-4'>
          <Link href='/' className='block' onClick={handleLinkClick}>
            Home
          </Link>
          <Link href='/about' className='block' onClick={handleLinkClick}>
            About
          </Link>
          <Link href='/events' className='block' onClick={handleLinkClick}>
            Events
          </Link>
          <Link href='/blog' className='block' onClick={handleLinkClick}>
            Blog
          </Link>
          <Link href='/programs' className='block' onClick={handleLinkClick}>
            Programs
          </Link>
          <Link href='/contact' className='block' onClick={handleLinkClick}>
            Contact
          </Link>
          <div className='relative' ref={membersDropdownRef}>
            <button onClick={handleMembersLinkClick} className='block'>
              Members
            </button>
            {isMembersOpen && (
              <div className='mt-2 py-2 w-full bg-white border rounded shadow-xl z-20'>
                <Link
                  href='/members'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleLinkClick}
                >
                  Members
                </Link>
                <Link
                  href='/members/executives'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  onClick={handleLinkClick}
                >
                  Executives
                </Link>
              </div>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            {session ? (
              <>
                <button
                  onClick={handleSignOut}
                  className='block bg-red-500 text-white px-2 py-1 rounded-full'
                >
                  Sign Out
                </button>
                <div className='relative w-8 h-8 rounded-full overflow-hidden bg-gray-300'>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt='User Image'
                      layout='fill'
                      objectFit='cover'
                    />
                  ) : (
                    <FaUserCircle className='w-full h-full text-gray-500' />
                  )}
                </div>
                <span className='block px-2'>
                  {session.user.name.split(' ')[0]}
                </span>
              </>
            ) : (
              <Link href='/sign-in'>
                <button
                  className='block bg-blue-500 text-white px-2 py-1 rounded-full'
                  onClick={handleLinkClick}
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </nav>
  );
};

export default Navbar;
