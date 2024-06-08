'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AuthModal from '@/components/AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { data: session } = useSession();
  const pathname = usePathname();
  const membersMenuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMembersMenu = () => {
    setIsMembersOpen(!isMembersOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMembersOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        membersMenuRef.current &&
        !membersMenuRef.current.contains(event.target)
      ) {
        setIsMembersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [membersMenuRef]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className='bg-gray-800 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link
            href='/'
            className='text-white text-2xl font-bold'
            onClick={handleLinkClick}
          >
            SICOSA-05
          </Link>
          <button
            className='text-white md:hidden flex flex-col items-center focus:outline-none'
            onClick={toggleMenu}
          >
            <div className='text-3xl'>{isOpen ? '✖' : '☰'}</div>
          </button>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:flex flex-col md:flex-row md:items-center w-full md:w-auto absolute md:relative top-16 right-0 md:top-0 bg-gray-800 md:bg-transparent z-10`}
          >
            <div className='flex flex-col md:flex-row md:items-center md:ml-auto'>
              {[
                { href: '/about', label: 'About' },
                { href: '/events', label: 'Events' },
                { href: '/programs', label: 'Programs' },
                { href: '#', label: 'Members', submenu: true },
                { href: '/fundraising', label: 'Fundraising' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
                ...(session?.user?.isAdmin
                  ? [{ href: '/admin', label: 'Admin' }]
                  : []),
              ].map((link) => (
                <div
                  key={link.href}
                  className='relative group'
                  ref={link.submenu ? membersMenuRef : null}
                >
                  <Link
                    href={link.href}
                    className={`block md:inline-block text-white mx-2 my-1 md:my-0 p-2 rounded transition duration-300 ${
                      pathname === link.href
                        ? 'font-bold bg-gray-700'
                        : 'hover:bg-gray-700'
                    }`}
                    onClick={link.submenu ? toggleMembersMenu : handleLinkClick}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && isMembersOpen && (
                    <div className='md:absolute md:bg-gray-700 md:text-white md:mt-2 md:rounded md:shadow-lg md:w-48'>
                      <Link
                        href='/members/executives'
                        className='block px-4 py-2 hover:bg-gray-600'
                        onClick={handleLinkClick}
                      >
                        Executives
                      </Link>
                      <Link
                        href='/members'
                        className='block px-4 py-2 hover:bg-gray-600'
                        onClick={handleLinkClick}
                      >
                        Members
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              {!session && (
                <>
                  <button
                    onClick={() => openAuthModal('register')}
                    className='text-white mx-2 my-1 md:my-0 p-2 rounded transition duration-300 hover:bg-gray-700'
                  >
                    Register
                  </button>
                  <button
                    onClick={() => openAuthModal('signin')}
                    className='text-white mx-2 my-1 md:my-0 p-2 rounded transition duration-300 hover:bg-gray-700'
                  >
                    Sign In
                  </button>
                </>
              )}
              {session && (
                <button
                  onClick={handleSignOut}
                  className='text-white mx-2 my-1 md:my-0 p-2 rounded transition duration-300 hover:bg-gray-700'
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={isModalOpen ? 'blur-sm' : ''}>
        {/* Add the main content of the page here */}
        {/* Other page components go here */}
      </div>
      {
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          authMode={authMode}
        />
      }
    </>
  );
};

export default Navbar;
